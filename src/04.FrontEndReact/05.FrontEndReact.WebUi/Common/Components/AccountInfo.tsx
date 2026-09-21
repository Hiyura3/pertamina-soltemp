import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, clearSession, SESSION_EVENT, type SessionUser } from "../Services/Session";
import { MainRouteFor } from "../../Modules/Main/Statics/RouteFor";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";
import { appConfigFrontEndOptions } from "@services/AppConfigFrontEnd/AppConfigFrontEndOptions";

export function AccountInfo({ collapsed = false }: { collapsed?: boolean }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<SessionUser | null>(getSession());
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setSession(getSession());
    window.addEventListener(SESSION_EVENT, sync);
    return () => window.removeEventListener(SESSION_EVENT, sync);
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (root.current && !root.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!session) return null;

  return (
    <div ref={root} className="relative">
      <button type="button" className={`flex h-10 w-full items-center rounded-lg text-sm hover:bg-sidebar-accent ${collapsed ? "justify-center px-1" : "gap-2 px-2"}`} onClick={() => setOpen((value) => !value)}>
        <img src={`${import.meta.env.BASE_URL}img/user.png`} alt="" className="h-7 w-7 rounded-full object-cover" />
        {collapsed ? null : <span className="min-w-0 truncate">{session.name}</span>}
      </button>
      {open ? (
        <div role="menu" className="absolute bottom-full left-0 z-50 mb-2 w-56 overflow-hidden rounded-lg border border-border bg-popover text-sm text-popover-foreground shadow-menu">
          <div className="border-b border-border px-3 py-2">
            <div className="font-medium">{session.name}</div>
            <div className="text-xs text-muted-foreground">{session.email}</div>
            <div className="mt-1 text-xs text-muted-foreground">{session.role}</div>
          </div>
          <Link className="block px-3 py-2 hover:bg-muted" to={MainRouteFor.MyProfile} onClick={() => setOpen(false)}>{CommonDisplayTextFor.MyProfile}</Link>
          <Link className="block px-3 py-2 hover:bg-muted" to={MainRouteFor.MySession} onClick={() => setOpen(false)}>{CommonDisplayTextFor.MySession}</Link>
          <button
            type="button"
            className="block w-full px-3 py-2 text-left text-red-700 hover:bg-red-50"
            onClick={() => {
              const isIdAMan = session.authenticationType === "IdAMan" && !session.sandboxBypass;
              clearSession();
              setOpen(false);
              if (isIdAMan) {
                window.location.assign(`${appConfigFrontEndOptions.authenticationBaseUrl}/Authentication/Internal/Logout`);
                return;
              }
              navigate(MainRouteFor.Landing);
            }}
          >
            {CommonDisplayTextFor.Logout}
          </button>
        </div>
      ) : null}
    </div>
  );
}
