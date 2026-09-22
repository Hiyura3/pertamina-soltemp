import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonReturn({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button size="medium" onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.Return}
    </Button>
  );
}
