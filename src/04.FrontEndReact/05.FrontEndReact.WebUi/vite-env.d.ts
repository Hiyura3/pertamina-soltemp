/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_API_BASE_URL?: string;
  readonly VITE_AUTHENTICATION_BASE_URL?: string;
  readonly VITE_BACKEND_PROXY_TARGET?: string;
  readonly VITE_BACKEND_PROXY_PATH_BASE?: string;
  readonly VITE_BACKEND_PROXY_CHANGE_ORIGIN?: string;
  readonly VITE_USE_MOCK_API?: string;
  readonly VITE_APP_VERSION?: string;
  readonly VITE_BUILD_DATE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
