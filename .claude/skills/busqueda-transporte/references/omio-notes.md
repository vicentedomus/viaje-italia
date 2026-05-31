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

## Fecha exacta: modo paste-URL (lo que SÍ funciona)

La búsqueda dateada de Omio vive en `https://www.omio.com/app/search-frontend/results/<ID>/train`,
donde `<ID>` es un **search-ID de un solo uso** que Omio genera al enviar el formulario
(no lleva ciudades ni fecha en el texto; están guardadas server-side). Probado en vivo:

- FireCrawl **sí** abre esa URL y lee ruta + fecha correctas.
- La lista de horarios **carga en diferido**: hay que usar `actions` con **espera larga
  (~9s) + scroll + espera** para que rendericen las ofertas. Con eso se extraen las ofertas
  **dateadas exactas** (ej. Milán→Como 28 sep: 8 trenes Regionale TRENORD, MX$115, 0h40–1h01).

Por eso la skill expone `--url "<url de resultados>"`: Vicente busca en Omio y pega la URL;
el script extrae el resultado exacto. Es lo más fiable hoy.

## Qué NO se pudo automatizar (mejoras futuras)

- **Generar el search-ID automáticamente**: requeriría manejar el formulario con browser-actions
  (escribir origen/destino, abrir date-picker, elegir fecha, clic en buscar) y luego extraer
  de la URL de resultados resultante. Es viable pero **frágil** (selectores cambian) y lento.
- **Deep-link construible con IDs de posición**: la API de autocompletado de Omio está tras
  **Cloudflare** (403 "Just a moment…") por curl directo; llamarla desde el navegador de
  FireCrawl (`executeJavascript`) tampoco devolvió datos utilizables en las pruebas.
- **Modo B (páginas SEO)**: el parámetro `?departureDate=` se ignora; muestran la fecha más
  cercana. Sirve para horarios + tarifa fija regional; para alta velocidad/vuelos es indicativo.
- **Realidad de negocio**: para sep–oct 2026 muchas tarifas dinámicas (alta velocidad/vuelos)
  aún no abren venta (~4 meses antes), así que el precio exacto de esas se confirma más cerca.

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
