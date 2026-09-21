import { ChipStatus } from "./ChipStatus";

export function ProgressBarStatus({
  items,
  onItemClick,
}: {
  items: Array<{ id: string; name: string; statusCode: string; statusName: string }>;
  onItemClick?: (item: { id: string; name: string; statusCode: string; statusName: string }) => void;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No stages yet.</p>;
  }

  return (
    <ol className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <li key={item.id}>
          <button
            type="button"
            className={`flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-2 text-left${
              onItemClick ? " cursor-pointer transition-colors hover:border-primary/50 hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" : ""
            }`}
            onClick={() => onItemClick?.(item)}
            disabled={!onItemClick}
          >
            <span className="text-xs text-muted-foreground">{index + 1}</span>
            <span className="text-sm font-medium">{item.name}</span>
            <ChipStatus value={item.statusName} statusCode={item.statusCode} />
          </button>
        </li>
      ))}
    </ol>
  );
}
