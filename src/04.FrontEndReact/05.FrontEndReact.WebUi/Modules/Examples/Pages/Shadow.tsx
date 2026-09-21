import { PageShell } from "../../../Common/Components/PageShell";
export function Shadow() {
  return (
    <PageShell title="Shadow" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Shadow" }]}>
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl bg-card p-6 shadow-sm">shadow-sm</div>
        <div className="rounded-xl bg-card p-6 shadow-md">shadow-md</div>
        <div className="rounded-xl bg-card p-6 shadow-lg">shadow-lg</div>
        <div className="rounded-xl bg-card p-6 shadow-card">shadow-card</div>
        <div className="rounded-xl bg-card p-6 shadow-button">shadow-button</div>
        <div className="rounded-xl bg-card p-6 shadow-menu">shadow-menu</div>
      </div>
    </PageShell>
  );
}
