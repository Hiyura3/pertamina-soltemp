import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonAdd({
  entityType,
  onClick,
  disabled,
}: {
  entityType: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button variant="primary" onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.Add} {entityType}
    </Button>
  );
}
