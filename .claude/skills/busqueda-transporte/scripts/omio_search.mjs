#!/usr/bin/env node
// omio_search.mjs — Busca transporte multimodal (tren/bus/vuelo) en Omio vía FireCrawl.
//
// Reutiliza el patrón de checavuelos: POST https://api.firecrawl.dev/v2/scrape con
// formats:[{type:"json", prompt, schema}] + actions:[{type:"wait"}]. La extracción
// estructurada la hace el LLM de FireCrawl a partir del schema.
//
// Por defecto consulta las páginas por modo de Omio (/trains, /buses, /flights) EN
// PARALELO y fusiona los resultados, porque la página multimodal /travel renderiza de
// forma intermitente. Cada página se reintenta una vez si vuelve vacía.
//
// Uso:
//   FIRECRAWL_API_KEY=fc-... node omio_search.mjs --from milan --to como [--date 2026-09-28]
//   FIRECRAWL_API_KEY=fc-... node omio_search.mjs --from rome --to paris --mode flights
//
// Flags:
//   --from <ciudad>   Origen (acepta español o inglés, ver ALIAS).
//   --to   <ciudad>   Destino.
//   --date <YYYY-MM-DD> (opcional) Fecha deseada (ver "Limitación" abajo).
//   --mode <all|trains|buses|flights|travel>  Default: all (trenes+buses+vuelos).
//   --raw             Imprime el JSON crudo de FireCrawl (debug, requiere --mode único).
//
// Salida: JSON { route, url(s), shown_date, note, offers:[...] } ordenado por precio.
//
// Limitación conocida: las páginas SEO de Omio muestran los próximos servicios
// disponibles (fecha cercana), no una fecha futura arbitraria. Para sep–oct 2026 las
// tarifas aún no salen a la venta (abren ~4 meses antes), así que hoy el resultado es
// "horarios + tarifa indicativa", suficiente para planear/proponer.

const API = "https://api.firecrawl.dev/v2/scrape";

// Nombres de ciudad → slug que usa Omio (inglés, minúsculas).
const ALIAS = {
  milan: "milan", "milán": "milan", milano: "milan",
  como: "como", "lago di como": "como",
  bergamo: "bergamo", "bérgamo": "bergamo",
  venecia: "venice", venice: "venice", venezia: "venice",
  verona: "verona",
  padua: "padua", padova: "padua",
  paris: "paris", "parís": "paris",
  roma: "rome", rome: "rome",
  florencia: "florence", florence: "florence", firenze: "florence",
  pisa: "pisa",
  volterra: "volterra",
  napoles: "naples", "nápoles": "naples", naples: "naples",
};

function slug(name) {
  const k = name.trim().toLowerCase();
  if (ALIAS[k]) return ALIAS[k];
  return k.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");
}

function parseArgs(argv) {
  const a = { mode: "all" };
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === "--from") a.from = argv[++i];
    else if (t === "--to") a.to = argv[++i];
    else if (t === "--date") a.date = argv[++i];
    else if (t === "--mode") a.mode = argv[++i];
    else if (t === "--url") a.url = argv[++i];
    else if (t === "--raw") a.raw = true;
  }
  return a;
}

const SCHEMA = {
  type: "object",
  properties: {
    offers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          mode: { type: "string", description: "train, bus o flight" },
          operator: { type: "string" },
          departure_time: { type: "string", description: "hora de salida 24h" },
          arrival_time: { type: "string", description: "hora de llegada 24h" },
          duration: { type: "string", description: "duración total, ej '1h05'" },
          changes: { type: "number", description: "número de cambios/escalas" },
          price: { type: "number", description: "precio numérico por persona" },
          currency: { type: "string", description: "moneda, ej EUR o MXN" },
          from_station: { type: "string", description: "estación/terminal de salida" },
          to_station: { type: "string", description: "estación/terminal de llegada" },
          booking_url: { type: "string" },
        },
        required: ["mode", "price"],
      },
    },
    route: { type: "string", description: "ruta mostrada, ej 'Milan to Como'" },
    search_date: { type: "string", description: "fecha para la que la página muestra resultados" },
  },
  required: ["offers"],
};

function buildPrompt(date) {
  return [
    "Extrae TODAS las opciones de transporte mostradas para esta ruta (tren, autobús y/o vuelo).",
    "Para cada una: mode (train/bus/flight), operator, departure_time y arrival_time en 24h,",
    "duration total, changes (transbordos/escalas), price (número por persona), currency y booking_url.",
    "Convierte precios a número sin símbolo.",
    date
      ? `El usuario quiere viajar el ${date}; si la página muestra otra fecha, repórtala en shown_date.`
      : "Reporta en shown_date la fecha para la que la página muestra resultados.",
  ].join(" ");
}

async function scrapeOnce(key, url, date) {
  const body = {
    url,
    formats: [{ type: "json", prompt: buildPrompt(date), schema: SCHEMA }],
    actions: [{ type: "wait", milliseconds: 7000 }],
    timeout: 50000,
  };
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = await res.json();
  if (!j || j.success === false) throw new Error(j?.error || `HTTP ${res.status}`);
  return j.data || {};
}

// Scrapea una página de Omio; reintenta una vez si vuelve sin ofertas.
async function scrapePage(key, url, date) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const data = await scrapeOnce(key, url, date);
      const offers = (data.json?.offers || [])
        .filter((o) => o && o.price != null)
        // El LLM a veces inventa booking_url; usamos la página real de Omio como link de reserva.
        .map((o) => ({ ...o, booking_url: url }));
      if (offers.length || attempt === 2) {
        return { url, offers, shown_date: data.json?.shown_date || null };
      }
    } catch (e) {
      if (attempt === 2) return { url, offers: [], error: e.message };
    }
  }
  return { url, offers: [], shown_date: null };
}

function dedupe(offers) {
  const seen = new Map();
  for (const o of offers) {
    const key = [o.mode, o.operator, o.departure_time, o.arrival_time, o.price].join("|");
    if (!seen.has(key)) seen.set(key, o);
  }
  return [...seen.values()].sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
}

// Modo "paste-URL": scrapea una URL de resultados de Omio (con su search-ID) que el
// usuario generó buscando en Omio. Da ofertas DATEADAS exactas. Usa scroll + espera larga
// porque la lista de horarios carga en diferido.
async function scrapeResultsUrl(key, url) {
  const body = {
    url,
    formats: [{
      type: "json",
      prompt:
        "Extrae route, search_date y TODAS las opciones mostradas (tren/bus/vuelo): mode, " +
        "operator, departure_time y arrival_time en 24h, duration, changes, price (número), " +
        "currency, from_station, to_station y booking_url.",
      schema: SCHEMA,
    }],
    actions: [
      { type: "wait", milliseconds: 9000 },
      { type: "scroll", direction: "down" },
      { type: "wait", milliseconds: 3500 },
      { type: "scroll", direction: "down" },
      { type: "wait", milliseconds: 3500 },
    ],
    timeout: 90000,
  };
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = await res.json();
  if (!j || j.success === false) throw new Error(j?.error || `HTTP ${res.status}`);
  const data = j.data || {};
  const offers = dedupe((data.json?.offers || []).filter((o) => o && o.price != null));
  return {
    route: data.json?.route || null,
    search_date: data.json?.search_date || null,
    url,
    note: "Resultado DATEADO exacto extraído de tu búsqueda de Omio.",
    count: offers.length,
    offers,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) {
    console.error("ERROR: falta FIRECRAWL_API_KEY en el entorno (no se commitea).");
    process.exit(2);
  }

  // Modo paste-URL: precio/horario exactos por fecha.
  if (args.url) {
    try {
      const out = await scrapeResultsUrl(key, args.url);
      console.log(JSON.stringify(out, null, 2));
    } catch (e) {
      console.error(`ERROR scrapeando la URL: ${e.message}`);
      process.exit(1);
    }
    return;
  }

  if (!args.from || !args.to) {
    console.error("ERROR: usa --url <url de resultados de Omio>  O  --from <ciudad> --to <ciudad>.");
    process.exit(2);
  }

  const from = slug(args.from);
  const to = slug(args.to);
  const base = `https://www.omio.com`;
  const pages =
    args.mode === "all"
      ? ["trains", "buses", "flights"]
      : [args.mode].filter((m) => ["trains", "buses", "flights", "travel"].includes(m));
  if (!pages.length) {
    console.error(`ERROR: --mode inválido: ${args.mode}`);
    process.exit(2);
  }
  const urls = pages.map((p) => `${base}/${p}/${from}/${to}`);

  if (args.raw && urls.length === 1) {
    const res = await fetch(API, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        url: urls[0],
        formats: [{ type: "json", prompt: buildPrompt(args.date), schema: SCHEMA }],
        actions: [{ type: "wait", milliseconds: 7000 }],
        timeout: 50000,
      }),
    });
    console.log(JSON.stringify(await res.json(), null, 2));
    return;
  }

  const results = await Promise.all(urls.map((u) => scrapePage(key, u, args.date)));
  const allOffers = dedupe(results.flatMap((r) => r.offers));
  const shown = results.map((r) => r.shown_date).find(Boolean) || null;

  const out = {
    route: `${args.from} → ${args.to}`,
    requested_date: args.date || null,
    urls,
    shown_date: shown,
    note:
      "Omio muestra la fecha más cercana disponible, no necesariamente la solicitada. " +
      "Para sep–oct 2026 las tarifas aún no abren venta: tómalo como horario + precio indicativo.",
    count: allOffers.length,
    offers: allOffers,
  };
  console.log(JSON.stringify(out, null, 2));
}

main();
