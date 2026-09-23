#!/usr/bin/env bash
# Pack artefak rilis Solution Template 2 (Pacer):
#   1. ZIP unduhan  -> pack-output/SolutionTemplate2-Pacer-<YYYYMMDD>.zip
#   2. Paket template (nupkg) untuk `dotnet new install` / New Project Visual Studio
#
# Keduanya dibuat dari satu direktori staging yang sudah dibersihkan dari artefak build
# (bin, obj, node_modules, dist) dan dari perkakas packing, sehingga isi ZIP dan nupkg
# konsisten dengan working tree saat script dijalankan.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/pack-output"
STAMP="$(date +%Y%m%d)"
PACKAGE_ID="Pertamina.Templates.SolutionTemplate2.Pacer"
ZIP="$OUT/SolutionTemplate2-Pacer-$STAMP.zip"

mkdir -p "$OUT"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

tar -C "$ROOT" -cf - \
  --exclude='./.git' \
  --exclude='./pack-output' \
  --exclude='./packaging' \
  --exclude='*/bin' \
  --exclude='*/obj' \
  --exclude='*/node_modules' \
  --exclude='*/dist' \
  --exclude='*.nupkg' \
  --exclude='*.zip' \
  . | tar -C "$STAGE" -xf -

# ZIP: pakai `zip` bila ada, kalau tidak fallback ke modul zipfile Python.
if command -v zip >/dev/null 2>&1; then
  ( cd "$STAGE" && zip -qr "$ZIP" . )
else
  python3 - "$STAGE" "$ZIP" <<'PY'
import os, sys, zipfile

stage, dest = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as z:
    for folder, _dirs, files in os.walk(stage):
        for name in files:
            full = os.path.join(folder, name)
            z.write(full, os.path.relpath(full, stage))
PY
fi
echo "Wrote $ZIP"

cp "$ROOT/packaging/$PACKAGE_ID.csproj" "$STAGE/$PACKAGE_ID.csproj"
dotnet pack "$STAGE/$PACKAGE_ID.csproj" -c Release -p:PackageOutputPath="$OUT" -v minimal
