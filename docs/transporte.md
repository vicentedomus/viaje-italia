# Transporte entre ciudades — ruta v1 (Italia + París)

Fuente canónica de la **ruta vigente** y de las búsquedas de transporte. Todo cambio de
itinerario/ruta se refleja aquí. Las búsquedas se hacen con la skill **`busqueda-transporte`**,
que es **automática** (solo nombre de ciudad) y cruza **rome2rio + Omio** vía FireCrawl
(multimodal: tren/bus/vuelo).

> ✅ **Precios reales (no estimados).** Son tarifas reales de rome2rio + Omio: el **extremo
> bajo** del rango ≈ la **tarifa anticipada** y el alto ≈ comprando sobre la fecha. Verificado
> contra la vista dateada de rome2rio (Roma→Florencia 8 oct: Italo MX$514, Frecciarossa MX$587,
> FlixBus MX$187–375 — coincide con el rango bajo de la tabla). Los **regionales** tienen
> **tarifa fija**. Para fijar el horario/tarifa exactos de un día, abrir la vista
> *Schedules – Departure* de rome2rio (seleccionar fecha) o buscar en Omio con esa fecha.

## Supuestos

- **2 viajeros.** Donde haya precio se indica **por persona** (× 2 para la pareja).
- Tarifas de tren = **Economy/advance** (comprando con anticipación).
- Tipo de cambio referencia: **€1 ≈ 20 MXN**, **USD1 ≈ 18 MXN** (consistente con Volterra:
  €244 ≈ $4,903 MXN).
- El modo (tren/bus/vuelo) **se decide con datos reales por tramo**, no se predefine.

## Tramos del itinerario (v1)

16 noches · 26 sep → 12 oct 2026 · 2 viajeros · Cancún (CUN) ⇄ Milán Malpensa (MXP).
Recorrido: Milán → Bérgamo → Venecia → Bérgamo → **París** → Roma → Florencia → Volterra → Milán.

Precio = por persona en **MXN**, rango bajo–alto (rome2rio cruzado con Omio). Recomendado =
mejor equilibrio precio/tiempo/frecuencia; el modo se decidió con datos reales, no se predefinió.

| # | Fecha | Tramo | Recomendado | Duración | MXN/pers. | Alternativas y notas |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | lun 28 sep | Milán → **Como** | 🚆 Tren Regionale (Trenitalia/Trenord) | 40 min–1h | **$105** (fija) | Directo, c/20 min. Más rápido: 05:43→06:23 (40 min). Bus ASF/FlixBus 2h $144–360. AM |
| 2 | lun 28 sep | Como → **Bérgamo** | 🚌 Bus ASF (directo) | 2h09 | **$204** | 06:44→08:53 directo. Tren Trenitalia 1h15 (vía Milán) $234. PM; noche en Bérgamo |
| 3 | mar 29 sep | Bérgamo → **Verona** (parada) | 🚌 Bus FlixBus | 1h55 | **$190** | 09:10→11:05. Más rápido: tren Italo 34 min $378 (o Trenitalia $234, 1 cambio). Parada en Verona |
| 4 | mar 29 sep | Verona → **Venecia** | 🚆 Tren Regionale Veloce | 1h10 | **~$200** | Directo c/20 min. Bus FlixBus 1h35–2h $198. Noche en Venecia |
| 5 | jue 1 oct | Venecia → **Padua** (parada) | 🚆 Tren Regionale | 26 min | **$90** | Directo c/10 min. Más rápido: Frecce 14 min $234. Bus $144. Parada en Padua |
| 6 | jue 1 oct | Padua → **Bérgamo** | 🚌 Bus FlixBus | 2h10 | **$414** | 06:45→08:55. Tren Trenitalia 3h14 $378 (más barato, más lento). Auto 1h48. Noche en Bérgamo |
| 7 | vie 2 oct | ✈️ Bérgamo (BGY) → **París** | ✈️ Vuelo (Ryanair, BGY→Beauvais) | 3h22 (con traslados) | **$923–2,360** | Diario. Más barato es bus 13h $828; tren 8h45 $3,490+. Reservar maleta al comprar. 3 noches en París |
| 8 | lun 5 oct | ✈️ París → **Roma** | ✈️ Vuelo (ITA/Transavia/Vueling) | ~2h10 (vuelo) | **$2,016–4,464** | c/2h. Alt baratas lentas: bus 23h $1,440; tren 10h $2,160. 3 noches en Roma |
| 9 | jue 8 oct | Roma → **Florencia** | 🚆 Tren AV (Italo/Frecciarossa) | 1h12–1h37 | **$514–587** | Directo c/15 min (Italo 09:05→10:17 $520). Bus FlixBus 3h15 $216. Noche en Florencia |
| 10 | vie 9 oct | Florencia → **Pisa** (parada) | 🚆 Tren Regionale | 51 min–1h23 | **$182** | Directo c/30 min (07:00→07:51). Bus 1h15 $234. Parada en Pisa |
| 11 | vie 9 oct | Pisa → **Volterra** | 🚆🚌 Tren a Pontedera + bus AT | ~2h35 | **~$180** ⚠️ | No hay directo; rome2rio no da horarios exactos (pueblo chico). Auto 1h08. 2 noches en Volterra ✅ |
| 12 | dom 11 oct | Volterra → **Milán** (cerca MXP) | 🚌🚆 Bus a Pontedera + tren AV | ~5h | **~$630–1,350** ⚠️ | Sin horario exacto en rome2rio. Tren vía Florencia ~$630; AV directo desde Pisa más caro. Noche cerca MXP (vuelo 12 oct 06:55) |

> Vuelos CUN⇄MXP (26 sep / 12 oct) están en `docs/vuelos.md` (Condor, reservado ✅).
> Precio **en negrita** = tarifa real del día exacto (rome2rio Schedules dateado), salvo ⚠️
> (Volterra: rome2rio no da horarios, valor aproximado). Normalizado a MXN (USD≈18). Los
> vuelos varían día a día: confirmar en la aerolínea.

## Totales (transporte terrestre + 2 vuelos internos)

Suma de los modos recomendados (precios dateados reales), por persona:

| Escenario | MXN/pers. | MXN/pareja |
| --- | --- | --- |
| **Vuelos baratos** (Bérgamo→París $923, París→Roma $2,016) | ~$5,650 | **~$11,300** |
| Vuelos a tarifa alta del día ($2,360 + $4,464) | ~$9,550 | ~$19,100 |

Desglose terrestre (10 tramos, sin los 2 vuelos): **~$2,700 MXN/pers (~$5,400 pareja)**.
Los **dos vuelos** son ~55–70% del total y lo que más varía: reservarlos pronto es la mayor
palanca de ahorro. Los regionales (Como, Venecia↔Padua, Florencia↔Pisa) son tarifa fija y baratos.

## Si compraras hoy (31 may 2026)

- **Vuelos (tramos 7 y 8):** bookables hoy para esas fechas; con ~16 meses de anticipación suelen
  estar baratos. Realista: Bérgamo→París ~$1,500 + París→Roma ~$1,980 (Omio mostró €99) /persona.
- **Tren AV Roma→Florencia (tramo 9):** **comprable hoy** y barato — Italo MX$514 / Frecciarossa
  MX$587 (verificado en rome2rio para 8 oct). Tarifa anticipada; sube si esperas.
- **Regionales y buses (tramos 1–6, 10–12):** disponibles / tarifa fija; se compran cuando sea.

**Comprando todo hoy ≈ $5,650 MXN/persona → ~$11,300 la pareja** (con vuelos en su tarifa baja).
Casi todo es comprable ya; el costo real depende sobre todo de cuándo reserves los dos vuelos.

## Cómo llenar / actualizar esta tabla

Con la skill, automático, un tramo a la vez (no predefinas modo). Para precios/horarios reales
de un día, pasa `--date`; añade `--air` solo en tramos donde el avión aplica:

```bash
node .claude/skills/busqueda-transporte/scripts/buscar_transporte.mjs --from rome --to florence --date 2026-10-08
node .claude/skills/busqueda-transporte/scripts/buscar_transporte.mjs --from bergamo --to paris --date 2026-10-02 --air
```

Sin `--date`, cruza rome2rio (panorama: rango/frecuencia) + Omio (horarios / tarifa fija):

```bash
node .claude/skills/busqueda-transporte/scripts/buscar_transporte.mjs --from milan --to como
node .claude/skills/busqueda-transporte/scripts/buscar_transporte.mjs --from como  --to bergamo
```

Los precios salen en MXN (campos `*_mxn`). Al confirmar una opción con Vicente, se actualiza la
fila (modo/duración/precio) aquí.

## Notas y palancas de ahorro

- **Dos vuelos internos (Bérgamo→París, París→Roma)** son los tramos caros y el factor que
  más mueve el presupuesto. Bérgamo (BGY) es base de Ryanair → París Beauvais/CDG. Comparar
  con salir de Milán (MXP/LIN) si BGY no tiene buen horario. Reservar **maleta documentada al
  comprar** (más barata que en el aeropuerto).
- **Trenes de alta velocidad** (Roma→Florencia): comprar al abrir ventas (~jun 2026). La
  diferencia Economy vs Base es enorme.
- **Pisa→Volterra:** no hay tren directo. Ruta económica = tren a Pontedera/Cecina + bus CPT
  (~€3.50). Alternativa con maletas: taxi del último tramo (~€60–80 el coche).
- **Tramos regionales con parada** (Como, Verona, Padua, Pisa): billete regionale de precio
  fijo, sin necesidad de anticipación; se compran el mismo día.
- **Volterra → Milán (11 oct):** tramo largo (bus + tren ~5–6h). Dormir cerca de MXP esa
  noche para el vuelo de las 06:55 del 12 oct.

## Fuentes

- Skill `busqueda-transporte` → rome2rio + Omio vía FireCrawl (ver `.claude/skills/busqueda-transporte/`).
- [seat61 — trenes en Italia 2026](https://www.seat61.com/train-travel-in-italy.htm)
- [Rome2Rio](https://www.rome2rio.com/) · [Omio](https://www.omio.com/) (referencia)

> Snapshot: 31 may 2026. Ruta v1 (con París). Precios de rome2rio + Omio en MXN; reconfirmar al
> abrir ventas (~jun 2026) los vuelos y trenes de alta velocidad.
