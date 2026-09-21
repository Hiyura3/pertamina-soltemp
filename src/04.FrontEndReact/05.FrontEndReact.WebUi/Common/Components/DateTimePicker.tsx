import { FieldDefault } from "./FieldDefault";

export function DateTimePicker({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return <FieldDefault label={label} value={value} onChange={onChange} type="datetime-local" required={required} />;
}

export function formatWib(value?: string | null) {
  if (!value) {
    return "—";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return `${date.toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })} WIB (GMT+7)`;
}
