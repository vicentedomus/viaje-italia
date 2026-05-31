#!/usr/bin/env node
// buscar_transporte.mjs — Búsqueda AUTOMÁTICA de transporte multimodal entre dos ciudades.
//
// Fuentes (vía FireCrawl, sin pasos manuales — solo nombre de ciudad):
//   1) rome2rio (PRIMARIA): panorama multimodal (tren/bus/vuelo/manejar) con duración,
//      rango de precio, operadores y frecuencia. Direccionable por nombre de ciudad.
//   2) Omio /trains|/buses|/flights (SECUNDARIA): horarios de salida reales + tarifa fija
//      regional (la página muestra la fecha más cercana; las tarifas regionales son fijas).
// Claude cruza ambas y propone por precio/horario/tiempo.
//
// Uso:
//   FIRECRAWL_API_KEY=fc-... node buscar_transporte.mjs --from milan --to como [--date 2026-09-28]
//   FIRECRAWL_API_KEY=fc-... node buscar_transporte.mjs --from rome  --to florence --only rome2rio
//
// Flags:
//   --from <ciudad> / --to <ciudad>   (acepta español o inglés, ver ALIAS).
//   --date <YYYY-MM-DD>  (opcional) fecha objetivo; se anota en la salida.
//   --only rome2rio|omio  (opcional) usar una sola fuente.
//   --url <url de resultados de Omio>  (opcional, avanzado) extrae una búsqueda dateada exacta
//                        que ya se hizo en Omio (modo manual; no es el camino normal).
//   --raw                imprime el JSON crudo (debug).

import process from "node:process";

const API = "https://api.firecrawl.dev/v2/scrape";

// Nombres de ciudad → nombre canónico en inglés (sirve para Omio y rome2rio).
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

function canon(name) {
  const k = name.trim().toLowerCase();
  if (ALIAS[k]) return ALIAS[k];
  return k.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");
}
const omioSlug = (n) => canon(n);
const r2rName = (n) =>
  canon(n).split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("-");

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t === "--from") a.from = argv[++i];
    else if (t === "--to") a.to = argv[++i];
    else if (t === "--date") a.date = argv[++i];
    else if (t === "--only") a.only = argv[++i];
    else if (t === "--url") a.url = argv[++i];
    else if (t === "--raw") a.raw = true;
  }
  return a;
}

async function scrape(key, body) {
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = await res.json();
  if (!j || j.success === false) throw new Error(j?.error || `HTTP ${res.status}`);
  return j.data || {};
}

// ---------- rome2rio (panorama multimodal) ----------
const R2R_SCHEMA = {
  type: "object",
  properties: {
    options: {
      type: "array",
      items: {
        type: "object",
        properties: {
          mode: { type: "string", description: "train, bus, fly, drive, ferry, rideshare…" },
          duration: { type: "string" },
          price_low: { type: "number" },
          price_high: { type: "number" },
          currency: { type: "string" },
          operators: { type: "string" },
          frequency: { type: "string", description: "p.ej. 'every 30 minutes'" },
          summary: { type: "string", description: "resumen corto del trayecto" },
        },
        required: ["mode"],
      },
    },
    route: { type: "string" },
  },
  required: ["options"],
};

async function fromRome2rio(key, from, to) {
  const url = `https://www.rome2rio.com/s/${r2rName(from)}/${r2rName(to)}`;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const data = await scrape(key, {
        url,
        formats: [{
          type: "json",
          prompt:
            "Extrae route y TODAS las opciones de viaje que lista rome2rio (train, bus, fly, " +
            "drive, ferry, rideshare). Por cada una: mode, duration total, price_low y price_high " +
            "(números), currency, operators, frequency y un summary corto.",
          schema: R2R_SCHEMA,
        }],
        actions: [
          { type: "wait", milliseconds: 6000 },
          { type: "scroll", direction: "down" },
          { type: "wait", milliseconds: 3000 },
        ],
        timeout: 120000,
      });
      const options = data.json?.options || [];
      if (options.length || attempt === 2) {
        return { source: "rome2rio", url, route: data.json?.route || null, options };
      }
    } catch (e) {
      if (attempt === 2) return { source: "rome2rio", url, options: [], error: e.message };
    }
  }
  return { source: "rome2rio", url, options: [] };
}

// ---------- Omio (horarios reales por modo) ----------
const OMIO_SCHEMA = {
  type: "object",
  properties: {
    offers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          mode: { type: "string" },
          operator: { type: "string" },
          departure_time: { type: "string" },
          arrival_time: { type: "string" },
          duration: { type: "string" },
          changes: { type: "number" },
          price: { type: "number" },
          currency: { type: "string" },
          from_station: { type: "string" },
          to_station: { type: "string" },
        },
        required: ["mode"],
      },
    },
    shown_date: { type: "string" },
  },
  required: ["offers"],
};

async function omioPage(key, from, to, page) {
  const url = `https://www.omio.com/${page}/${omioSlug(from)}/${omioSlug(to)}`;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const data = await scrape(key, {
        url,
        formats: [{
          type: "json",
          prompt:
            "Extrae shown_date y TODAS las opciones (train/bus/flight): mode, operator, " +
            "departure_time y arrival_time (24h), duration, changes, price (número), currency, " +
            "from_station, to_station.",
          schema: OMIO_SCHEMA,
        }],
        actions: [{ type: "wait", milliseconds: 7000 }],
        timeout: 60000,
      });
      const offers = (data.json?.offers || [])
        .filter((o) => o && o.price != null)
        .map((o) => ({ ...o, booking_url: url }));
      if (offers.length || attempt === 2) {
        return { offers, shown_date: data.json?.shown_date || null };
      }
    } catch (e) {
      if (attempt === 2) return { offers: [], error: e.message };
    }
  }
  return { offers: [] };
}

function dedupe(offers) {
  const seen = new Map();
  for (const o of offers) {
    const k = [o.mode, o.operator, o.departure_time, o.arrival_time, o.price].join("|");
    if (!seen.has(k)) seen.set(k, o);
  }
  return [...seen.values()].sort((a, b) => (a.price ?? 1e9) - (b.price ?? 1e9));
}

async function fromOmio(key, from, to) {
  const results = await Promise.all(
    ["trains", "buses", "flights"].map((p) => omioPage(key, from, to, p)),
  );
  return {
    source: "omio",
    shown_date: results.map((r) => r.shown_date).find(Boolean) || null,
    offers: dedupe(results.flatMap((r) => r.offers)),
  };
}

// ---------- modo avanzado: URL de resultados dateada de Omio ----------
async function fromOmioUrl(key, url) {
  const schema = {
    ...OMIO_SCHEMA,
    properties: { ...OMIO_SCHEMA.properties, route: { type: "string" }, search_date: { type: "string" } },
  };
  const data = await scrape(key, {
    url,
    formats: [{
      type: "json",
      prompt:
        "Extrae route, search_date y TODAS las opciones (tren/bus/vuelo): mode, operator, " +
        "departure_time, arrival_time (24h), duration, changes, price (número), currency, " +
        "from_station, to_station.",
      schema,
    }],
    actions: [
      { type: "wait", milliseconds: 8000 },
      { type: "scroll", direction: "down" },
      { type: "wait", milliseconds: 4000 },
    ],
    timeout: 120000,
  });
  return {
    source: "omio-url",
    route: data.json?.route || null,
    search_date: data.json?.search_date || null,
    url,
    offers: dedupe((data.json?.offers || []).filter((o) => o && o.price != null)),
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) {
    console.error("ERROR: falta FIRECRAWL_API_KEY en el entorno (no se commitea).");
    process.exit(2);
  }

  if (args.url) {
    try {
      console.log(JSON.stringify(await fromOmioUrl(key, args.url), null, 2));
    } catch (e) {
      console.error(`ERROR scrapeando la URL: ${e.message}`);
      process.exit(1);
    }
    return;
  }

  if (!args.from || !args.to) {
    console.error("ERROR: usa --from <ciudad> --to <ciudad>  (o --url para una búsqueda dateada de Omio).");
    process.exit(2);
  }

  const tasks = [];
  if (args.only !== "omio") tasks.push(fromRome2rio(key, args.from, args.to));
  if (args.only !== "rome2rio") tasks.push(fromOmio(key, args.from, args.to));
  const settled = await Promise.all(tasks);

  const r2r = settled.find((s) => s.source === "rome2rio");
  const omio = settled.find((s) => s.source === "omio");

  const out = {
    route: `${args.from} → ${args.to}`,
    requested_date: args.date || null,
    note:
      "rome2rio = panorama multimodal (precio en rango, frecuencia). Omio = horarios reales/" +
      "tarifa fija regional (fecha cercana). Precio dinámico futuro (alta velocidad/vuelos) " +
      "se confirma al abrir ventas. Tipo de cambio ref: €1≈20 MXN.",
    rome2rio: r2r ? { url: r2r.url, options: r2r.options, error: r2r.error } : null,
    omio: omio ? { shown_date: omio.shown_date, offers: omio.offers } : null,
  };
  console.log(JSON.stringify(out, null, 2));
}

main();
