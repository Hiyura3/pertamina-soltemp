import { PageShell } from "../../../Common/Components/PageShell";
import { Button } from "../../../Common/Components/Button";

export function Buttons() {
  return (
    <PageShell title="Buttons" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Buttons" }]}>
      <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Sampling tombol Pacer untuk template Soltemp.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="danger-outlined">Danger outlined</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="md">Medium primary</Button>
          <Button variant="outlined" size="md" disabled>Disabled</Button>
        </div>
      </div>
    </PageShell>
  );
}
