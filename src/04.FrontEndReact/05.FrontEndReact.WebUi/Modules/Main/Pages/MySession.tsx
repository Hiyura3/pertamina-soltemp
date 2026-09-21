import { PageShell } from "../../../Common/Components/PageShell";
import { getSession } from "../../../Common/Services/Session";

export function MySession() {
  const session = getSession();
  return (
    <PageShell title="My Session" breadcrumbs={[{ label: "Home", href: "/" }, { label: "My Session" }]}>
      <pre className="overflow-auto rounded-xl border border-border bg-card p-4 text-xs">{JSON.stringify(session, null, 2)}</pre>
    </PageShell>
  );
}
