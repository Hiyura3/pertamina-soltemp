import { Outlet } from "react-router-dom";

export function LayoutLanding() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#e8f2fb_100%)]">
      <Outlet />
    </div>
  );
}
