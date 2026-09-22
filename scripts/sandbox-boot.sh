#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/src/04.FrontEndReact"
if [ ! -d node_modules ]; then
  npm ci
fi
# Preview sandbox hanya untuk melihat tampilan template, jadi memakai data mock
# karena tidak ada WebApi yang berjalan.
VITE_USE_MOCK_API=true npm run build
export VITE_PREVIEW_HTTP=true
export PORT="${PORT:-3004}"
exec npx vite preview --host 0.0.0.0 --port "$PORT"
