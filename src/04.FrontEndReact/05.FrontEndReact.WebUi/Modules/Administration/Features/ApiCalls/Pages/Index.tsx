import { useEffect, useState } from "react";
import { PageShell } from "../../../../../Common/Components/PageShell";
import { EntityTable } from "../../../../../Common/Components/EntityTable";
import { sendGetApiCallsQuery } from "@logics/Modules/Administration/ApiCalls/GetApiCalls/GetApiCallsQuery";
import type { ApiCallItem } from "@services/Dto/Modules/Administration/ApiCalls/GetApiCalls/ApiCallItem";

export function Index() {
  const [items, setItems] = useState<ApiCallItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [exception, setException] = useState<Error | null>(null);
  useEffect(() => {
    setLoading(true);
    sendGetApiCallsQuery()
      .then((response) => setItems(response.items))
      .catch((caught) => setException(caught instanceof Error ? caught : new Error("Load failed")))
      .finally(() => setLoading(false));
  }, []);
  return (
    <PageShell title="API Calls" breadcrumbs={[{ label: "Home", href: "/" }, { label: "API Calls" }]} exception={exception} loading={loading}>
      <EntityTable headers={["Method", "Path", "Status", "Created"]} loading={loading} empty={items.length === 0} colSpan={4}>
        {items.map((item) => (
          <tr key={item.id} className="border-t border-border">
            <td className="px-3 py-2 font-medium">{item.method}</td>
            <td className="px-3 py-2">{item.path}</td>
            <td className="px-3 py-2">{item.statusCode}</td>
            <td className="px-3 py-2">{item.created}</td>
          </tr>
        ))}
      </EntityTable>
    </PageShell>
  );
}
