#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/pack-output"
mkdir -p "$OUT"
STAMP="$(date +%Y%m%d)"
ZIP="$OUT/SolutionTemplate2-Pacer-$STAMP.zip"
(
  cd "$ROOT"
  zip -r "$ZIP" . \
    -x '.git/*' \
    -x '*/.git/*' \
    -x '*/bin/*' \
    -x '*/obj/*' \
    -x '*/node_modules/*' \
    -x '*/dist/*' \
    -x 'pack-output/*' \
    -x '*.nupkg'
)
echo "Wrote $ZIP"
