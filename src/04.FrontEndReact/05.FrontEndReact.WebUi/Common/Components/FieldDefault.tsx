import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

// Skala field, warna fokus, dan face disabled mengikuti Pacer
// (pacer-ui-docs/src/components/system/text-input.tsx dan checkbox.tsx).

export type FieldSize = "small" | "medium" | "large";

const LABEL: Record<FieldSize, string> = {
  small: "text-[13px] leading-5",
  medium: "text-[16px] leading-6",
  large: "text-[18px] leading-7",
};

const BOX: Record<FieldSize, string> = {
  small: "h-8 px-2.5 text-[13px] leading-5",
  medium: "h-10 px-3 text-[16px] leading-6",
  large: "h-11 px-4 text-[18px] leading-7",
};

const SELECT_BOX: Record<FieldSize, string> = {
  small: "h-8 px-2.5 text-[13px] leading-5",
  medium: "h-10 px-3 text-[16px] leading-6",
  large: "h-11 px-4 text-[18px] leading-7",
};

const FIELD_BASE =
  "w-full rounded-md border border-zinc-200 bg-background outline-none transition-colors placeholder:text-zinc-400 focus:border-[#2563EB] focus:ring-[3px] focus:ring-[#BFDBFE] disabled:bg-zinc-50 disabled:text-zinc-400";

function FieldLabel({ label, required, size }: { label: string; required?: boolean; size: FieldSize }) {
  return (
    <span className={cn("flex items-center gap-1 font-medium", LABEL[size])}>
      {label}
      {required ? <span className="text-red-600">*</span> : null}
    </span>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  size?: FieldSize;
};

export function FieldDefault({
  label,
  value,
  onChange,
  required,
  type = "text",
  readOnly,
  disabled,
  placeholder,
  size = "medium",
}: FieldProps) {
  return (
    <label className="block space-y-1">
      <FieldLabel label={label} required={required} size={size} />
      <input
        className={cn(FIELD_BASE, BOX[size])}
        value={value}
        type={type}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function TextFieldAutoGrow({
  label,
  value,
  onChange,
  required,
  readOnly,
  disabled,
  rows = 3,
  size = "medium",
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  rows?: number;
  size?: FieldSize;
}) {
  return (
    <label className="block space-y-1">
      <FieldLabel label={label} required={required} size={size} />
      <textarea
        className={cn(FIELD_BASE, "min-h-[72px] px-3 py-2 text-[16px] leading-6")}
        value={value}
        rows={rows}
        readOnly={readOnly}
        disabled={disabled}
        required={required}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
}

export function SelectDefault({
  label,
  value,
  onChange,
  options,
  required,
  allowEmpty = true,
  emptyLabel = "Select…",
  disabled,
  size = "medium",
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; name: string }[];
  required?: boolean;
  allowEmpty?: boolean;
  emptyLabel?: string;
  disabled?: boolean;
  size?: FieldSize;
}) {
  const select = (
    <select
      className={cn(FIELD_BASE, SELECT_BOX[size])}
      value={value}
      required={required}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
    >
      {allowEmpty ? <option value="">{emptyLabel}</option> : null}
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );

  if (!label) {
    return select;
  }

  return (
    <label className="block space-y-1">
      <FieldLabel label={label} required={required} size={size} />
      {select}
    </label>
  );
}

const CHECK_BOX: Record<FieldSize, string> = {
  small: "size-4 rounded-[3px]",
  medium: "size-5 rounded-[4px]",
  large: "size-6 rounded-[5px]",
};

const CHECK_MARK: Record<FieldSize, string> = {
  small: "size-2.5",
  medium: "size-3",
  large: "size-3.5",
};

export function CheckField({
  label,
  checked,
  onChange,
  disabled,
  size = "medium",
}: {
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  size?: FieldSize;
}) {
  return (
    <label
      className={cn(
        "inline-flex max-w-full cursor-pointer items-start gap-2",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <span className="relative mt-0.5 inline-flex p-[5px]">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="peer sr-only"
          onChange={(event) => onChange(event.target.checked)}
        />
        <span
          className={cn(
            "inline-flex items-center justify-center border border-zinc-300 bg-background",
            "peer-hover:border-[#2563EB]",
            "peer-focus-visible:ring-[3px] peer-focus-visible:ring-[#BFDBFE]",
            "peer-checked:border-[#2563EB] peer-checked:bg-[#2563EB]",
            "peer-checked:[&_.check]:opacity-100",
            "peer-disabled:border-zinc-200 peer-disabled:bg-zinc-100",
            CHECK_BOX[size],
          )}
        >
          <svg viewBox="0 0 12 12" className={cn("check text-white opacity-0", CHECK_MARK[size])} aria-hidden>
            <path
              d="M2.2 6.2 4.6 8.6 9.8 3.4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      {label ? <span className={cn("min-w-0 pt-0.5 font-medium", LABEL[size])}>{label}</span> : null}
    </label>
  );
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap justify-end gap-2 pt-2">{children}</div>;
}
