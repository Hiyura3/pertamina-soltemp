import type { ReactNode } from "react";

export function EntityTable({
  headers,
  loading,
  empty,
  colSpan,
  children,
  toolbar,
}: {
  headers: Array<string | { label: string; className?: string; width?: string }>;
  loading: boolean;
  empty: boolean;
  colSpan: number;
  children: ReactNode;
  toolbar?: ReactNode;
}) {
  return (
    <div className="w-full overflow-hidden">
      {toolbar ? <div className="flex justify-end border-b border-border px-3 py-2">{toolbar}</div> : null}
      <div className="max-h-[calc(100svh-8rem)] overflow-auto">
        <table className="w-full text-left text-[13px] [&_tbody_tr:hover]:bg-zinc-50">
          <thead className="sticky top-0 z-10 bg-background text-zinc-500">
            <tr>
              {headers.map((header, index) => {
                const label = typeof header === "string" ? header : header.label;
                const className = typeof header === "string" ? undefined : header.className;
                const width = typeof header === "string" ? undefined : header.width;
                const isCenteredColumn = label === "Status" || (label === "Action" && index === headers.length - 1) || label === "File" || label === "";
                return (
                  <th key={`${label}-${index}`} className={`border-b border-zinc-200 px-3 py-2 font-medium ${className ?? (isCenteredColumn ? "text-center" : "")}`} style={width ? { width } : undefined}>
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-6 text-center text-muted-foreground" colSpan={colSpan}>
                  Loading…
                </td>
              </tr>
            ) : empty ? (
              <tr>
                <td className="px-3 py-6 text-center text-muted-foreground" colSpan={colSpan}>
                  No data
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
