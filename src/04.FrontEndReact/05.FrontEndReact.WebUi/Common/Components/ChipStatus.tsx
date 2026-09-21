import { cn } from "../../lib/utils";

const TONE: Record<string, string> = {
  draft: "bg-muted text-foreground",
  progress: "bg-[var(--color-info-100)] text-[var(--color-info-800)]",
  success: "bg-[var(--color-success-100)] text-[var(--color-success-800)]",
  error: "bg-[var(--color-error-100)] text-[var(--color-error-800)]",
  warning: "bg-[var(--color-warning-100)] text-[var(--color-warning-800)]",
};

export function ChipStatus({ value, statusCode, tone }: { value: string; statusCode: string; tone?: "error" }) {
  const toneClass = tone === "error" ? "bg-[var(--color-error-100)] text-[var(--color-error-800)]" : TONE[statusCode] ?? "bg-muted text-foreground";

  return (
    <span className={cn("inline-flex rounded-md px-2 py-0.5 text-xs font-medium", toneClass)}>
      {value}
    </span>
  );
}
