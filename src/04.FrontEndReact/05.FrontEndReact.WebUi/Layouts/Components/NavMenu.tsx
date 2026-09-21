import { MasterDataCountriesRouteFor } from "../../Modules/MasterData/Features/Countries/Statics/RouteFor";
import { MainRouteFor } from "../../Modules/Main/Statics/RouteFor";
import { AdministrationRouteFor } from "../../Modules/Administration/Statics/RouteFor";
import { ExamplesRouteFor } from "../../Modules/Examples/Statics/RouteFor";
import type { SidebarItem } from "../../Common/Components/Pacer/Sidebar";
import { hasPermission } from "../../Common/Services/Session";
import { Permissions } from "../../Common/Services/Permissions";

export function getSoltempSidebarItems(): SidebarItem[] {
  const items: Array<SidebarItem | null> = [
    { icon: "home", label: "Home", href: MainRouteFor.Index },
    hasPermission(Permissions.masterData)
      ? {
          icon: "globe",
          label: "Master Data",
          children: hasPermission(Permissions.countriesRead)
            ? [{ icon: "globe", label: "Countries", href: MasterDataCountriesRouteFor.Index }]
            : [],
        }
      : null,
    hasPermission(Permissions.administration)
      ? {
          icon: "setting",
          label: "Administration",
          children: [
            ...(hasPermission(Permissions.configurationsRead)
              ? [{ icon: "lock" as const, label: "Configurations", href: AdministrationRouteFor.Configurations }]
              : []),
            ...(hasPermission(Permissions.auditsRead)
              ? [{ icon: "document" as const, label: "Audits", href: AdministrationRouteFor.Audits }]
              : []),
            ...(hasPermission(Permissions.apiCallsRead)
              ? [{ icon: "component" as const, label: "API Calls", href: AdministrationRouteFor.ApiCalls }]
              : []),
          ],
        }
      : null,
    {
      icon: "component",
      label: "Examples",
      children: [
        { icon: "flag", label: "Buttons", href: ExamplesRouteFor.Buttons },
        { icon: "document", label: "Typography", href: ExamplesRouteFor.Typography },
        { icon: "component", label: "Colour", href: ExamplesRouteFor.Colour },
        { icon: "list", label: "Text fields", href: ExamplesRouteFor.TextFields },
        { icon: "info", label: "Icons", href: ExamplesRouteFor.Icons },
        { icon: "folder", label: "Shadow", href: ExamplesRouteFor.Shadow },
        { icon: "list", label: "Table", href: ExamplesRouteFor.Table },
      ],
    },
    { icon: "info", label: "About", href: MainRouteFor.About },
  ];
  return items.filter((item): item is SidebarItem => item !== null)
    .filter((item) => item.href || (item.children?.length ?? 0) > 0);
}
