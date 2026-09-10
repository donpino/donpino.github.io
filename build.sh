#!/usr/bin/env bash
# Costruisce dist/ per il deploy su gh-pages.
# Il sito e' statico: "build" significa copiare public/ in dist/ e verificare
# che il CNAME ci sia, perche' senza il dominio custom si rompe.
set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
cp -R public dist
find dist -name '.DS_Store' -delete

if [ ! -s dist/CNAME ]; then
  echo "ERRORE: dist/CNAME manca o e' vuoto — il dominio custom si romperebbe." >&2
  exit 1
fi

echo "dist/ pronta. CNAME: $(cat dist/CNAME)"
find dist -type f | sort | sed 's/^/  /'
