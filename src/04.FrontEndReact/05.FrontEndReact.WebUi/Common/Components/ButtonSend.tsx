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
    <Button size="medium" onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.Send} {entityType}
    </Button>
  );
}
