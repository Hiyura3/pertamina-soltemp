import { PageShell } from "../../../../../Common/Components/PageShell";
import { getSession } from "../../../../../Common/Services/Session";

export function Index() {
  const session = getSession();
  return (
    <PageShell title="My Profile" breadcrumbs={[{ label: "Home", href: "/" }, { label: "My Profile" }]}>
      <div className="max-w-lg space-y-2 rounded-xl border border-border bg-card p-5 shadow-sm">
        <p className="font-heading text-lg font-semibold">{session?.name}</p>
        <p className="text-sm text-muted-foreground">{session?.email}</p>
        <p className="text-sm">{session?.role}</p>
      </div>
    </PageShell>
  );
}
