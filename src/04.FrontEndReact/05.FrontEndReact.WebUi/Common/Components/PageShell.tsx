import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { ErrorViewer } from "./ErrorViewer";
import { LoadingOverlay } from "./LoadingOverlay";
import { usePageHeaderOutlet } from "./PageHeaderOutlet";

type PageShellProps = {
  title: string;
  className?: string;
  entityType?: string;
  breadcrumbs?: BreadcrumbItem[];
  exception?: Error | null;
  loading?: boolean;
  actions?: ReactNode;
  children: ReactNode;
};

export function PageShell({ className, breadcrumbs, exception, loading, actions, children }: PageShellProps) {
  const headerOutlet = usePageHeaderOutlet();

  return (
    <div className={["space-y-4", className].filter(Boolean).join(" ")}>
      <LoadingOverlay isVisible={Boolean(loading)} />
      {breadcrumbs && headerOutlet.breadcrumbs
        ? createPortal(<Breadcrumbs items={breadcrumbs} className="min-w-0" />, headerOutlet.breadcrumbs)
        : null}
      {actions && headerOutlet.actions ? createPortal(actions, headerOutlet.actions) : null}
      <ErrorViewer exception={exception ?? null} />
      {children}
    </div>
  );
}
