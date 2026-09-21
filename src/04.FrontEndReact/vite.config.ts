import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "05.FrontEndReact.WebUi");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, here, "");
  const backendTarget = env.VITE_BACKEND_PROXY_TARGET || "https://localhost:44321";
  const configuredPathBase = env.VITE_BACKEND_PROXY_PATH_BASE;
  const changeOrigin = env.VITE_BACKEND_PROXY_CHANGE_ORIGIN === "true";
  const backendPathBase = configuredPathBase === undefined
    ? "/solutiontemplate2_api"
    : configuredPathBase.replace(/\/$/, "");
  const withBackendPathBase = (requestPath: string) =>
    `${backendPathBase}${requestPath.replace(/^\/solutiontemplate2_api/, "")}`;
  const useHttpPreview = env.VITE_PREVIEW_HTTP === "true" || process.env.VITE_PREVIEW_HTTP === "true";
  const proxy = {
    "/solutiontemplate2_api": {
      target: backendTarget,
      changeOrigin,
      xfwd: true,
      secure: false,
      rewrite: withBackendPathBase,
    },
    "/Authentication/Internal": {
      target: backendTarget,
      changeOrigin,
      xfwd: true,
      secure: false,
      rewrite: (requestPath: string) => `${backendPathBase}${requestPath}`,
    },
  };

  return {
    base: "/soltem2/",
    root,
    envDir: here,
    publicDir: path.resolve(root, "wwwroot"),
    plugins: [...(useHttpPreview ? [] : [basicSsl()]), react(), tailwindcss()],
    resolve: {
      alias: {
        "@services": path.resolve(here, "02.FrontEndReact.Services"),
        "@infrastructure": path.resolve(here, "03.FrontEndReact.Infrastructure"),
        "@logics": path.resolve(here, "04.FrontEndReact.Logics"),
        "@webui": root,
      },
    },
    build: {
      outDir: path.resolve(here, "dist"),
      emptyOutDir: true,
    },
    server: {
      host: "0.0.0.0",
      port: 44323,
      https: true,
      allowedHosts: true,
      proxy,
    },
    preview: {
      host: "0.0.0.0",
      port: Number(process.env.PORT || 44323),
      https: useHttpPreview ? false : true,
      allowedHosts: true,
      proxy,
    },
  };
});
