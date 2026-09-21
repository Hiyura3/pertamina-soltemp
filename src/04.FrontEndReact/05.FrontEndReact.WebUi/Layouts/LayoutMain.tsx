import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { appConfigFrontEndOptions } from "@services/AppConfigFrontEnd/AppConfigFrontEndOptions";
import { getSoltempSidebarItems } from "./Components/NavMenu";
import { AccountInfo } from "../Common/Components/AccountInfo";
import { Sidebar } from "../Common/Components/Pacer/Sidebar";
import { Icon } from "../Common/Components/Pacer/Icon";
import { PageHeaderOutletProvider } from "../Common/Components/PageHeaderOutlet";

const listPagePaths = new Set([
  "/MasterData/Countries",
  "/Administration/Configurations",
  "/Administration/Audits",
  "/Administration/ApiCalls",
]);

export function LayoutMain() {
  const sidebarItems = getSoltempSidebarItems();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const normalizedPath = location.pathname.replace(/\/$/, "") || "/";
  const isListPage = listPagePaths.has(normalizedPath);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [breadcrumbOutlet, setBreadcrumbOutlet] = useState<HTMLDivElement | null>(null);
  const [actionOutlet, setActionOutlet] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-svh bg-background">
      <div className="sticky top-0 hidden h-svh shrink-0 md:block">
        <Sidebar
          items={sidebarItems}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          showCollapse={false}
          activePath={location.pathname}
          footer={<AccountInfo collapsed={collapsed} />}
          header={
            <Link to="/" className={`flex items-center justify-center ${collapsed ? "h-16" : "h-24"}`}>
              <img
                src={`${import.meta.env.BASE_URL}img/logo-pertamina-colorful.svg`}
                alt={appConfigFrontEndOptions.appNickName}
                className={collapsed ? "hidden" : "block h-16 w-auto max-w-[12rem] object-contain"}
              />
              <img
                src={`${import.meta.env.BASE_URL}img/logo-pertamina-colorful-small.svg`}
                alt={appConfigFrontEndOptions.appNickName}
                className={collapsed ? "block h-9 w-9 object-contain" : "hidden"}
              />
            </Link>
          }
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className={`sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card/95 px-3 backdrop-blur md:px-4 ${isHomePage ? "md:hidden" : ""}`}>
          <button type="button" className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent md:hidden" aria-label="Open sidebar" onClick={() => setIsMobileSidebarOpen(true)}>
            <Icon name="hamburger-menu" size={16} />
          </button>
          <button type="button" className="hidden h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent md:inline-flex" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setCollapsed((value) => !value)}>
            <Icon name="panel-left" set="generic" />
          </button>
          <span className="mx-1 hidden h-4 w-px bg-border md:inline-block" aria-hidden />
          <div ref={setBreadcrumbOutlet} className="min-w-0 flex-1 overflow-hidden">
            <Link to="/" className="hidden truncate font-heading text-base font-semibold tracking-tight text-primary only:block">
              {appConfigFrontEndOptions.appNickName}
            </Link>
          </div>
          <div ref={setActionOutlet} className="flex shrink-0 items-center justify-end gap-2" />
        </header>
        <main className="min-w-0 flex-1 overflow-x-hidden">
          <PageHeaderOutletProvider value={{ breadcrumbs: breadcrumbOutlet, actions: actionOutlet }}>
            <div className={isListPage ? undefined : "p-4"}>
              <Outlet />
            </div>
          </PageHeaderOutletProvider>
        </main>
        {isMobileSidebarOpen ? (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 md:hidden">
            <button type="button" aria-label="Close sidebar" className="absolute inset-0 h-full w-full bg-black/50" onClick={() => setIsMobileSidebarOpen(false)} />
            <Sidebar
              items={sidebarItems}
              activePath={location.pathname}
              showCollapse={false}
              onNavigate={() => setIsMobileSidebarOpen(false)}
              footer={<AccountInfo collapsed={false} />}
              header={
                <Link to="/" className="flex h-24 items-center justify-center">
                  <img src={`${import.meta.env.BASE_URL}img/logo-pertamina-colorful.svg`} alt={appConfigFrontEndOptions.appNickName} className="block h-16 w-auto max-w-[12rem] object-contain" />
                </Link>
              }
              className="absolute inset-y-0 left-0 shadow-xl"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
