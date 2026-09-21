import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonUpdate({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button variant="primary" onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.Update}
    </Button>
  );
}
