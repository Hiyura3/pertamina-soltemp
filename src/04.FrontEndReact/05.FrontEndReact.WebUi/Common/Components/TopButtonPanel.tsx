import type { ReactNode } from "react";

export function TopButtonPanel({ children }: { children: ReactNode }) {
  return <div className="flex justify-end gap-2">{children}</div>;
}
