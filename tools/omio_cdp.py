#!/usr/bin/env python3
"""
omio_cdp.py — Captura resultados de Omio reusando TU navegador Chrome (vía CDP).

Idea: en vez de lanzar un navegador headless nuevo (que Cloudflare bloquea desde
IPs de datacenter), nos CONECTAMOS a tu Chrome ya abierto en tu Mac. Como es tu
sesión real (IP residencial + clearance de Cloudflare ya resuelto), la página de
resultados carga sin pelear con el anti-bot.

Flujo de uso:
  1. Lanza Chrome con depuración remota (ver tools/README.md).
  2. En esa ventana, haz tu búsqueda en omio.com (origen, destino, fecha) hasta
     llegar a la lista de resultados.
  3. Corre este script. Captura un screenshot + el texto de la página y los deja
     en tools/captures/ para que Claude los lea y extraiga horarios/precios.

Uso:
  python3 tools/omio_cdp.py                 # captura la pestaña activa de Omio
  python3 tools/omio_cdp.py --url "<URL>"   # navega a esa URL y luego captura
  python3 tools/omio_cdp.py --label roma-napoli-6oct   # nombra la captura

Requisitos:
  pip install playwright      # NO hace falta 'playwright install': usamos tu Chrome
"""
import argparse
import datetime as dt
import pathlib
import re
import sys

CDP_URL = "http://localhost:9222"
OUT_DIR = pathlib.Path(__file__).parent / "captures"

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    sys.exit("Falta Playwright. Instala con:  pip install playwright")


def pick_page(browser, want_url):
    """Devuelve una página de Omio (o la primera disponible)."""
    pages = [pg for ctx in browser.contexts for pg in ctx.pages]
    if not pages:
        raise RuntimeError("No hay pestañas abiertas en el Chrome conectado.")
    if want_url:
        pg = pages[0]
        pg.goto(want_url, wait_until="domcontentloaded", timeout=60000)
        return pg
    for pg in pages:
        if "omio." in (pg.url or ""):
            return pg
    return pages[0]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", help="URL de resultados de Omio a abrir antes de capturar")
    ap.add_argument("--label", default="omio", help="Nombre base de la captura")
    ap.add_argument("--cdp", default=CDP_URL, help="Endpoint CDP (default localhost:9222)")
    ap.add_argument("--wait", type=int, default=9, help="Segundos de espera para que rendericen los resultados")
    args = ap.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    safe = re.sub(r"[^a-zA-Z0-9_.-]+", "-", args.label).strip("-")
    base = OUT_DIR / f"{stamp}_{safe}"

    with sync_playwright() as p:
        try:
            browser = p.chromium.connect_over_cdp(args.cdp, timeout=15000)
        except Exception as e:
            sys.exit(
                f"No me pude conectar a Chrome en {args.cdp}.\n"
                f"  -> Asegúrate de haber lanzado Chrome con --remote-debugging-port=9222\n"
                f"     (ver tools/README.md). Detalle: {e}"
            )

        page = pick_page(browser, args.url)
        page.bring_to_front()
        page.wait_for_timeout(args.wait * 1000)

        title = page.title()
        url = page.url
        body = ""
        try:
            body = page.inner_text("body")
        except Exception:
            body = page.content()

        blocked = ("Just a moment" in title) or ("Verifying you are human" in body[:2000])

        png = base.with_suffix(".png")
        txt = base.with_suffix(".txt")
        page.screenshot(path=str(png), full_page=True)
        txt.write_text(f"URL: {url}\nTITLE: {title}\n\n{body}", encoding="utf-8")

        # heurística rápida: cuántas tarifas (€) se ven
        prices = re.findall(r"€\s?\d[\d.,]*", body)
        print(f"✓ Conectado a tu Chrome ({args.cdp})")
        print(f"  Página : {title!r}")
        print(f"  URL    : {url}")
        if blocked:
            print("  ⚠️  Parece pantalla de Cloudflare ('Just a moment'). Resuelve el reto en la ventana y reintenta.")
        print(f"  Tarifas detectadas (€): {len(prices)}  {prices[:8]}")
        print(f"  Screenshot : {png}")
        print(f"  Texto      : {txt}")
        print("\nPásale a Claude el screenshot y/o el .txt para extraer horarios y precios.")

        browser.close()


if __name__ == "__main__":
    main()
