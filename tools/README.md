# Herramienta: consultar Omio en vivo (sesión local + tu Chrome)

Esto sirve **solo en una sesión local de Claude Code** (en tu Mac), no en el
entorno remoto/web. Funciona porque se conecta a **tu propio Chrome**: IP
residencial + sesión ya validada por Cloudflare, así que la página de resultados
de Omio carga sin chocar con el muro anti-bot (que sí bloquea al entorno remoto).

> ⚠️ Uso personal y de bajo volumen. El acceso automatizado a Omio está
> técnicamente fuera de sus ToS; no lo conviertas en un scraper masivo.

## 1. Instalar Playwright (una vez)

```bash
pip install playwright
# NO hace falta 'playwright install': usamos tu Chrome, no uno descargado.
```

## 2. Lanzar Chrome con depuración remota

Cierra Chrome si quieres reusar tu perfil, o usa un perfil dedicado (recomendado;
así el primer reto de Cloudflare queda guardado ahí):

```bash
open -na "Google Chrome" --args \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/.omio-chrome"
```

La primera vez: en esa ventana entra a https://www.omio.com, y si aparece un reto
de Cloudflare, resuélvelo a mano una vez (queda guardado en ese perfil).

## 3. Buscar en Omio (en esa ventana)

Haz tu búsqueda normal: origen, destino, fecha → hasta ver la **lista de
resultados** (trenes/buses/vuelos con horarios y precios).

## 4. Capturar para que Claude lo lea

```bash
python3 tools/omio_cdp.py --label bergamo-paris-2oct
```

Opcional, si ya tienes la URL de resultados:

```bash
python3 tools/omio_cdp.py --url "https://www.omio.com/app/search-frontend/results/.../flight?locale=en" --label bergamo-paris-2oct
```

Deja un **screenshot** y un **.txt** en `tools/captures/`. Pásaselos a Claude
(arrastra el PNG o menciona el archivo) y él extrae horarios, duraciones,
transbordos y precios, y ajusta `docs/itinerario.md` / `docs/transporte.md` /
`docs/presupuesto.md`.

## Tramos a consultar — recorrido actual (Italia + París)

Recorrido vigente: Milán → Como → Bérgamo → Verona → Venecia → Padua → Bérgamo →
✈️ **París (3 noches)** → ✈️ Roma → Florencia → Pisa → **Volterra** → Milán.
Ver [`docs/itinerario.md`](../docs/itinerario.md).

Prioriza los **2 vuelos** (mayor costo y más volátil). Sugerencia de `--label`:

| Prioridad | Fecha | Tramo | `--label` sugerido |
| --- | --- | --- | --- |
| 🔴 vuelo | 2 oct | Bérgamo (BGY) → París | `bergamo-paris-2oct` |
| 🔴 vuelo | 5 oct | París → Roma (FCO) | `paris-roma-5oct` |
| 🟠 tren | 8 oct | Roma → Florencia | `roma-florencia-8oct` |
| 🟠 tren | 11 oct | Volterra → Milán (cerca MXP) | `volterra-milan-11oct` |
| 🟡 regional | 28 sep | Milán → Como → Bérgamo | `milan-como-bergamo-28sep` |
| 🟡 regional | 29 sep | Bérgamo → Verona → Venecia | `bergamo-verona-venecia-29sep` |
| 🟡 regional | 1 oct | Venecia → Padua → Bérgamo | `venecia-padua-bergamo-1oct` |
| 🟡 regional+bus | 9 oct | Florencia → Pisa → Volterra | `florencia-pisa-volterra-9oct` |

> Para los vuelos, busca en Omio en modo "Flights" y compara aeropuerto de llegada
> en París (Beauvais vs Orly/CDG) por el costo+tiempo del transfer. Reserva con
> **maleta documentada**.

## Flujo de trabajo sugerido para ajustar el viaje

1. Empieza por los 2 vuelos (ver tabla arriba): son el mayor costo y definen los
   horarios del 2 y 5 oct.
2. Por cada tramo, haces la búsqueda en tu Chrome y corres `omio_cdp.py --label <tramo>`.
3. Yo leo la captura, comparo opciones (aerolíneas / Trenitalia vs Italo, horario
   temprano vs barato, conexiones) y afino los movimientos con datos reales.
4. Actualizo `docs/transporte.md`, `docs/presupuesto.md` y, si cambia algún horario
   clave, `docs/itinerario.md`; luego abro PR.

## Notas

- `tools/captures/` está en `.gitignore`: las capturas son datos efímeros, no se
  versionan (pueden tener info personal).
- ¿Error "No me pude conectar a Chrome"? Verifica que Chrome se lanzó con
  `--remote-debugging-port=9222` y que `http://localhost:9222/json/version`
  responde en el navegador.
