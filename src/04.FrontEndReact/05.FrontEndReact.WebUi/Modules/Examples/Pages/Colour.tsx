import { PageShell } from "../../../Common/Components/PageShell";

const swatches = [
  ["primary", "bg-primary text-primary-foreground"],
  ["secondary", "bg-secondary text-secondary-foreground"],
  ["muted", "bg-muted text-muted-foreground"],
  ["destructive", "bg-destructive text-destructive-foreground"],
  ["pertamina-blue", "bg-pertamina-blue text-white"],
  ["pertamina-red", "bg-pertamina-red text-white"],
  ["pertamina-green", "bg-pertamina-green text-white"],
];

export function Colour() {
  return (
    <PageShell title="Colour" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Colour" }]}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {swatches.map(([name, className]) => (
          <div key={name} className={`rounded-xl p-5 shadow-sm ${className}`}>
            <div className="font-heading text-sm font-semibold">{name}</div>
            <div className="mt-1 text-xs opacity-80">Pacer token</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
