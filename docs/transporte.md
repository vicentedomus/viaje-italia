# Transporte entre ciudades — estimación de costos

Estimación del costo de moverse entre las bases del itinerario. Reconstruida con
las tarifas que agrega **Omio** (Trenitalia/Italo para trenes, Ryanair para el
vuelo interno, buses CPT/ATC para la última milla).

> ⚠️ **No es precio bookable todavía.** En mayo 2026 aún no abren ventas para
> sep–oct 2026 (Trenitalia/Italo abren ~4 meses antes). Son **rangos estimados**
> basados en tarifas actuales (2025–2026); los trenes de alta velocidad usan
> precios dinámicos tipo aerolínea, así que **comprar con anticipación = tarifa
> Economy/Super-Economy** (la columna que uso abajo). Comprar el mismo día puede
> costar 2–3× más (tarifa Base).

## Supuestos

- **2 viajeros.** Las columnas muestran precio **por persona** y **×2 (pareja)**.
- Tarifas de tren = **Economy/advance** (comprando con semanas/meses de anticipación).
- Tipo de cambio referencia: **€1 ≈ 20 MXN** (consistente con la reserva de Volterra: €244 ≈ $4,903 MXN).
- Day-trips (Como, Padova, Porto Venere) = ida y vuelta.

## Tramos del itinerario

| # | Fecha | Tramo | Modo | Duración | €/persona | €/pareja |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | dom 27 sep | Milán ⇄ **Como** (day-trip) | Regionale | ~40–60 min | ~€10 (ida y vuelta) | ~€20 |
| 2 | lun 28 sep | Milán → **Venecia** (parada Verona) | Frecciarossa | ~2h15 | ~€30–40 | ~€70 |
| 3 | mar 29 sep | Venecia ⇄ **Padova** (day-trip) | Regionale | ~25–50 min | ~€10 (ida y vuelta) | ~€20 |
| 4 | mié 30 sep | Venecia → **Bolonia** | Frecciarossa | ~1h05 | ~€20–30 | ~€50 |
| 5 | jue 1 oct | Bolonia → **Florencia** | Frecciarossa | ~37 min | ~€18–28 | ~€44 |
| 6 | sáb 3 oct | Florencia → **Roma** | Frecciarossa | ~1h30 | ~€20–35 (desde €19.90) | ~€60 |
| 7 | mar 6 oct | Roma → **Nápoles** | Frecciarossa/Italo | ~1h10 | ~€20–30 (desde €19.90) | ~€50 |
| 8 | mié 7 oct | Nápoles → **Lecce** (parada Bari) | Frecciargento/IC | ~5h20–6h | ~€30–45 (desde €9 muy anticipado) | ~€80 |
| 9 | jue 8 oct | Lecce → aeropuerto **Brindisi (BDS)** | Tren + bus | ~40–60 min | ~€8 | ~€16 |
| 10 | jue 8 oct | ✈️ **Brindisi (BDS) → Pisa (PSA)** | Ryanair | ~1h25 | ~€50–70 (con maleta documentada) | ~€120 |
| 11 | jue 8 oct | **Porto Venere** day-trip (Pisa↔La Spezia + bus/ferry) | Tren + bus/ferry | ~1h c/u | ~€25 (ida y vuelta) | ~€50 |
| 12 | vie 9 oct | Pisa → **Volterra** | Tren + bus CPT | ~2h35 | ~€7–14 | ~€24 |
| 13 | dom 11 oct | Volterra → **Milán (cerca MXP)** | Bus + Frecciarossa | ~5–6h | ~€50–60 | ~€110 |

## Totales estimados

| Escenario | €/persona | €/pareja | MXN/pareja (≈) |
| --- | --- | --- | --- |
| **Comprando con anticipación** (Economy) | ~€350–400 | **~€700–800** | **≈ $14,000–16,000** |
| Comprando tarde / tarifas Base | ~€550–700 | ~€1,100–1,400 | ≈ $22,000–28,000 |

**Planning recomendado: ≈ $15,000 MXN (pareja)** para todo el transporte terrestre +
el vuelo interno, si se reserva con tiempo.

## Notas y palancas de ahorro

- **Trenes de alta velocidad:** comprar apenas abran ventas (≈ junio 2026 para
  sep–oct). La diferencia Economy vs Base es enorme (ej. Roma–Venecia: €29.90 vs €99).
- **Italo vs Trenitalia:** en Florencia–Roma–Nápoles compiten; comparar ambos suele bajar el precio.
- **Vuelo Brindisi→Pisa:** la tarifa base de Ryanair arranca en ~€15–20, pero como
  llevan **maleta documentada**, el costo real sube por la maleta de bodega +
  asiento. Presupuestar €50–70/persona y reservar maleta al comprar (es más barata que en el aeropuerto).
- **Nápoles→Lecce:** tramo largo (~6h). Si quieren la parada en Bari, conviene
  comprar **Nápoles→Bari** y **Bari→Lecce** por separado (regionale Bari–Lecce ~€10).
- **Pisa→Volterra:** no hay tren directo. Ruta económica = tren a Pontedera o Cecina
  + bus CPT (línea 500 vía Pontedera, o línea 790 vía Cecina, ~€3.50). Alternativa
  cómoda con maletas: taxi del último tramo (~€60–80 el coche, no por persona).
- **Day-trips regionales** (Como, Padova): billete regionale de precio fijo, sin
  necesidad de anticipación; se compran el mismo día.
- **Porto Venere:** el mismo 8 oct llegan en avión a Pisa — el day-trip queda
  apretado. Considerar moverlo a la mañana del 9 oct antes de subir a Volterra, o
  acortarlo. Bus La Spezia↔Porto Venere ~€2.50/trayecto; ferry ~€17–24 (más escénico).

## Fuentes

- [seat61 — Frecciarossa / trenes en Italia](https://www.seat61.com/trains-and-routes/frecciarossa.htm) · [Train travel in Italy 2026](https://www.seat61.com/train-travel-in-italy.htm)
- [Omio — Brindisi → Pisa (vuelos)](https://www.omio.com/flights/brindisi-airport/pisa-international-airport-fokyl) · [Ryanair Brindisi–Pisa](https://www.ryanair.com/flights/it/it/voli-da-brindisi-a-pisa)
- [Omio — Pisa → Volterra](https://www.omio.com/travel/pisa/volterra) · [Rome2Rio Pisa→Volterra](https://www.rome2rio.com/s/Pisa/Volterra)
- [Omio — Nápoles → Lecce](https://www.omio.com/trains/naples/lecce)
- [Omio — La Spezia → Porto Venere (bus)](https://www.omio.com/buses/la-spezia/portovenere-enhef) · [Porto Venere — cómo llegar](https://www.porto-venere.com/en/how-to-get-to-portovenere)

> Snapshot: 28 may 2026. Verificar precios reales al abrir ventas.
