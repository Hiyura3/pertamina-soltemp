import { useSyncExternalStore, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
  getRequestActivitySnapshot,
  subscribeToRequestActivity,
} from "@infrastructure/BackEndApi/RequestActivity";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "secondary-colour"
  | "tertiary"
  | "tertiary-colour"
  | "danger"
  | "danger-secondary"
  | "danger-tertiary"
  | "success";
export type ButtonSize = "small" | "medium" | "large";

// Ukuran, varian, hover, dan face disabled disalin dari Pacer
// (pacer-ui-docs/src/components/system/button.tsx) supaya template identik
// dengan design system, termasuk warna disabled per varian.
const SIZE: Record<ButtonSize, string> = {
  small: "h-8 gap-1.5 px-2.5 text-[14px] leading-5",
  medium: "h-10 gap-1.5 px-3 text-[16px] leading-6",
  large: "h-11 gap-1.5 px-4 text-[18px] leading-7",
};

const FOCUS_RING: Record<ButtonVariant, string> = {
  primary: "focus-visible:ring-[#D2DFFC]",
  secondary: "focus-visible:ring-[#E4E4E7]",
  "secondary-colour": "focus-visible:ring-[#D2DFFC]",
  tertiary: "focus-visible:ring-[#E4E4E7]",
  "tertiary-colour": "focus-visible:ring-[#D2DFFC]",
  danger: "focus-visible:ring-[#FBD8D8]",
  "danger-secondary": "focus-visible:ring-[#FBD8D8]",
  "danger-tertiary": "focus-visible:ring-[#FBD8D8]",
  success: "focus-visible:ring-[#BBF7D0]",
};

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "border-[#2563EB] bg-[#2563EB] text-white shadow-[var(--shadow-button)] hover:border-[#1D4ED8] hover:bg-[#1D4ED8] disabled:border-[#BFDBFE] disabled:bg-[#BFDBFE] disabled:text-white disabled:shadow-none",
  secondary:
    "border-zinc-200 bg-white text-zinc-700 shadow-[var(--shadow-button)] hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 disabled:border-transparent disabled:bg-zinc-50 disabled:text-zinc-300 disabled:shadow-none",
  "secondary-colour":
    "border-[#BFDBFE] bg-white text-[#2563EB] shadow-[var(--shadow-button)] hover:border-[#93C5FD] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] disabled:border-transparent disabled:bg-zinc-50 disabled:text-[#93C5FD] disabled:shadow-none",
  tertiary:
    "border-transparent bg-transparent text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 disabled:text-zinc-300",
  "tertiary-colour":
    "border-transparent bg-transparent text-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] disabled:text-[#93C5FD]",
  danger:
    "border-[#DC2626] bg-[#DC2626] text-white shadow-[var(--shadow-button)] hover:border-[#B91C1C] hover:bg-[#B91C1C] disabled:border-[#FECACA] disabled:bg-[#FECACA] disabled:text-white disabled:shadow-none",
  "danger-secondary":
    "border-[#FECACA] bg-white text-[#DC2626] shadow-[var(--shadow-button)] hover:border-[#FCA5A5] hover:bg-[#FEF2F2] hover:text-[#B91C1C] disabled:border-transparent disabled:bg-zinc-50 disabled:text-[#FCA5A5] disabled:shadow-none",
  "danger-tertiary":
    "border-transparent bg-transparent text-[#DC2626] hover:bg-[#FEF2F2] hover:text-[#B91C1C] disabled:text-[#FCA5A5]",
  // Pacer belum punya tombol hijau; face disabled mengikuti pola varian filled.
  success:
    "border-[#16A34A] bg-[#16A34A] text-white shadow-[var(--shadow-button)] hover:border-[#15803D] hover:bg-[#15803D] disabled:border-[#86EFAC] disabled:bg-[#86EFAC] disabled:text-white disabled:shadow-none",
};

export function Button({
  variant = "secondary",
  size = "small",
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
        "inline-flex shrink-0 select-none items-center justify-center rounded-md border font-medium outline-none transition-colors active:translate-y-[0.5px] focus-visible:ring-[3px] disabled:pointer-events-none",
        SIZE[size],
        FOCUS_RING[variant],
        VARIANT[variant],
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
