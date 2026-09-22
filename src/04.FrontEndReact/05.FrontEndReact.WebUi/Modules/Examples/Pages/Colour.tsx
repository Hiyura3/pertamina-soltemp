import { PageShell } from "../../../Common/Components/PageShell";

// Nilai hex diambil dari pacer-tokens.css (salinan @pacer-ui/tokens@1.0.1).
// Primitive dipakai lewat bg-[var(--color-<nama>)] karena Pacer mendefinisikan
// palet di :root, bukan sebagai utility Tailwind.
const scales: { family: string; steps: Record<string, string> }[] = [
  {
    family: "brand",
    steps: {
      "50": "#E6F0FE", "100": "#D9E9FE", "200": "#B0D1FD", "300": "#016BF8", "400": "#0160DF",
      "500": "#0156C6", "600": "#0150BA", "700": "#014095", "800": "#003070", "900": "#002557",
    },
  },
  {
    family: "slate",
    steps: {
      "50": "#F8FAFC", "100": "#F1F5F9", "200": "#E2E8F0", "300": "#CBD5E1", "400": "#94A3B8",
      "500": "#64748B", "600": "#475569", "700": "#334155", "800": "#1E293B", "900": "#0F172A",
      "950": "#020617",
    },
  },
  {
    family: "info",
    steps: {
      "50": "#EFF6FF", "100": "#DBEAFE", "200": "#BFDBFE", "300": "#93C5FD", "400": "#60A5FA",
      "500": "#3B82F6", "600": "#2563EB", "700": "#1D4ED8", "800": "#1E40AF", "900": "#1E3A8A",
    },
  },
  {
    family: "success",
    steps: {
      "50": "#F0FDF4", "100": "#DCFCE7", "200": "#BBF7D0", "300": "#86EFAC", "400": "#4ADE80",
      "500": "#22C55E", "600": "#16A34A", "700": "#15803D", "800": "#166534", "900": "#14532D",
    },
  },
  {
    family: "warning",
    steps: {
      "50": "#FEFCE8", "100": "#FEF9C3", "200": "#FEF08A", "300": "#FDE047", "400": "#FACC15",
      "500": "#EAB308", "600": "#CA8A04", "700": "#A16207", "800": "#854D0E", "900": "#713F12",
    },
  },
  {
    family: "error",
    steps: {
      "50": "#FEF2F2", "100": "#FEE2E2", "200": "#FECACA", "300": "#FCA5A5", "400": "#F87171",
      "500": "#EF4444", "600": "#DC2626", "700": "#B91C1C", "800": "#991B1B", "900": "#7F1D1D",
    },
  },
];

const semantic = [
  ["background", "bg-background", "Isi halaman"],
  ["foreground", "bg-foreground", "Teks utama"],
  ["primary", "bg-primary", "Aksi utama, Pertamina Blue"],
  ["secondary", "bg-secondary", "Aksi kedua"],
  ["muted", "bg-muted", "Latar bantu"],
  ["accent", "bg-accent", "Latar terpilih"],
  ["destructive", "bg-destructive", "Aksi berbahaya"],
  ["border", "bg-border", "Garis dan pemisah"],
  ["sidebar", "bg-sidebar", "Latar sidebar"],
];

const pertamina = [
  ["pertamina-blue", "#006CB8"],
  ["pertamina-red", "#ED1B2F"],
  ["pertamina-green", "#ACC42A"],
];

export function Colour() {
  return (
    <PageShell title="Colour" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Colour" }]}>
      <div className="space-y-4">
        <p className="text-[14px] leading-5 text-muted-foreground">
          Palet Pacer lengkap: brand, slate, info, success, warning, error, plus token semantik dan warna Pertamina.
        </p>

        {scales.map(({ family, steps }) => (
          <div key={family} className="space-y-2 rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="font-heading text-[18px] font-semibold leading-7">{family}</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {Object.entries(steps).map(([step, hex]) => (
                <div key={step} className="overflow-hidden rounded-lg border border-border">
                  <div className="h-14" style={{ background: hex }} />
                  <div className="px-2 py-1">
                    <div className="font-mono text-[12px] leading-4">
                      {family}-{step}
                    </div>
                    <div className="font-mono text-[11px] leading-4 text-muted-foreground">{hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-2 rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-[18px] font-semibold leading-7">Semantic</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {semantic.map(([name, className, use]) => (
              <div key={name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <span className={`size-8 shrink-0 rounded-md border border-border ${className}`} />
                <span className="min-w-0">
                  <span className="block font-mono text-[12px] leading-4">{name}</span>
                  <span className="block text-[12px] leading-4 text-muted-foreground">{use}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 rounded-xl border border-border bg-card p-5 shadow-sm">
          <h2 className="font-heading text-[18px] font-semibold leading-7">Pertamina</h2>
          <div className="grid gap-2 sm:grid-cols-3">
            {pertamina.map(([name, hex]) => (
              <div key={name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <span className="size-8 shrink-0 rounded-md border border-border" style={{ background: hex }} />
                <span className="min-w-0">
                  <span className="block font-mono text-[12px] leading-4">{name}</span>
                  <span className="block font-mono text-[11px] leading-4 text-muted-foreground">{hex}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
