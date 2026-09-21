import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonSave({
  onClick,
  disabled,
  type = "submit",
  label = CommonDisplayTextFor.Save,
}: {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  label?: string;
}) {
  return (
    <Button variant="primary" size="md" type={type} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
}
