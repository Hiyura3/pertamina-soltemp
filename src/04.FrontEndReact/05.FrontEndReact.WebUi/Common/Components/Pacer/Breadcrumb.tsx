import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { cn } from "../../../lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  state?: unknown;
};

/** Pacer system/breadcrumb — Interactive default. SPA links use react-router. */
export function Breadcrumb({
  items,
  fill,
  className,
}: {
  items: BreadcrumbItem[];
  fill?: boolean;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          "flex max-w-full flex-wrap items-center gap-1 text-[13px] font-medium",
          fill && "rounded-md bg-zinc-100 px-3 py-1 dark:bg-zinc-800",
        )}
      >
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <Icon name="chevron-right" size={16} className="text-zinc-400 dark:text-zinc-500" />
              ) : null}
              {current || !item.href ? (
                <span
                  aria-current={current ? "page" : undefined}
                  title={item.label}
                  className="line-clamp-1 max-w-[200px] text-[13px] font-medium leading-5 text-zinc-900 dark:text-zinc-100"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  state={item.state}
                  title={item.label}
                  className="line-clamp-1 max-w-[200px] text-[13px] font-medium leading-5 text-zinc-500 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
