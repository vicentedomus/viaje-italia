# Transporte entre ciudades — ruta v1 (Italia + París)

Fuente canónica de la **ruta vigente** y de las búsquedas de transporte. Todo cambio de
itinerario/ruta se refleja aquí. Las búsquedas se hacen con la skill **`busqueda-transporte`**,
que es **automática** (solo nombre de ciudad) y cruza **rome2rio + Omio** vía FireCrawl
(multimodal: tren/bus/vuelo).

> ⚠️ **Sobre los precios.** La skill cruza dos fuentes: **rome2rio** (panorama multimodal con
> **rango de precio**, duración y frecuencia) y **Omio** (horarios reales / tarifa fija regional,
> fecha cercana). Los **trenes regionales** (Como, Verona, Padua, Pisa…) tienen **tarifa fija**
> → ese precio ya es el real. La **alta velocidad y los vuelos** usan precio **dinámico** y para
> sep–oct 2026 pueden no estar a la venta aún (abren ~4 meses antes): esos precios son
> indicativos y se confirman más cerca / al abrir ventas.

## Supuestos

- **2 viajeros.** Donde haya precio se indica **por persona** (× 2 para la pareja).
- Tarifas de tren = **Economy/advance** (comprando con anticipación).
- Tipo de cambio referencia: **€1 ≈ 20 MXN** (consistente con Volterra: €244 ≈ $4,903 MXN).
- El modo (tren/bus/vuelo) **se decide con datos reales por tramo**, no se predefine.

## Tramos del itinerario (v1)

16 noches · 26 sep → 12 oct 2026 · 2 viajeros · Cancún (CUN) ⇄ Milán Malpensa (MXP).
Recorrido: Milán → Bérgamo → Venecia → Bérgamo → **París** → Roma → Florencia → Volterra → Milán.

Precio = por persona, rango bajo–alto (rome2rio cruzado con Omio). Recomendado = mejor
equilibrio precio/tiempo/frecuencia; el modo se decidió con datos reales, no se predefinió.

| # | Fecha | Tramo | Recomendado | Duración | Precio/pers. | Alternativas y notas |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | lun 28 sep | Milán → **Como** | 🚆 Tren Regionale (TRENORD) | 40 min–1h | ~$5 (fija) | Directo c/20 min, Milano Centrale/P.Garibaldi → Como S.Giovanni. Bus FlixBus 50 min $4–7. AM |
| 2 | lun 28 sep | Como → **Bérgamo** | 🚆 Tren Trenord | 2h08 | $8–11 | c/30 min (vía Milán). Bus ASF directo 1h50 $13–18. BlaBlaCar 1h15 $5. PM; noche en Bérgamo |
| 3 | mar 29 sep | Bérgamo → **Verona** (parada) | 🚌 Bus FlixBus | 1h25 | $6–19 | Cada hora, directo. Tren Trenitalia 1h42 $11–81 (1 cambio). Parada en Verona |
| 4 | mar 29 sep | Verona → **Venecia** | 🚆 Tren (Trenitalia/Regionale Veloce) | 1h10–1h12 | $10–30 | Directo c/20 min. Bus FlixBus 2h $11–19. Noche en Venecia |
| 5 | jue 1 oct | Venecia → **Padua** (parada) | 🚆 Tren Regionale | 26 min | $5–7 (fija) | Directo c/10 min. Bus 40 min $2–8. Parada en Padua |
| 6 | jue 1 oct | Padua → **Bérgamo** | 🚌 Bus (FlixBus/Itabus) | 2h45 | ~$9–24 | c/4h. Tren 2h54 ~$23–88 (1 cambio). Auto 1h48. Noche en Bérgamo |
| 7 | vie 2 oct | ✈️ Bérgamo (BGY) → **París** | ✈️ Vuelo (easyJet/Ryanair) | 3h22 | $59–248 | Diario, directo. Bus 13h $75–160; tren 8h45 $126–217. Reservar maleta al comprar. 3 noches en París |
| 8 | lun 5 oct | ✈️ París → **Roma** | ✈️ Vuelo (ITA/Transavia/Air France) | 2h10 vuelo | ~$63–218 (Omio €99) | c/2h. Tren 10h $190–335; bus 6h22+. 3 noches en Roma |
| 9 | jue 8 oct | Roma → **Florencia** | 🚆 Tren AV (Frecciarossa/Italo) | 1h37 | $27–110 | Directo c/15 min; comprar al abrir ventas. Bus 3h15 $14–45. Noche en Florencia |
| 10 | vie 9 oct | Florencia → **Pisa** (parada) | 🚆 Tren Regionale | 1h23–1h28 | ~$9–17 (fija) | Directo c/30 min. Bus FlixBus 1h15 $5–33. Parada en Pisa |
| 11 | vie 9 oct | Pisa → **Volterra** | 🚆🚌 Tren + bus (Trenitalia + Autolinee Toscane) | 2h35 | $7–10 | No hay directo: tren a Pontedera + bus a Volterra. Auto 1h08. 2 noches en Volterra ✅ |
| 12 | dom 11 oct | Volterra → **Milán** (cerca MXP) | 🚌🚆 Bus + Tren vía Florencia | 5h06 | $47–129 | Bus a Pontedera + tren a Milán. Bus directo 7h33 $31–53. Noche cerca de MXP (vuelo 12 oct 06:55) |

> Vuelos CUN⇄MXP (26 sep / 12 oct) están en `docs/vuelos.md` (Condor, reservado ✅).
> Datos de rome2rio + Omio (mayo 2026), precios en **USD** (€≈USD). Regionales = tarifa fija;
> alta velocidad/vuelos = precio dinámico, confirmar al abrir ventas (~jun 2026). Ref €1≈20 MXN.

## Totales estimados (transporte terrestre + 2 vuelos internos)

Suma de los recomendados (por persona), rango bajo–alto:

| Escenario | USD/pers. | USD/pareja | MXN/pareja (≈) |
| --- | --- | --- | --- |
| **Reservando con tiempo** (tarifas bajas) | ~$200 | **~$400** | **≈ $7,200** |
| Reservando tarde / tarifas altas | ~$640 | ~$1,280 | ≈ $23,000 |

Los **dos vuelos** (Bérgamo→París, París→Roma) son ~45% del total y lo que más varía:
reservarlos pronto es la mayor palanca de ahorro. Los trenes regionales (Como, Venecia↔Padua,
Florencia↔Pisa) son tarifa fija y baratos. (MXN con ~18 MXN/USD.)

## Cómo llenar esta tabla

Con la skill, automático, un tramo a la vez (no predefinas modo). Cruza rome2rio (panorama
multimodal: rango de precio, duración, frecuencia) + Omio (horarios reales / tarifa fija):

```bash
node .claude/skills/busqueda-transporte/scripts/buscar_transporte.mjs --from milan --to como
node .claude/skills/busqueda-transporte/scripts/buscar_transporte.mjs --from como  --to bergamo
```

Al confirmar una opción con Vicente, se actualiza la fila (modo/duración/precio) aquí.

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

> Snapshot: 31 may 2026. Ruta v1 (con París). Precios de rome2rio + Omio; reconfirmar al
> abrir ventas (~jun 2026) los vuelos y trenes de alta velocidad.
