import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function TextFieldSearch({
  value,
  onChange,
  placeholder = CommonDisplayTextFor.Search,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className="h-9 w-56 rounded-md border border-border bg-card px-3 text-sm outline-none focus:border-ring"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
