import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  readOnly?: boolean;
  placeholder?: string;
};

export function FieldDefault({
  label,
  value,
  onChange,
  required,
  type = "text",
  readOnly,
  placeholder,
}: FieldProps) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-muted-foreground">
        {label}
        {required ? <span className="ml-0.5 text-red-600">*</span> : null}
      </span>
      <input
        className="h-9 w-full rounded-md border border-border px-3 outline-none focus:border-ring disabled:bg-muted"
        value={value}
        type={type}
        readOnly={readOnly}
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
  rows = 3,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
  rows?: number;
}) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-muted-foreground">
        {label}
        {required ? <span className="ml-0.5 text-red-600">*</span> : null}
      </span>
      <textarea
        className="w-full rounded-md border border-border px-3 py-2 outline-none focus:border-ring disabled:bg-muted"
        value={value}
        rows={rows}
        readOnly={readOnly}
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
  size,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { id: string; name: string }[];
  required?: boolean;
  allowEmpty?: boolean;
  emptyLabel?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}) {
  const select = (
    <select
      className={cn(
        "w-full rounded-md border border-border bg-card outline-none focus:border-ring disabled:bg-muted",
        !size && "h-9 px-3",
        size === "small" && "h-8 px-2.5 text-sm",
        size === "medium" && "h-10 px-3 text-base",
        size === "large" && "h-11 px-4 text-lg",
      )}
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
    <label className="block space-y-1 text-sm">
      <span className="text-muted-foreground">
        {label}
        {required ? <span className="ml-0.5 text-red-600">*</span> : null}
      </span>
      {select}
    </label>
  );
}

export function CheckField({
  label,
  checked,
  onChange,
  disabled,
}: {
  label?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label ? <span>{label}</span> : null}
    </label>
  );
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap justify-end gap-2 pt-2">{children}</div>;
}
