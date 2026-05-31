# Transporte entre ciudades — ruta v1 (Italia + París)

Fuente canónica de la **ruta vigente** y de las búsquedas de transporte. Todo cambio de
itinerario/ruta se refleja aquí. Las búsquedas se hacen con la skill **`busqueda-transporte`**,
que es **automática** (solo nombre de ciudad) y cruza **rome2rio + Omio** vía FireCrawl
(multimodal: tren/bus/vuelo).

> ⚠️ **Sobre los precios.** La skill cruza dos fuentes: **rome2rio** (panorama multimodal con
> **rango de precio**, duración y frecuencia) y **Omio** (horarios reales / tarifa fija regional,
> fecha cercana). Los **trenes regionales** (Como, Verona, Padua, Pisa…) tienen **tarifa fija**
> → ese precio ya es el real. La **alta velocidad y los vuelos** usan precio **dinámico** y para
> sep–oct 2026 pueden no estar a la venta aún (abren ~4 meses antes): esas celdas quedan
> **"Por buscar"** hasta confirmarlas más cerca / al abrir ventas.

## Supuestos

- **2 viajeros.** Donde haya precio se indica **por persona** (× 2 para la pareja).
- Tarifas de tren = **Economy/advance** (comprando con anticipación).
- Tipo de cambio referencia: **€1 ≈ 20 MXN** (consistente con Volterra: €244 ≈ $4,903 MXN).
- El modo (tren/bus/vuelo) **se decide con datos reales por tramo**, no se predefine.

## Tramos del itinerario (v1)

16 noches · 26 sep → 12 oct 2026 · 2 viajeros · Cancún (CUN) ⇄ Milán Malpensa (MXP).
Recorrido: Milán → Bérgamo → Venecia → Bérgamo → **París** → Roma → Florencia → Volterra → Milán.

| # | Fecha | Tramo | Modo | Duración | €/persona | Notas |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | lun 28 sep | Milán → **Como** | Tren Regionale (TRENORD) | 40 min–1h04 | €4.7–5.7 (MX$95–115, fija) | Directo c/30 min; Milano Centrale/P. Garibaldi → Como S. Giovanni (ej. 05:43→06:23). Alt: bus Autoguidovie 1h35 ~MX$80–130. Salida por la mañana |
| 2 | lun 28 sep | Como → **Bérgamo** | Por buscar | Por buscar | Por buscar | Por la tarde; noche en Bérgamo |
| 3 | mar 29 sep | Bérgamo → **Verona** (parada) | Por buscar | Por buscar | Por buscar | Parada en Verona |
| 4 | mar 29 sep | Verona → **Venecia** | Por buscar | Por buscar | Por buscar | Noche en Venecia |
| 5 | jue 1 oct | Venecia → **Padua** (parada) | Por buscar | Por buscar | Por buscar | Parada en Padua |
| 6 | jue 1 oct | Padua → **Bérgamo** | Por buscar | Por buscar | Por buscar | Noche en Bérgamo |
| 7 | vie 2 oct | ✈️ Bérgamo (BGY) → **París** | Vuelo | Por buscar | Por buscar | Ryanair/easyJet desde BGY; 3 noches en París |
| 8 | lun 5 oct | ✈️ París → **Roma** | Vuelo | Por buscar | Por buscar | Low-cost (Vueling/ITA/Transavia); 3 noches en Roma |
| 9 | jue 8 oct | Roma → **Florencia** | Por buscar | Por buscar | Por buscar | Frecciarossa/Italo ~1h30; noche en Florencia |
| 10 | vie 9 oct | Florencia → **Pisa** (parada) | Por buscar | Por buscar | Por buscar | Parada en Pisa |
| 11 | vie 9 oct | Pisa → **Volterra** | Por buscar | Por buscar | Por buscar | No hay tren directo (tren + bus CPT); 2 noches en Volterra ✅ |
| 12 | dom 11 oct | Volterra → **Milán** (cerca MXP) | Por buscar | Por buscar | Por buscar | Noche cerca de MXP para vuelo 12 oct 06:55 |

> Vuelos CUN⇄MXP (26 sep / 12 oct) están en `docs/vuelos.md` (Condor, reservado ✅).
> Datos de rome2rio + Omio (mayo 2026). Regionales = tarifa fija; alta velocidad/vuelos =
> precio dinámico, confirmar al abrir ventas (~jun 2026). Tipo de cambio ref €1≈20 MXN; €≈USD.

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

- Skill `busqueda-transporte` → Omio vía FireCrawl (ver `.claude/skills/busqueda-transporte/`).
- [seat61 — trenes en Italia 2026](https://www.seat61.com/train-travel-in-italy.htm)
- [Rome2Rio](https://www.rome2rio.com/) · [Omio](https://www.omio.com/) (referencia)

> Snapshot: 31 may 2026. Ruta v1 (con París). Precios "Por buscar" se llenan con la skill.
