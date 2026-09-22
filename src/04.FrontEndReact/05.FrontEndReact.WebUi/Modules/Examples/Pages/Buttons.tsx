import { PageShell } from "../../../Common/Components/PageShell";
import { Button, type ButtonSize, type ButtonVariant } from "../../../Common/Components/Button";
import { Icon } from "../../../Common/Components/Pacer/Icon";

const variants: { variant: ButtonVariant; label: string }[] = [
  { variant: "primary", label: "Primary" },
  { variant: "secondary", label: "Secondary" },
  { variant: "secondary-colour", label: "Secondary colour" },
  { variant: "tertiary", label: "Tertiary" },
  { variant: "tertiary-colour", label: "Tertiary colour" },
  { variant: "danger", label: "Danger primary" },
  { variant: "danger-secondary", label: "Danger secondary" },
  { variant: "danger-tertiary", label: "Danger tertiary" },
  { variant: "success", label: "Success" },
];

const sizes: ButtonSize[] = ["small", "medium", "large"];

export function Buttons() {
  return (
    <PageShell title="Buttons" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Buttons" }]}>
      <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Varian dan face disabled mengikuti pacer-ui-docs (system/button.tsx), termasuk warna disabled per varian.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {variants.map(({ variant, label }) => (
            <div key={variant} className="space-y-2">
              <span className="block font-mono text-[12px] leading-4 text-muted-foreground">{variant}</span>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant={variant}>{label}</Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <p className="text-sm text-muted-foreground">Ukuran Pacer: small 32px, medium 40px, large 44px, dengan ikon terkemuka.</p>
        <div className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} variant="primary" size={size}>
              <Icon name="download" size={size === "small" ? 16 : 20} />
              {size}
            </Button>
          ))}
          <Button variant="secondary" size="medium">
            <Icon name="arrow-back" size={16} />
            Previous
          </Button>
          <Button variant="secondary" size="medium">
            Next
            <Icon name="arrow-forward" size={16} />
          </Button>
          <Button variant="danger" size="medium">
            <Icon name="trash" size={16} />
            Delete
          </Button>
          <Button variant="danger-tertiary" size="medium">
            <Icon name="cross" size={16} />
            Cancel
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
