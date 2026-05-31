---
name: busqueda-transporte
description: >-
  Busca y propone transporte multimodal (tren/bus/vuelo) entre ciudades del viaje a
  Italia+París 2026, de forma AUTOMÁTICA (solo nombre de ciudad), usando rome2rio +
  Omio vía FireCrawl. Úsala cuando Vicente pida buscar, comparar o proponer cómo moverse
  en un tramo o en un día del itinerario (p.ej. "busca el transporte del 28 sep",
  "Milán → Como → Bérgamo", "cómo llego de Roma a Florencia"). Arma una propuesta por
  precio/horario/tiempo. NO predefine el modo: lo decide con datos reales.
---

# Búsqueda de transporte (rome2rio + Omio vía FireCrawl)

Herramienta **automática y on-demand**: Vicente da origen/destino (y fecha si aplica) y la
skill busca sola. Por cada **necesidad de transporte** (un tramo o varios de un día) trae las
opciones de **tren, bus y vuelo** y permite proponer la mejor por **precio / horario / tiempo**.

## Requisito

`FIRECRAWL_API_KEY` en el entorno (variable del contenedor web; **no** se commitea). Si falta,
el script aborta con un mensaje claro.

## Cómo usarla

Una llamada por tramo (es automático; no hay que buscar nada a mano):

```bash
node .claude/skills/busqueda-transporte/scripts/buscar_transporte.mjs --from milan --to como
node .claude/skills/busqueda-transporte/scripts/buscar_transporte.mjs --from como  --to bergamo
```

Devuelve un JSON con **estas fuentes que debes cruzar**:
- `rome2rio`: panorama multimodal — `mode`, `duration`, `price_low`/`price_high`, `operators`,
  `frequency` (p.ej. "every 30 minutes"), `summary`. Base para decidir qué modo conviene.
- `rome2rio_schedules`: **solo si pasas `--date`** — la vista *Schedules – Departure* dateada de
  rome2rio (tren + bus), con **horarios y tarifa reales del día exacto** (`departure_time`,
  `arrival_time`, `duration`, `price`/`price_mxn`). Es lo más preciso para un día concreto.
- `omio`: **horarios de salida reales** por modo + `price` (tarifa fija regional / fecha cercana).

**Para precio/horario exactos de una fecha, pasa `--date YYYY-MM-DD`** y usa `rome2rio_schedules`.
Verificado contra la UI (Roma→Florencia 8 oct: Italo 5:40→7:17 ~MX$522, coincide con la app).

**Moneda:** todos los precios se normalizan a **MXN** en campos `*_mxn` (`price_mxn`,
`price_low_mxn`, `price_high_mxn`), además del precio original (`price` + `currency`). Usa los
campos MXN para comparar y para `docs/transporte.md`. Tipos de cambio en `FX_TO_MXN` dentro del
script (ajustables): USD 18, EUR 20.

Flags:
- `--from` / `--to`: ciudad (español o inglés; el script mapea los nombres).
- `--date YYYY-MM-DD` (opcional): activa `rome2rio_schedules` (horarios + tarifa reales de ese
  día, tren y bus). Sin `--date` solo se trae el panorama (rango) + Omio.
- `--only rome2rio|omio`: usar una sola fuente (p.ej. `--only rome2rio` si Omio falla).
- `--url <url de resultados de Omio>` (opcional, avanzado): si Vicente ya hizo una búsqueda
  dateada en Omio y pega la URL, extrae ese resultado exacto. **No es el camino normal.**
- `--raw`: JSON crudo (debug).

Para un **día con varios tramos** (p.ej. Milán→Como→Bérgamo), corre el script por cada tramo y
combina las propuestas en un itinerario del día (cuida que la llegada del tramo 1 permita el 2).

## Cómo proponer (lo hace Claude con la salida)

1. **No asumas el modo**: compara tren/bus/vuelo con rome2rio (rango de precio, duración,
   frecuencia) y aterriza con los **horarios reales** de Omio.
2. Presenta: **más barato**, **más rápido** y un **recomendado** (mejor equilibrio
   precio/tiempo/horario y comodidad de estaciones), respetando franja mañana/tarde si el tramo
   lo pide.
3. Cruza fuentes: si rome2rio y Omio difieren (ej. duración o estación de un bus), señálalo.
4. Convierte a contexto: tipo de cambio ref **€1 ≈ 20 MXN**.

## Dónde registrar resultados

`docs/transporte.md` es la **fuente canónica**. Al confirmar una opción con Vicente, actualiza
la fila del tramo (modo/duración/precio) respetando el formato de tabla. Todo cambio de
ruta/itinerario también se refleja ahí.

## Limitaciones

- **Precio dinámico futuro** (alta velocidad / vuelos sep–oct 2026): aún no abre venta (~4 meses
  antes), así que el precio exacto se confirma más cerca. rome2rio da **rango**; Omio da tarifa
  fija (regionales) o la de la fecha más cercana.
- **rome2rio** da **frecuencia**, no lista de horarios; por eso se complementa con Omio.
- Detalles técnicos y mejoras futuras: `references/omio-notes.md`.
