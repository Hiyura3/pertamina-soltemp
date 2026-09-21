import type { ReactNode } from "react";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";
import { cn } from "../../lib/utils";

export function Sheet({
  open,
  title,
  onClose,
  children,
  footer,
  width = "md",
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  width?: "md" | "lg";
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/40">
      <button type="button" className="flex-1" aria-label="Close" onClick={onClose} />
      <aside
        className={cn(
          "flex h-full w-full flex-col bg-card shadow-xl",
          width === "lg" ? "max-w-[676px]" : "max-w-[484px]",
        )}
      >
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="font-heading text-sm font-semibold">{title}</h2>
          <button type="button" className="text-sm text-muted-foreground hover:text-foreground" onClick={onClose}>
            {CommonDisplayTextFor.Close}
          </button>
        </header>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
        {footer ? <footer className="flex justify-end gap-2 border-t border-border px-4 py-3">{footer}</footer> : null}
      </aside>
    </div>
  );
}
