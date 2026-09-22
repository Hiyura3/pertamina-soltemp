import { PageShell } from "../../../Common/Components/PageShell";

// Skala teks Pacer: Heading/XL–4XS (Poppins) dan Body/6XL–2XS (Inter).
const headings = [
  ["Heading Extra Large", "60/72", "text-[60px] leading-[72px]"],
  ["Heading Large", "48/60", "text-[48px] leading-[60px]"],
  ["H1 / Heading Medium", "36/44", "text-[36px] leading-[44px]"],
  ["H2 / Heading Small", "30/38", "text-[30px] leading-[38px]"],
  ["H3 / Heading Extra Small", "24/32", "text-[24px] leading-[32px]"],
  ["H4 / Heading 2X Small", "20/28", "text-[20px] leading-[28px]"],
  ["H5 / Heading 3X Small", "16/24", "text-[16px] leading-[24px]"],
  ["H6 / Heading 4X Small", "14/20", "text-[14px] leading-[20px]"],
];

const bodies = [
  ["Body 2X Large", "24/32", "text-[24px] leading-[32px]"],
  ["Body Extra Large", "20/30", "text-[20px] leading-[30px]"],
  ["Body Large", "18/28", "text-[18px] leading-[28px]"],
  ["Body Medium", "16/24", "text-[16px] leading-[24px]"],
  ["Body Small", "14/20", "text-[14px] leading-[20px]"],
  ["Body Extra Small", "12/18", "text-[12px] leading-[18px]"],
];

export function Typography() {
  return (
    <PageShell title="Typography" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Typography" }]}>
      <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <p className="text-[14px] leading-[20px] text-muted-foreground">
          Poppins untuk heading, Inter untuk body, JetBrains Mono untuk kode. Ukuran dan line height sama dengan skala
          Pacer.
        </p>
        <code className="block rounded-md bg-muted px-3 py-2 font-mono text-[13px] leading-5">
          font-heading / font-sans / font-mono
        </code>
      </div>

      <div className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-heading text-[24px] font-semibold leading-8">Heading</h2>
        {headings.map(([name, scale, className]) => (
          <div key={name} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2 last:border-b-0">
            <span className={`font-heading font-semibold ${className}`}>{name}</span>
            <span className="font-mono text-[12px] text-muted-foreground">{scale} · Poppins Semibold 600</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="font-heading text-[24px] font-semibold leading-8">Body</h2>
        {bodies.map(([name, scale, className]) => (
          <div key={name} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2 last:border-b-0">
            <span className={className}>{name}</span>
            <span className="font-mono text-[12px] text-muted-foreground">{scale} · Inter Regular 400</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
