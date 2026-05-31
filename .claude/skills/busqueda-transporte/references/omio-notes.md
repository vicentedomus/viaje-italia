# Notas técnicas — scraping de Omio con FireCrawl

Hallazgos del spike (mayo 2026) que sustentan el diseño de la skill.

## Qué funciona

- **Patrón checavuelos sobre Omio**: `POST https://api.firecrawl.dev/v2/scrape` con
  `formats:[{type:"json", prompt, schema}]` + `actions:[{type:"wait", milliseconds:7000}]`.
  La extracción estructurada la hace el LLM de FireCrawl.
- **Páginas SEO por modo** renderizan ofertas reales:
  - `https://www.omio.com/trains/{from}/{to}` → trenes (operador, horarios, duración, precio).
  - `https://www.omio.com/buses/{from}/{to}` → buses (FlixBus, etc.).
  - `https://www.omio.com/flights/{from}/{to}` → vuelos.
  - `https://www.omio.com/travel/{from}/{to}` → multimodal en una página, pero **renderiza
    de forma intermitente** (a veces 0 ofertas). Por eso el script usa las páginas por modo
    en paralelo y fusiona; es más confiable.
- Ejemplos reales obtenidos: Milán→Como TRENORD ~€5.5–6 (~40–60 min) + FlixBus ~€6;
  Roma→París tren Trenitalia/TGV (~14h30, 2 cambios, ~€150) y vuelo (~€50).

## Qué NO funciona (y workarounds)

- **Fecha futura arbitraria**: las páginas SEO muestran la fecha más cercana, no una fecha
  específica de sep–oct 2026. El parámetro `?departureDate=` se ignora en esas páginas.
- **Búsqueda interna con fecha** (`/search-frontend/results/...`): requiere IDs internos de
  posición y está protegida por **Cloudflare** (la API de autocompletado devuelve 403
  "Just a moment…"). Llamarla directo no es viable.
- **Llamar la API de Omio desde el navegador de FireCrawl** (`executeJavascript`): también
  topa con el reto de Cloudflare.
- **Realidad de negocio**: para sep–oct 2026 las tarifas aún no abren venta (Trenitalia/Italo
  abren ~4 meses antes), así que hoy no existe un precio dateado exacto que traer.

## booking_url

El LLM a veces inventa `booking_url` (p.ej. `example.com/...`). El script lo **sobrescribe**
con la URL real de la página de Omio de la que salió la oferta (es el punto de reserva válido).

## Mejoras futuras (cuando abran ventas, ~jun 2026)

1. **Browser-actions de FireCrawl** para conducir el buscador de Omio: escribir origen,
   escribir destino, abrir el date-picker y seleccionar la fecha, clic en buscar, esperar y
   extraer. Da precio/horario exactos por fecha, pero es más lento (~30–60s/tramo) y frágil
   ante cambios de UI.
2. **Scraping directo por operador** para precio exacto: Trenitalia/Italo/Trenord (trenes),
   FlixBus (bus), Ryanair/easyJet (vuelos). Requiere mantener el mapeo tramo→operadores.
3. **Re-ejecutar** simplemente cuando la fecha objetivo entre en la ventana visible de Omio.
