import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonHistory({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.History}
    </Button>
  );
}
