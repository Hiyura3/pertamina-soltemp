#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UI="$(python3 -c 'import json,pathlib; print(json.loads(pathlib.Path("'"$ROOT"'/frontend.settings.json").read_text()).get("ui","react"))')"
echo "Starting SolutionTemplate2 with ui=$UI"
(cd "$ROOT/src/02.BackEnd/05.BackEnd.WebApi" && dotnet run --urls=https://localhost:44321) &
API_PID=$!
if [ "$UI" = "blazor" ]; then
  (cd "$ROOT/src/03.FrontEnd/05.FrontEnd.WebUi" && dotnet run --urls=https://localhost:44322) &
  UI_PID=$!
else
  (cd "$ROOT/src/04.FrontEndReact" && npm run dev) &
  UI_PID=$!
fi
trap 'kill $API_PID $UI_PID 2>/dev/null || true' EXIT INT TERM
wait
