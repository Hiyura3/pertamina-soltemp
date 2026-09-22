import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonDelete({
  onClick,
  disabled,
  entityType,
}: {
  onClick: () => void;
  disabled?: boolean;
  entityType?: string;
}) {
  return (
    <Button variant="danger-secondary" onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.Delete}
      {entityType ? ` ${entityType}` : ""}
    </Button>
  );
}
