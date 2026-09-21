import type { ReactNode } from "react";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function Dialog({
  open,
  title,
  onClose,
  children,
  footer,
  maxWidth = "md",
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: "sm" | "md" | "lg";
}) {
  if (!open) {
    return null;
  }

  const width = maxWidth === "sm" ? "max-w-sm" : maxWidth === "lg" ? "max-w-2xl" : "max-w-lg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={`flex max-h-[90vh] w-full ${width} flex-col rounded-lg bg-card shadow-xl`}>
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="font-heading text-sm font-semibold">{title}</h2>
          <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={onClose}>
            {CommonDisplayTextFor.Close}
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {footer ? <footer className="flex justify-end gap-2 border-t border-border px-4 py-3">{footer}</footer> : null}
      </div>
    </div>
  );
}
