import { Breadcrumb, type BreadcrumbItem } from "./Pacer/Breadcrumb";

export type { BreadcrumbItem };

export function Breadcrumbs({
  items,
  fill,
  className,
}: {
  items: BreadcrumbItem[];
  fill?: boolean;
  className?: string;
}) {
  return <Breadcrumb items={items} fill={fill} className={className} />;
}
