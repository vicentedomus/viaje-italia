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

Por cada tramo, ejecuta el script (una llamada por tramo). Hace 3 scrapes en paralelo
(trenes/buses/vuelos) y fusiona:

```bash
node .claude/skills/busqueda-transporte/scripts/omio_search.mjs --from milan --to como
node .claude/skills/busqueda-transporte/scripts/omio_search.mjs --from como  --to bergamo
```

Flags:
- `--from` / `--to`: ciudad (acepta español o inglés; el script mapea a los slugs de Omio).
- `--date YYYY-MM-DD` (opcional): fecha deseada (ver Limitación).
- `--mode all|trains|buses|flights|travel` (default `all`).
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

## Limitación conocida (importante)

Las páginas de Omio muestran los próximos servicios disponibles (**fecha cercana**), no
una fecha futura arbitraria. Además, para **sep–oct 2026 las tarifas aún no salen a la
venta** (Trenitalia/Italo abren ~4 meses antes). Por eso hoy el resultado es **horario +
tarifa indicativa**, suficiente para planear y proponer; el precio exacto se confirma
cuando abran ventas. Ver `references/omio-notes.md` para detalles y mejoras futuras.
