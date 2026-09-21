import { cn } from "../../../lib/utils";

/** Pacer outline/generic icons served from wwwroot/icons (same SVGs as pacer-docs). */
export function Icon({
  name,
  set = "outline",
  size = 18,
  className,
}: {
  name: string;
  set?: "outline" | "generic";
  size?: number;
  className?: string;
}) {
  const src = `${import.meta.env.BASE_URL}icons/${set}/${name}.svg`;
  return (
    <span
      data-slot="pacer-icon"
      aria-hidden
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        width: size,
        height: size,
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
