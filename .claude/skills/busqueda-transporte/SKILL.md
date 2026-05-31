---
name: busqueda-transporte
description: >-
  Busca y propone transporte multimodal (tren/bus/vuelo) entre ciudades del viaje a
  Italia+París 2026, usando Omio vía FireCrawl. Úsala cuando Vicente pida buscar,
  comparar o proponer cómo moverse en un tramo o en un día del itinerario (p.ej.
  "busca el transporte del 28 sep", "Milán → Como → Bérgamo", "cómo llego de Roma a
  Florencia"). Devuelve opciones reales por modo y arma una propuesta por
  precio/horario/tiempo. NO predefine el modo: lo decide con datos reales.
---

# Búsqueda de transporte (Omio vía FireCrawl)

Herramienta on-demand. Por cada **necesidad de transporte** (un tramo o varios de un
día) busca en Omio las opciones de **tren, bus y vuelo a la vez** y propone la mejor por
**precio / horario / tiempo de viaje**.

## Requisito

`FIRECRAWL_API_KEY` debe estar en el entorno (variable del contenedor web; **no** se
commitea). Si falta, el script aborta con un mensaje claro.

## Cómo usarla

Hay **dos modos**. Prefiere el de **paste-URL** cuando Vicente quiera precio/horario
**exactos de una fecha**; usa el **auto** para un panorama rápido.

### Modo A — paste-URL (fecha exacta, recomendado)

Vicente busca el tramo en Omio (elige origen/destino/fecha) y pega la URL de resultados
(se ve como `https://www.omio.com/app/search-frontend/results/<ID>/train?locale=en`). El
script la scrapea con scroll + espera y devuelve las **ofertas dateadas reales**:

```bash
node .claude/skills/busqueda-transporte/scripts/omio_search.mjs --url "<URL de resultados de Omio>"
```

La pestaña final (`/train`, `/bus`, `/flight`) sólo cambia cuál se ve primero; el extractor
toma todos los modos disponibles en esa búsqueda. Si quieres asegurar los tres modos, pide
a Vicente la URL de cada pestaña y corre el script una vez por URL.

### Modo B — auto por ciudades (panorama, fecha cercana)

Sin URL: el script arma las páginas SEO de Omio y hace 3 scrapes en paralelo
(trenes/buses/vuelos) y los fusiona. Útil para ver operadores/duraciones y **tarifas fijas
regionales** (que no dependen de la fecha):

```bash
node .claude/skills/busqueda-transporte/scripts/omio_search.mjs --from milan --to como
node .claude/skills/busqueda-transporte/scripts/omio_search.mjs --from como  --to bergamo
```

Flags:
- `--url <url>`: modo A (URL de resultados de Omio).
- `--from` / `--to`: modo B (ciudad; acepta español o inglés → slugs de Omio).
- `--date YYYY-MM-DD` (opcional, modo B): fecha deseada (ver Limitación del modo B).
- `--mode all|trains|buses|flights|travel` (default `all`, modo B).
- `--raw`: JSON crudo de FireCrawl (debug; sólo con un `--mode` único).

Para un **día con varios tramos** (p.ej. Milán→Como→Bérgamo), corre el script por cada
tramo y combina las propuestas en un solo itinerario del día (cuida que la hora de
llegada del tramo 1 permita tomar el tramo 2).

## Cómo proponer (lo hace Claude con la salida)

El script devuelve `offers` ya ordenadas por precio. Con eso:
1. **No asumas el modo**: compara tren vs bus vs vuelo con los datos reales.
2. Identifica y presenta: **más barato**, **más rápido**, y un **recomendado**
   (mejor equilibrio precio/tiempo/horario, respetando `--date` y franjas mañana/tarde
   si el tramo lo pide).
3. Muestra por opción: modo, operador, salida→llegada, duración, cambios, precio (€) y
   el link de Omio (`booking_url`).
4. Menciona la `shown_date` y la **Limitación** si la fecha mostrada no es la pedida.

## Dónde registrar resultados

`docs/transporte.md` es la **fuente canónica**. Al confirmar una opción con Vicente,
actualiza la fila del tramo ahí (modo/duración/precio) respetando el formato de tabla.
Todo cambio de ruta/itinerario también se refleja en ese archivo.

## Limitaciones

- **Modo B (auto):** las páginas SEO muestran los próximos servicios (**fecha cercana**), no
  una fecha futura arbitraria → horario + **tarifa indicativa**. Para tramos en **tren
  regional** (Como, Verona, Padua, Pisa…) la tarifa es **fija**, así que ese precio ya es el
  real. Para alta velocidad/vuelos es indicativo.
- **Modo A (paste-URL):** da el precio/horario **exacto de la fecha** buscada. Nota: para
  sep–oct 2026, las tarifas de alta velocidad/vuelos pueden no estar a la venta todavía
  (abren ~4 meses antes); en ese caso Omio muestra lo disponible más cercano.

Detalles técnicos y mejoras futuras (automatizar el formulario): `references/omio-notes.md`.
