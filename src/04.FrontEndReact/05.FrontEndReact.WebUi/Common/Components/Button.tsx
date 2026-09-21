import { useSyncExternalStore, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
  getRequestActivitySnapshot,
  subscribeToRequestActivity,
} from "@infrastructure/BackEndApi/RequestActivity";

export type ButtonVariant = "primary" | "outlined" | "ghost" | "danger" | "danger-outlined" | "success";
export type ButtonSize = "sm" | "md";

export function Button({
  variant = "outlined",
  size = "sm",
  className,
  children,
  disabled,
  onClick,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}) {
  const requestActive = useSyncExternalStore(
    subscribeToRequestActivity,
    getRequestActivitySnapshot,
    getRequestActivitySnapshot,
  );

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-md font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "h-8 px-2.5 text-xs" : "h-9 px-3 text-sm",
        variant === "primary" && "bg-primary text-primary-foreground shadow-[var(--shadow-button)] hover:opacity-90",
        variant === "outlined" && "border border-border bg-card text-foreground hover:bg-muted",
        variant === "ghost" && "text-muted-foreground hover:bg-muted",
        variant === "danger" && "bg-destructive text-destructive-foreground hover:opacity-90",
        variant === "danger-outlined" && "border border-destructive/30 bg-card text-destructive hover:bg-destructive/10",
        variant === "success" && "bg-[var(--color-success-600)] text-white hover:bg-[var(--color-success-700)]",
        className,
      )}
      disabled={disabled || requestActive}
      {...props}
      onClick={(event) => {
        // Synchronous guard: reject a second click even before React has had
        // time to render the global disabled state.
        if (getRequestActivitySnapshot()) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
}
