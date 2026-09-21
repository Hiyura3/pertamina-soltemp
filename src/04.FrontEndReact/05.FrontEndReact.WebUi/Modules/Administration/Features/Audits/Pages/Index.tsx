import { useEffect, useState } from "react";
import { PageShell } from "../../../../../Common/Components/PageShell";
import { EntityTable } from "../../../../../Common/Components/EntityTable";
import { sendGetAuditsQuery } from "@logics/Modules/Administration/Audits/GetAudits/GetAuditsQuery";
import type { AuditItem } from "@services/Dto/Modules/Administration/Audits/GetAudits/AuditItem";

export function Index() {
  const [items, setItems] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [exception, setException] = useState<Error | null>(null);
  useEffect(() => {
    setLoading(true);
    sendGetAuditsQuery()
      .then((response) => setItems(response.items))
      .catch((caught) => setException(caught instanceof Error ? caught : new Error("Load failed")))
      .finally(() => setLoading(false));
  }, []);
  return (
    <PageShell title="Audits" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Audits" }]} exception={exception} loading={loading}>
      <EntityTable headers={["Table", "Action", "Created", "By"]} loading={loading} empty={items.length === 0} colSpan={4}>
        {items.map((item) => (
          <tr key={item.id} className="border-t border-border">
            <td className="px-3 py-2">{item.tableName}</td>
            <td className="px-3 py-2">{item.action}</td>
            <td className="px-3 py-2">{item.created}</td>
            <td className="px-3 py-2">{item.createdBy}</td>
          </tr>
        ))}
      </EntityTable>
    </PageShell>
  );
}
