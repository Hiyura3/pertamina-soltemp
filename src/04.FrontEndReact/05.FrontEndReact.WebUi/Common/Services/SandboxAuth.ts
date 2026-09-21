import { addBackEndApiService } from "@infrastructure/BackEndApi/ConfigureBackEndApi";
import { Permissions } from "./Permissions";
import { setSession, type SessionUser } from "./Session";

const SANDBOX_HOST_SUFFIX = ".fural.space";

export function isSandboxAuthBypassEnabled(): boolean {
  if (import.meta.env.VITE_SANDBOX_AUTH_BYPASS === "true") return true;
  if (typeof window === "undefined") return false;
  const host = window.location.hostname.toLowerCase();
  return host === "fural.space" || host.endsWith(SANDBOX_HOST_SUFFIX);
}

export function shouldUseMockApi(): boolean {
  if (import.meta.env.VITE_USE_MOCK_API === "true") return true;
  return isSandboxAuthBypassEnabled();
}

const allPermissions = Object.values(Permissions);

export function applySandboxBypassSession(): SessionUser {
  addBackEndApiService(undefined, true);
  const session: SessionUser = {
    authenticated: true,
    authenticationType: "IdAMan",
    name: "Administrator",
    email: "admin@soltemp.local",
    role: "Administrator",
    permissions: [...allPermissions],
    sandboxBypass: true,
  };
  setSession(session);
  return session;
}
