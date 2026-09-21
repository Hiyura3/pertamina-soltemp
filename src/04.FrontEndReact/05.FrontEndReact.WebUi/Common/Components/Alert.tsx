import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Alert({
  severity = "info",
  children,
}: {
  severity?: "success" | "info" | "warning" | "error";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md border px-3 py-2 text-sm",
        severity === "success" && "border-emerald-200 bg-emerald-50 text-emerald-800",
        severity === "info" && "border-sky-200 bg-sky-50 text-sky-800",
        severity === "warning" && "border-amber-200 bg-amber-50 text-amber-800",
        severity === "error" && "border-red-200 bg-red-50 text-red-800",
      )}
    >
      {children}
    </div>
  );
}
