import { PageShell } from "../../../Common/Components/PageShell";
import { appConfigFrontEndOptions } from "@services/AppConfigFrontEnd/AppConfigFrontEndOptions";

export function About() {
  return (
    <PageShell title="About" breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}>
      <div className="max-w-2xl space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h1 className="font-heading text-xl font-semibold text-primary">{appConfigFrontEndOptions.appFullName}</h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Solution template Pertamina: Shared, BackEnd, Blazor, dan React ber-skin Pacer.
          Frontend React ini meniru struktur folder <code>03.FrontEnd</code>.
        </p>
      </div>
    </PageShell>
  );
}
