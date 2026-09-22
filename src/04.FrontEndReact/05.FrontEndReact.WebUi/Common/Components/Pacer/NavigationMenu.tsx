import { isValidElement, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { cn } from "../../../lib/utils";

export type NavigationMenuSize = "small" | "medium" | "large";
export type NavigationMenuType = "main" | "sub" | "icon-only";
export type NavigationMenuSurface = "filled" | "ghost";
export type NavigationMenuActiveStyle = "color" | "muted";
export type NavigationIcon = ReactNode | string;

const HEIGHT: Record<NavigationMenuSize, string> = {
  small: "h-8 gap-1.5 px-2 text-[12px] leading-4",
  medium: "h-9 gap-2 px-2.5 text-[13px] leading-5",
  large: "h-11 gap-2.5 px-3 text-[15px] leading-6",
};

const ICON_ONLY: Record<NavigationMenuSize, string> = {
  small: "size-8 p-0",
  medium: "size-9 p-0",
  large: "size-11 p-0",
};

const ICON_PX: Record<NavigationMenuSize, number> = {
  small: 16,
  medium: 18,
  large: 20,
};

const BADGE: Record<NavigationMenuSize, string> = {
  small: "size-4 text-[9px]",
  medium: "size-[18px] text-[10px]",
  large: "size-5 text-[11px]",
};

export function renderNavigationIcon(icon: NavigationIcon | undefined, size: number): ReactNode {
  if (icon == null || icon === false) return null;
  if (typeof icon === "string") {
    return <Icon name={icon} size={size} />;
  }
  if (isValidElement(icon)) return icon;
  return icon;
}

export function NavigationMenuBadge({
  children,
  size = "medium",
  disabled,
  className,
}: {
  children: ReactNode;
  size?: NavigationMenuSize;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white tabular-nums",
        BADGE[size],
        disabled ? "bg-[#93C5FD]" : "bg-primary",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function NavigationMenuItem({
  size = "medium",
  type = "main",
  surface = "ghost",
  activeStyle = "muted",
  icon,
  label,
  badge,
  href,
  active,
  disabled,
  expanded,
  hasChildren,
  fullWidth,
  className,
  onClick,
}: {
  size?: NavigationMenuSize;
  type?: NavigationMenuType;
  surface?: NavigationMenuSurface;
  activeStyle?: NavigationMenuActiveStyle;
  icon?: NavigationIcon;
  label?: ReactNode;
  badge?: ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: (event: ReactMouseEvent<HTMLElement>) => void;
}) {
  const isIconOnly = type === "icon-only";
  const isSub = type === "sub";
  const isDisabled = Boolean(disabled);
  const isActive = Boolean(active);
  const iconPx = ICON_PX[size];
  const showLabel = !isIconOnly && label != null && label !== false;
  const showBadge = !isIconOnly && badge != null && badge !== false;
  const showChevron = Boolean(hasChildren) && !isIconOnly;
  const resolvedActive = isActive && !isDisabled;
  const hoverable = !isDisabled;

  // Same rules as pacer-docs Interactive: src/components/system/navigation-menu.tsx
  // The color treatment is used by the sidebar to make the current page clear.
  const tone = isDisabled
    ? "text-zinc-300"
    : resolvedActive && activeStyle === "color"
      ? "text-[#006CB8]"
      : "text-zinc-800";

  const fill = (() => {
    if (isDisabled) return surface === "ghost" ? "bg-transparent" : "bg-zinc-50";
    if (resolvedActive && activeStyle === "muted") return "bg-zinc-100";
    if (resolvedActive && activeStyle === "color") return "bg-sidebar-accent";
    if (surface === "ghost") return "bg-transparent";
    if (isSub) return "bg-white";
    return "bg-zinc-100";
  })();

  const classNames = cn(
    "inline-flex min-w-0 items-center rounded-lg font-sans font-medium outline-none transition-colors",
    isIconOnly ? ICON_ONLY[size] : HEIGHT[size],
    isIconOnly && "justify-center",
    isSub && !isIconOnly && "pl-8",
    fullWidth && "w-full",
    fill,
    tone,
    isDisabled && "pointer-events-none cursor-not-allowed",
    hoverable && !resolvedActive && surface === "filled" && "hover:bg-white hover:text-[#006CB8]",
    hoverable && !resolvedActive && surface === "ghost" && "hover:bg-zinc-100 hover:text-[#006CB8]",
    hoverable && "focus-visible:ring-2 focus-visible:ring-[#006CB8]/30",
    className,
  );

  const inner = (
    <>
      {icon ? (
        <span className="inline-flex shrink-0 text-current">{renderNavigationIcon(icon, iconPx)}</span>
      ) : null}
      {showLabel ? <span className="min-w-0 flex-1 truncate text-left">{label}</span> : null}
      {showBadge ? (
        typeof badge === "number" || typeof badge === "string" ? (
          <NavigationMenuBadge size={size} disabled={isDisabled}>
            {badge}
          </NavigationMenuBadge>
        ) : (
          badge
        )
      ) : null}
      {showChevron ? (
        <Icon
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          className={cn("shrink-0", isDisabled ? "text-zinc-300" : "text-zinc-400")}
        />
      ) : null}
    </>
  );

  const shared = {
    className: classNames,
    "data-active-style": activeStyle,
    "aria-disabled": isDisabled || undefined,
    "aria-current": resolvedActive && !hasChildren ? ("page" as const) : undefined,
    "aria-expanded": hasChildren ? Boolean(expanded) : undefined,
    title: isIconOnly && typeof label === "string" ? label : undefined,
    onClick: (event: ReactMouseEvent<HTMLElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
  };

  if (href && !hasChildren && !isDisabled) {
    return (
      <Link to={href} {...shared}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" disabled={isDisabled} {...shared}>
      {inner}
    </button>
  );
}

export function NavigationMenu({ children, className }: { children: ReactNode; className?: string }) {
  return <nav className={cn("flex flex-col gap-0.5", className)}>{children}</nav>;
}
