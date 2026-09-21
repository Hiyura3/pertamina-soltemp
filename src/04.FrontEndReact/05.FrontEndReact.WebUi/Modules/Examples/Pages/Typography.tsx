import { PageShell } from "../../../Common/Components/PageShell";
export function Typography() {
  return (
    <PageShell title="Typography" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Typography" }]}>
      <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h1 className="font-heading text-4xl font-semibold">Poppins heading 4xl</h1>
        <h2 className="font-heading text-2xl font-semibold">Heading 2xl</h2>
        <p className="font-sans text-base leading-7 text-foreground">Inter body. Template Soltemp memakai token Pacer untuk heading dan body.</p>
        <p className="text-sm text-muted-foreground">Muted helper text, 14px.</p>
        <code className="block rounded-md bg-muted px-3 py-2 font-mono text-xs">font-heading / font-sans / font-mono</code>
      </div>
    </PageShell>
  );
}
