import { EntityTable } from "./EntityTable";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";
import { formatWib } from "./DateTimePicker";

export type AuditRow = {
  action: string;
  created: string;
  createdBy: string;
};

export function TableAudits({ items }: { items?: AuditRow[] }) {
  const rows = items ?? [];
  return (
    <EntityTable
      headers={[CommonDisplayTextFor.Action, CommonDisplayTextFor.Created, CommonDisplayTextFor.CreatedBy]}
      loading={false}
      empty={rows.length === 0}
      colSpan={3}
    >
      {rows.map((item, index) => (
        <tr key={`${item.action}-${index}`} className="border-t border-border">
          <td className="px-3 py-2">{item.action}</td>
          <td className="px-3 py-2">{formatWib(item.created)}</td>
          <td className="px-3 py-2">{item.createdBy}</td>
        </tr>
      ))}
    </EntityTable>
  );
}
