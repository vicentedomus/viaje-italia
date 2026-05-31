# Notas técnicas — búsqueda de transporte con FireCrawl

Hallazgos del spike (mayo 2026) que sustentan el diseño de la skill.

## Arquitectura: rome2rio (primaria) + Omio (secundaria)

La skill es **automática** (solo nombre de ciudad). Decisión validada en vivo:

- **rome2rio** (`https://www.rome2rio.com/s/{From}/{To}`) es **direccionable por nombre de
  ciudad** (sin IDs internos), multimodal (train/bus/fly/drive/ferry) y da duración, **rango de
  precio**, operadores y **frecuencia**. Hecho para planear. Es la base.
  - Validado Milán→Como: Trenord 1h04 MX$95–130 c/30min; bus Autoguidovie 1h35 MX$80–130 c/4h;
    coche 44min. Automático, sin pasos manuales.
- **Omio** páginas SEO por modo (`/trains|/buses|/flights/{from}/{to}`) aportan **horarios de
  salida reales** + tarifa fija regional. Complementa a rome2rio (que da frecuencia, no horarios).
  - Usa las páginas por modo en paralelo y fusiona; la página `/travel` multimodal renderiza
    intermitente. Espera ~7s por la carga diferida.

Se cruzan ambas para detectar discrepancias (rome2rio a veces lista rutas indirectas; Omio el
directo). booking_url de Omio se sobrescribe con la URL real de la página (el LLM lo inventa).

## Por qué NO se usa Omio como primaria automática con fecha

- **Fecha futura arbitraria**: las páginas SEO de Omio ignoran `?departureDate=` y muestran la
  fecha más cercana. Sirven para horarios + tarifa fija regional, no para precio dateado futuro.
- **Búsqueda interna dateada** (`/app/search-frontend/results/<ID>/...`): el `<ID>` es un
  **search-ID de un solo uso** que Omio genera al enviar el formulario (no construible con
  nombres de ciudad). La API de autocompletado que resolvería los IDs está tras **Cloudflare**
  (403 "Just a moment…"), y llamarla desde el navegador de FireCrawl tampoco devolvió datos.
- Existe el modo `--url` (paste-URL) como recurso avanzado/manual: si el usuario ya hizo la
  búsqueda en Omio y pega la URL de resultados, FireCrawl la extrae con scroll + espera larga
  (timeout 120s). Validado: Milán→Como 28 sep → trenes Regionale TRENORD MX$94–115. Pero **no es
  el camino normal** porque requiere acción manual del usuario.

## rome2rio Schedules dateados — RESUELTO ✅

La vista **Schedules – Departure** (horarios + tarifa reales por día) SÍ es alcanzable por URL:

```
https://www.rome2rio.com/map/{From}/{To}?route={Mode}&departureDate=YYYY-MM-DD
```

- `{Mode}` = `Train` o `Bus` (los modos con horarios). `{From}/{To}` = nombre de ciudad capitalizado.
- **Parámetro de fecha correcto: `departureDate=YYYY-MM-DD`** (NO `oDate`/`date`/`dDate`, que se
  ignoran y caen en la fecha por defecto).
- Requiere `actions` con espera larga (~8s) + 2 scrolls; la lista carga en diferido.
- Verificado: Roma→Florencia 8 oct → Italo 5:40→7:17 1h37 ~$29 (≈MX$522), Frecciarossa, FlixBus
  ~$12 — coincide con la app del usuario.

Implementado en `fromRome2rioSchedules()` (tren+bus en paralelo). Se activa con `--date` y se
devuelve en el campo `rome2rio_schedules`. El overview (`/s/`) se mantiene para el panorama y
para modos sin Schedules (vuelos/rideshare).

**Glitch de moneda de rome2rio:** según la IP del scraper de FireCrawl, devuelve USD, EUR o
coronas nórdicas (SEK/NOK/DKK) de forma inconsistente. Por eso TODO se normaliza a MXN en el
script (`FX_TO_MXN` cubre esas monedas); usar siempre los campos `*_mxn`.

## Mejoras futuras

- Automatizar el formulario de Omio con browser-actions (escribir origen/destino, date-picker,
  buscar) para precio dateado exacto sin paste-URL. Viable pero frágil (selectores) y lento.
- Cuando abran ventas (~jun 2026) para sep–oct 2026, los precios dinámicos (alta velocidad/
  vuelos) ya serán reales en ambas fuentes; reejecutar para fijarlos en docs/transporte.md.
