import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { addBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";
import { ToastProvider } from "./Common/Services/Toast";
import { App } from "./App";
import { getSession } from "./Common/Services/Session";
import { shouldUseMockApi } from "./Common/Services/SandboxAuth";
import "./index.css";

addBackEndApiService(undefined, shouldUseMockApi() || Boolean(getSession()?.sandboxBypass));
const routerBaseName = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <BrowserRouter basename={routerBaseName}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
