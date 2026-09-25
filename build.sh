#!/usr/bin/env bash
# Costruisce dist/ per il deploy su gh-pages.
# Il sito e' statico: "build" significa copiare public/ in dist/ e verificare
# che il CNAME ci sia, perche' senza il dominio custom si rompe.
set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
cp -R public dist
find dist -name '.DS_Store' -delete

# --- Articoli -------------------------------------------------------------
# Tre controlli che fanno fallire il build, invece di affidarsi alla memoria:
# 1. ogni articolo deve essere linkato dall'indice scritto a mano;
# 2. niente lineette lunghe o medie in nessuna pagina del sito (regola 8 di house-style.md);
# 3. ogni rimando a una fonte (#s1, #s2...) deve avere la sua voce in fondo.
fail=0
for f in public/articles/*/index.html; do
  [ -e "$f" ] || continue
  slug=$(basename "$(dirname "$f")")
  if ! grep -q "href=\"/articles/$slug/\"" public/articles/index.html; then
    echo "ERRORE: l'articolo '$slug' non e' linkato da public/articles/index.html" >&2
    fail=1
  fi
  for ref in $(grep -o 'href="#s[0-9]*"' "$f" | sed 's/href="#\(s[0-9]*\)"/\1/' | sort -u); do
    if ! grep -q "id=\"$ref\"" "$f"; then
      echo "ERRORE: $f rimanda a #$ref ma la fonte non c'e'" >&2
      fail=1
    fi
  done
done
if grep -rn -e '—' -e '–' public/ >&2; then
  echo "ERRORE: lineette nel sito (righe sopra). Usa virgola, punto, due punti." >&2
  fail=1
fi
# --- Content-Security-Policy ------------------------------------------------
# Ogni pagina porta la CSP come <meta>, che non ammette script inline: uno
# <script> senza src o un attributo onclick= verrebbe bloccato dal browser
# senza nessun errore visibile. Il JavaScript sta nei file .js di public/.
for f in $(find public -name '*.html'); do
  if ! grep -q 'http-equiv="Content-Security-Policy"' "$f"; then
    echo "ERRORE: $f non ha la Content-Security-Policy" >&2
    fail=1
  fi
done
if grep -rn -E '<script>|<script [^>]*>[^<]|[[:space:]]on[a-z]+="' --include='*.html' public/ >&2; then
  echo "ERRORE: script inline (righe sopra). La CSP li blocca: spostali in un file .js." >&2
  fail=1
fi
[ "$fail" -eq 0 ] || exit 1

# --- Pubblicazione ----------------------------------------------------------
# `npm run deploy` passa --deploy: senza l'ID di Google Analytics il banner non
# compare e l'informativa privacy descriverebbe un analytics che non c'e'.
if [ "${1:-}" = "--deploy" ] && grep -q "var GA_ID = '';" public/consent.js; then
  echo "ERRORE: GA_ID vuoto in public/consent.js. Metti l'ID G-... prima di pubblicare." >&2
  exit 1
fi

if [ ! -s dist/CNAME ]; then
  echo "ERRORE: dist/CNAME manca o e' vuoto: il dominio custom si romperebbe." >&2
  exit 1
fi

echo "dist/ pronta. CNAME: $(cat dist/CNAME)"
find dist -type f | sort | sed 's/^/  /'
