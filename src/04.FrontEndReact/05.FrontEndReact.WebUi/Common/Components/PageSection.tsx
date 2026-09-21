import type { ReactNode } from "react";

export function PageSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="space-y-3 rounded-lg border border-border bg-card p-4">
      {title ? <h2 className="font-heading text-lg font-semibold">{title}</h2> : null}
      {children}
    </section>
  );
}
