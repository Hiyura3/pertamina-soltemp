#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/src/04.FrontEndReact"
if [ ! -d node_modules ]; then
  npm ci
fi
npm run build
export VITE_PREVIEW_HTTP=true
export PORT="${PORT:-3004}"
exec npx vite preview --host 0.0.0.0 --port "$PORT"
