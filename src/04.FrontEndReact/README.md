# 04.FrontEndReact

React + Vite + Pacer, layer-nya 1:1 dengan `03.FrontEnd`.

| React | Blazor |
|---|---|
| `02.FrontEndReact.Services` | `02.FrontEnd.Services` |
| `03.FrontEndReact.Infrastructure` | `03.FrontEnd.Infrastructure` |
| `04.FrontEndReact.Logics` | `04.FrontEnd.Logics` |
| `05.FrontEndReact.WebUi` | `05.FrontEnd.WebUi` |

```bash
cd src/04.FrontEndReact
npm ci
npm run dev
```

Buka `https://localhost:44323/soltem2/`. Default development memakai mock API agar template langsung tampil Pacer; login tetap lewat IdAMan.
Set `VITE_USE_MOCK_API=false` jika backend Soltemp sudah jalan di `https://localhost:44321`.
