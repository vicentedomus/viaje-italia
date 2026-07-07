# Viaje a Italia 2026 — Contexto del proyecto

Repositorio de planeación del viaje a Italia (sep–oct 2026). Este archivo es el
**punto de entrada**: un agente o colaborador que entre cold debe poder leerlo y
tener todo el contexto necesario para trabajar.

> Snapshot vivo. Fuente original en Notion:
> [Decisiones de vuelo — Cancún ⇄ Milán (MXP)](https://www.notion.so/36fbece6f7da80aa8341fb67bb149d9b).
> Última actualización: **29 mayo 2026**.

---

## TL;DR

- **Viajeros:** 2 adultos (Vicente + acompañante)
- **Origen / destino:** Cancún (CUN) ⇄ Milán Malpensa (MXP)
- **Fechas:** vie 25 sep 2026 → lun 12 oct 2026 (16 noches en tierra)
- **Aerolínea (internacional):** Condor (Economy), Booking #16267799, ~$17,888 MXN total ✅
- **Estructura (ruta v1, con París):** Milán → Como → Bérgamo → Verona → Venecia → Padua → Bérgamo → ✈️ **París (3 noches)** → ✈️ Roma → Florencia → Pisa → **Volterra (reservado 9–11 oct)** → Milán → vuelo
- **2 vuelos low-cost reservados ✅:** Bérgamo→París (2 oct, Ryanair `L8IW5R`), París→Roma (5 oct, Wizz Air `LIU7PI`)
- **Hospedajes confirmados:** Airbnb Milán inicio (26–28 sep) · NH Orio al Serio, Bérgamo (1–2 oct) · Airbnb París (2–5 oct) · Hotel La Locanda, Volterra (9–11 oct)

---

## Estructura del repo

| Archivo | Contenido |
| --- | --- |
| `CLAUDE.md` | Este archivo. Contexto general + convenciones de trabajo. |
| `README.md` | Vista humana rápida con estado del viaje. |
| `docs/vuelos.md` | Detalle de vuelos reservados y pendientes. |
| `docs/hospedajes.md` | Tracker de hospedajes (4 confirmados, 5 pendientes). |
| `docs/ciudades.md` | Clasificación de ciudades y decisiones tomadas. |
| `docs/itinerario.md` | Recorrido día por día (16 noches). |
| `docs/transporte.md` | Ruta vigente y búsquedas de transporte (fuente canónica). |
| `docs/presupuesto.md` | Presupuesto y gastos. |
| `docs/pendientes.md` | Lista de pendientes (reservas y documentos). |

---

## Convenciones de trabajo

- **Vicente decide las ciudades.** El agente NO propone recorrido sin ser invitado.
- El agente sí puede proponer: clasificación base/paso, logística, pendientes operativos.
- Mantén los documentos en `docs/` como **fuente de verdad viva**: al confirmar una
  reserva o tomar una decisión, actualiza el tracker correspondiente y márcala ✅.
- Convención de ciudades: sin asterisco = imprescindible · _con asterisco = eliminable_.
- Tipo de cambio referencia (cuando aplique): 1 USD = 17.20 MXN.
- Fechas siempre en formato `día DD mes` (ej. `vie 9 oct`) para evitar ambigüedad.
- **Ruta canónica:** `docs/transporte.md` es la fuente de la ruta vigente; todo cambio de
  itinerario/ruta se refleja ahí.
- **Búsqueda de transporte:** usar la skill `busqueda-transporte` (rome2rio + Omio vía FireCrawl,
  multimodal tren/bus/vuelo, on-demand; `--date` da precios reales del día). El modo se decide con
  datos reales por tramo, no se predefine. Requiere `FIRECRAWL_API_KEY` en el entorno (no se
  commitea). Para verificación en vivo de Omio también está `tools/` (sesión local CDP).

---

## Estado actual (4 jun 2026)

- ✅ Vuelos internacionales reservados y pagados (Condor CUN⇄MXP, Booking #16267799).
- ✅ Selección de asientos hecha (vuelo Condor).
- ✅ Hotel La Locanda (Volterra, 9–11 oct) reservado, pago en hotel.
- ✅ **2 vuelos low-cost reservados:** Bérgamo→París (2 oct, Ryanair `L8IW5R`) y París→Roma (5 oct, Wizz Air `LIU7PI`, maleta 20 kg).
- 🔵 Itinerario rediseñado con **París** (3 noches) y **Bérgamo** como hub; sur de Italia fuera.
- ✅ Hospedaje París reservado (Airbnb Le Marais, 2–5 oct, `HMEXDMFK55`).
- ✅ Hospedaje Milán inicio reservado (Airbnb, 26–28 sep, `HMH2QSPXD4`, ≈$6,177).
- ✅ Hospedaje Bérgamo 1 oct reservado (NH Orio al Serio Airport, `0200967529`, €161, prepagado, no reembolsable).
- ⏳ 5 hospedajes pendientes de reservar.
- ⏳ Check-in online Vikey del Milán inicio (obligatorio por ley), código `RZK96DC1`.
- ⏳ Trenes/buses entre ciudades pendientes (Frecciarossa + regionales).
- ⏳ Entradas a museos/atracciones pendientes (Uffizi, Vaticano, Coliseo, Louvre…).
- ⚠️ Transfers de aeropuerto París: llega a **Beauvais**, sale de **Orly** (distintos).
