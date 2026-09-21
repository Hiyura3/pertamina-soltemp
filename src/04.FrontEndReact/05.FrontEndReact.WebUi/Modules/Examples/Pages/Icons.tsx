import { PageShell } from "../../../Common/Components/PageShell";
import { Icon } from "../../../Common/Components/Pacer/Icon";

const names = ["home", "globe", "setting", "document", "user", "folder", "info", "lock", "component", "list", "flag", "history"];

export function Icons() {
  return (
    <PageShell title="Icons" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Icons" }]}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {names.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-primary shadow-sm">
            <Icon name={name} size={22} />
            <span className="text-xs text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
