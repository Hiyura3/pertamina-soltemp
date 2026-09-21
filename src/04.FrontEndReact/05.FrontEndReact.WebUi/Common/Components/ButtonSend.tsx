import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonSend({
  entityType,
  onClick,
  disabled,
}: {
  entityType: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button variant="outlined" size="md" onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.Send} {entityType}
    </Button>
  );
}
