const KEY = "soltemp.session";
const EVENT = "soltemp-session";

export type SessionUser = {
  authenticated: boolean;
  authenticationType: "IdAMan" | "External";
  name: string;
  email: string;
  role: "Administrator";
  permissions: string[];
};

export function getSession(): SessionUser | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function setSession(session: SessionUser) {
  localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(EVENT));
}

export function hasPermission(permission: string): boolean {
  return getSession()?.permissions?.includes(permission) ?? false;
}

export function clearSession() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export const SESSION_EVENT = EVENT;
