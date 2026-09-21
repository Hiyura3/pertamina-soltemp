import { useMemo, useState, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { Icon } from "./Icon";
import { NavigationMenu, NavigationMenuItem, type NavigationIcon, type NavigationMenuSize } from "./NavigationMenu";
import { cn } from "../../../lib/utils";

export type SidebarItem = {
  id?: string;
  icon?: NavigationIcon;
  label: string;
  href?: string;
  badge?: number | string;
  disabled?: boolean;
  children?: SidebarItem[];
};

export function sidebarItemId(item: SidebarItem): string {
  return item.id ?? item.href ?? item.label;
}

export function isSidebarPathActive(href: string | undefined, activePath: string | undefined) {
  if (!href || !activePath) return false;
  if (href === activePath) return true;
  return ["/Create", "/Details", "/Update", "/Stage"].some((suffix) => activePath.startsWith(`${href}${suffix}`));
}

export function sidebarItemIsActive(item: SidebarItem, activePath?: string): boolean {
  if (isSidebarPathActive(item.href, activePath)) return true;
  return (item.children ?? []).some((child) => sidebarItemIsActive(child, activePath));
}

function collectOpenIds(items: SidebarItem[], activePath?: string, acc: string[] = []): string[] {
  for (const item of items) {
    const children = item.children ?? [];
    if (children.length > 0 && children.some((child) => sidebarItemIsActive(child, activePath))) {
      acc.push(sidebarItemId(item));
      collectOpenIds(children, activePath, acc);
    }
  }
  return acc;
}

function SidebarNode({
  item,
  size,
  collapsed,
  activePath,
  openIds,
  onToggle,
  onNavigate,
  depth,
}: {
  item: SidebarItem;
  size: NavigationMenuSize;
  collapsed: boolean;
  activePath?: string;
  openIds: Set<string>;
  onToggle: (id: string) => void;
  onNavigate?: (item: SidebarItem) => void;
  depth: number;
}) {
  const id = sidebarItemId(item);
  const children = item.children ?? [];
  const hasChildren = children.length > 0;
  const open = !collapsed && hasChildren && openIds.has(id);
  const selfActive = isSidebarPathActive(item.href, activePath);
  const descendantActive = children.some((child) => sidebarItemIsActive(child, activePath));
  const rowActive = collapsed ? selfActive || descendantActive : hasChildren ? !open && descendantActive : selfActive;

  function handleClick(event: ReactMouseEvent<HTMLElement>) {
    if (hasChildren && !collapsed) {
      event.preventDefault();
      onToggle(id);
      return;
    }
    if (item.href && onNavigate) {
      event.preventDefault();
      onNavigate(item);
    }
  }

  return (
    <div className="flex flex-col gap-0.5">
      <NavigationMenuItem
        size={size}
        type={collapsed ? "icon-only" : depth > 0 ? "sub" : "main"}
        surface={rowActive ? "filled" : "ghost"}
        activeStyle="color"
        icon={item.icon}
        label={item.label}
        badge={item.badge}
        href={hasChildren && !collapsed ? undefined : item.href}
        active={rowActive}
        disabled={item.disabled}
        expanded={open}
        hasChildren={hasChildren && !collapsed}
        fullWidth
        onClick={handleClick}
      />
      {open
        ? children.map((child) => (
            <SidebarNode
              key={sidebarItemId(child)}
              item={child}
              size={size}
              collapsed={collapsed}
              activePath={activePath}
              openIds={openIds}
              onToggle={onToggle}
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))
        : null}
    </div>
  );
}

export function Sidebar({
  items,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapse,
  activePath,
  size = "medium",
  onNavigate,
  header,
  footer,
  className,
  collapseLabel = "Collapse",
  showCollapse = true,
}: {
  items: SidebarItem[];
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  activePath?: string;
  size?: NavigationMenuSize;
  onNavigate?: (item: SidebarItem) => void;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  collapseLabel?: string;
  showCollapse?: boolean;
}) {
  const controlled = collapsedProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultCollapsed);
  const collapsed = controlled ? Boolean(collapsedProp) : uncontrolled;
  const autoOpen = useMemo(() => collectOpenIds(items, activePath), [items, activePath]);
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const openIds = useMemo(() => {
    const next = new Set(autoOpen);
    for (const [id, open] of Object.entries(overrides)) {
      if (open) next.add(id);
      else next.delete(id);
    }
    return next;
  }, [autoOpen, overrides]);

  function setCollapsed(next: boolean) {
    if (!controlled) setUncontrolled(next);
    onCollapse?.(next);
  }

  function toggle(id: string) {
    setOverrides((prev) => {
      const currently = id in prev ? prev[id] : autoOpen.includes(id);
      return { ...prev, [id]: !currently };
    });
  }

  return (
    <aside
      data-slot="pacer-sidebar"
      data-collapsed={collapsed || undefined}
      className={cn(
        "relative z-40 flex h-full min-h-svh shrink-0 flex-col border-r border-sidebar-border bg-sidebar font-sans text-sidebar-foreground",
        "transition-[width] duration-200 ease-out",
        collapsed ? "w-14" : "w-56",
        className,
      )}
    >
      {header ? <div className="shrink-0">{header}</div> : null}
      <NavigationMenu className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {items.map((item) => (
          <SidebarNode
            key={sidebarItemId(item)}
            item={item}
            size={size}
            collapsed={collapsed}
            activePath={activePath}
            openIds={openIds}
            onToggle={toggle}
            onNavigate={onNavigate}
            depth={0}
          />
        ))}
      </NavigationMenu>
      {footer ? <div className="shrink-0 border-t border-sidebar-border p-2">{footer}</div> : null}
      {showCollapse ? (
        <div className="shrink-0 border-t border-sidebar-border px-2 py-2">
          <button
            type="button"
            aria-label={collapsed ? "Expand" : collapseLabel}
            aria-pressed={collapsed}
            className={cn(
              "inline-flex w-full items-center gap-2 rounded-lg font-sans text-[13px] font-medium text-zinc-700 transition-colors",
              "hover:bg-zinc-100 hover:text-[#006CB8]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
              collapsed ? "h-9 justify-center" : "h-9 px-2.5",
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon name={collapsed ? "arrow-forward" : "arrow-back"} size={16} />
            {collapsed ? null : <span>{collapseLabel}</span>}
          </button>
        </div>
      ) : null}
    </aside>
  );
}
