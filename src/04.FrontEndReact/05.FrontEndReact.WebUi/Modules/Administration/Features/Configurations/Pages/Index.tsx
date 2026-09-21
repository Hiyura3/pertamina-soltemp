import { useEffect, useState } from "react";
import { PageShell } from "../../../../../Common/Components/PageShell";
import { EntityTable } from "../../../../../Common/Components/EntityTable";
import { sendGetConfigurationsQuery } from "@logics/Modules/Administration/Configurations/GetConfigurations/GetConfigurationsQuery";
import type { ConfigurationItem } from "@services/Dto/Modules/Administration/Configurations/GetConfigurations/ConfigurationItem";

export function Index() {
  const [items, setItems] = useState<ConfigurationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [exception, setException] = useState<Error | null>(null);
  useEffect(() => {
    setLoading(true);
    sendGetConfigurationsQuery()
      .then((response) => setItems(response.items))
      .catch((caught) => setException(caught instanceof Error ? caught : new Error("Load failed")))
      .finally(() => setLoading(false));
  }, []);
  return (
    <PageShell title="Configurations" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Configurations" }]} exception={exception} loading={loading}>
      <EntityTable headers={["Key", "Value"]} loading={loading} empty={items.length === 0} colSpan={2}>
        {items.map((item) => (
          <tr key={item.id} className="border-t border-border">
            <td className="px-3 py-2 font-medium">{item.key}</td>
            <td className="px-3 py-2">{item.value}</td>
          </tr>
        ))}
      </EntityTable>
    </PageShell>
  );
}
