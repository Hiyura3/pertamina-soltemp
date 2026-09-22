import { cn } from "../../../lib/utils";

/** Pacer icon sets shipped in wwwroot/icons (same SVGs as pacer-docs). */
export const ICON_SETS = ["outline", "generic"] as const;
export type IconSet = (typeof ICON_SETS)[number];

const DEFAULT_SIZE: Record<IconSet, number> = {
  outline: 20,
  generic: 20,
};

/** Ikon dokumen berwarna merek — dirender sebagai <img>, bukan mask currentColor. */
const PAINTED_ICONS = new Set(["pdf-file", "doc-file", "excel-file"]);

export function Icon({
  name,
  set = "outline",
  size,
  alt = "",
  className,
  ...props
}: Omit<React.ComponentProps<"img">, "src" | "width" | "height" | "name"> & {
  name: string;
  set?: IconSet;
  size?: number;
}) {
  const px = size ?? DEFAULT_SIZE[set];
  const src = `${import.meta.env.BASE_URL}icons/${set}/${name}.svg`;

  if (PAINTED_ICONS.has(name)) {
    return (
      <img
        data-slot="icon"
        src={src}
        alt={alt}
        width={px}
        height={px}
        className={cn("shrink-0", className)}
        {...props}
      />
    );
  }

  return (
    <span
      data-slot="icon"
      aria-hidden={alt ? undefined : true}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        width: px,
        height: px,
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
