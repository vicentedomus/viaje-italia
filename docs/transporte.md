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
| 1 | lun 28 sep | Milán → **Como** | 🚆 Tren Regionale (TRENORD) | 40 min–1h | ~$100 (fija) | Directo c/20 min, Milano Centrale/P.Garibaldi → Como S.Giovanni. Bus FlixBus 50 min $70–125. AM |
| 2 | lun 28 sep | Como → **Bérgamo** | 🚆 Tren Trenord | 2h08 | $145–200 | c/30 min (vía Milán). Bus ASF directo 1h50 $235–325. BlaBlaCar 1h15 $90. PM; noche en Bérgamo |
| 3 | mar 29 sep | Bérgamo → **Verona** (parada) | 🚌 Bus FlixBus | 1h25 | $110–340 | Cada hora, directo. Tren Trenitalia 1h42 $200–1,460 (1 cambio). Parada en Verona |
| 4 | mar 29 sep | Verona → **Venecia** | 🚆 Tren (Trenitalia/Regionale Veloce) | 1h10–1h12 | $180–540 | Directo c/20 min. Bus FlixBus 2h $200–340. Noche en Venecia |
| 5 | jue 1 oct | Venecia → **Padua** (parada) | 🚆 Tren Regionale | 26 min | $90–125 (fija) | Directo c/10 min. Bus 40 min $35–145. Parada en Padua |
| 6 | jue 1 oct | Padua → **Bérgamo** | 🚌 Bus (FlixBus/Itabus) | 2h45 | ~$160–430 | c/4h. Tren 2h54 ~$415–1,585 (1 cambio). Auto 1h48. Noche en Bérgamo |
| 7 | vie 2 oct | ✈️ Bérgamo (BGY) → **París** | ✈️ Vuelo (easyJet/Ryanair) | 3h22 | $1,060–4,460 | Diario, directo. Bus 13h $1,350–2,880; tren 8h45 $2,270–3,900. Reservar maleta al comprar. 3 noches en París |
| 8 | lun 5 oct | ✈️ París → **Roma** | ✈️ Vuelo (ITA/Transavia/Air France) | 2h10 vuelo | $1,130–3,920 (Omio ~$1,980) | c/2h. Tren 10h $3,420–6,030; bus 6h22+. 3 noches en Roma |
| 9 | jue 8 oct | Roma → **Florencia** | 🚆 Tren AV (Italo/Frecciarossa) | 1h37 | $514–587 (real 8 oct) | Italo MX$514 (1h37), Frecciarossa MX$587 (directo). Bus FlixBus 3h15 MX$187–375. Noche en Florencia |
| 10 | vie 9 oct | Florencia → **Pisa** (parada) | 🚆 Tren Regionale | 1h | $160–340 | Directo c/30 min. Bus 1h27 $160–270. Parada en Pisa |
| 11 | vie 9 oct | Pisa → **Volterra** | 🚆🚌 Tren + bus (Trenitalia + Autolinee Toscane) | ~2h35 | $125–180 | No hay tren directo: tren a Pontedera + bus a Volterra. Auto 1h08. 2 noches en Volterra ✅ |
| 12 | dom 11 oct | Volterra → **Milán** (cerca MXP) | 🚌🚆 Bus + Tren vía Florencia | ~5h06 | $845–2,320 | Bus a Pontedera + tren a Milán. Bus directo 7h33 $560–955. Noche cerca de MXP (vuelo 12 oct 06:55) |

> Vuelos CUN⇄MXP (26 sep / 12 oct) están en `docs/vuelos.md` (Condor, reservado ✅).
> Datos de rome2rio + Omio (mayo 2026), normalizados a **MXN**. Regionales = tarifa fija;
> alta velocidad/vuelos = precio dinámico, confirmar al abrir ventas (~jun 2026).

## Totales (transporte terrestre + 2 vuelos internos)

Suma de los modos recomendados, por persona:

| Escenario | MXN/pers. | MXN/pareja |
| --- | --- | --- |
| **Reservando con tiempo** (tarifas anticipadas) | ~$4,600 | **~$9,200** |
| Comprando sobre la fecha / tarifas altas | ~$14,900 | ~$29,800 |

Los **dos vuelos** (Bérgamo→París, París→Roma) son ~45% del total y lo que más varía:
reservarlos pronto es la mayor palanca de ahorro. Los trenes regionales (Como, Venecia↔Padua,
Florencia↔Pisa) son tarifa fija y baratos.

## Si compraras hoy (31 may 2026)

- **Vuelos (tramos 7 y 8):** bookables hoy para esas fechas; con ~16 meses de anticipación suelen
  estar baratos. Realista: Bérgamo→París ~$1,500 + París→Roma ~$1,980 (Omio mostró €99) /persona.
- **Tren AV Roma→Florencia (tramo 9):** **comprable hoy** y barato — Italo MX$514 / Frecciarossa
  MX$587 (verificado en rome2rio para 8 oct). Tarifa anticipada; sube si esperas.
- **Regionales y buses (tramos 1–6, 10–12):** disponibles / tarifa fija; se compran cuando sea.

**Comprando todo hoy en tarifa anticipada ≈ $4,600–6,000 MXN/persona → ~$9,200–12,000 la pareja.**
Casi todo es comprable ya; el costo real depende sobre todo de cuándo reserves los dos vuelos.

## Cómo llenar / actualizar esta tabla

Con la skill, automático, un tramo a la vez (no predefinas modo). Cruza rome2rio (panorama
multimodal: rango de precio, duración, frecuencia) + Omio (horarios reales / tarifa fija):

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
