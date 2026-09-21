import { Sheet } from "./Sheet";
import { ButtonCancel } from "./ButtonCancel";
import { formatWib } from "./DateTimePicker";
import { cn } from "../../lib/utils";

export type ChatNote = { id: string; remarks: string; created: string; createdBy: string };

export function NotesChatDrawer({ open, title = "Notes History", items, isOutgoing, onClose }: {
  open: boolean;
  title?: string;
  items: ChatNote[];
  isOutgoing: (item: ChatNote) => boolean;
  onClose: () => void;
}) {
  const ordered = [...items].sort((left, right) => new Date(right.created).getTime() - new Date(left.created).getTime());
  return (
    <Sheet open={open} title={title} onClose={onClose} footer={<ButtonCancel onClick={onClose} />}>
      {ordered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">No history available.</div>
      ) : (
        <ol aria-label="Notes conversation" className="space-y-4">
          {ordered.map((item) => {
            const outgoing = isOutgoing(item);
            return (
              <li key={item.id} className={cn("flex", outgoing ? "justify-end" : "justify-start")}>
                <article className={cn("max-w-[80%] min-w-0 rounded-2xl border px-4 py-3 text-foreground shadow-sm", outgoing ? "rounded-tr-sm border-primary/20 bg-primary/10" : "rounded-tl-sm border-border bg-muted/60")}>
                  <p className={cn("break-words text-xs font-semibold", outgoing ? "text-primary" : "text-muted-foreground")}>{item.createdBy || "-"}</p>
                  <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed">{item.remarks || "-"}</p>
                  <time dateTime={item.created} className="mt-2 block text-right text-[11px] text-muted-foreground">{formatWib(item.created)}</time>
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </Sheet>
  );
}
