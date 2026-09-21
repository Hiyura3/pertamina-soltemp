import { PageShell } from "../../../Common/Components/PageShell";
import { EntityTable } from "../../../Common/Components/EntityTable";

const rows = [
  { code: "ID", name: "Indonesia" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
];

export function TableExample() {
  return (
    <PageShell title="Table" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Examples" }, { label: "Table" }]}>
      <EntityTable headers={["Code", "Name"]} loading={false} empty={false} colSpan={2}>
        {rows.map((row) => (
          <tr key={row.code} className="border-t border-border">
            <td className="px-3 py-2 font-medium">{row.code}</td>
            <td className="px-3 py-2">{row.name}</td>
          </tr>
        ))}
      </EntityTable>
    </PageShell>
  );
}
