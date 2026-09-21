import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Icon } from "./Icon";

export type PacerSelectOption = { id: string; name: string };

export function PacerSelect({
  value,
  onChange,
  options,
  emptyLabel = "Select…",
  allowEmpty = true,
  disabled,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: PacerSelectOption[];
  emptyLabel?: string;
  allowEmpty?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.id === value);
  const menuOptions = allowEmpty ? [{ id: "", name: emptyLabel }, ...options] : options;

  useEffect(() => {
    if (!open) return;

    function closeOnOutsideClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-controls={`${id}-menu`}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        className={cn(
          "inline-flex h-8 w-full items-center justify-between gap-1.5 rounded-md border border-border bg-card px-2.5 text-sm font-normal outline-none transition-colors hover:bg-muted disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground",
          open && "border-primary ring-3 ring-blue-200",
        )}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="min-w-0 truncate">{selected?.name ?? emptyLabel}</span>
        <Icon name="chevron-down" size={16} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div
          id={`${id}-menu`}
          role="listbox"
          className="absolute right-0 z-50 mt-2 min-w-full overflow-hidden rounded-md border border-border bg-card py-1 text-sm shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
        >
          {menuOptions.map((option) => {
            const isSelected = option.id === value;
            return (
              <button
                key={option.id || "__empty"}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={cn(
                  "flex w-full items-center gap-2 px-3 py-1.5 text-left whitespace-nowrap hover:bg-muted",
                  isSelected && "bg-muted",
                )}
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
              >
                <span className="min-w-0 flex-1 truncate">{option.name}</span>
                {isSelected ? (
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon name="check" size={12} />
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
