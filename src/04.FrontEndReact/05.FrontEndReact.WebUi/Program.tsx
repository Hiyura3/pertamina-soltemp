import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { addBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";
import { ToastProvider } from "./Common/Services/Toast";
import { App } from "./App";
import "./index.css";

addBackEndApiService(undefined, import.meta.env.VITE_USE_MOCK_API === "true");
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
