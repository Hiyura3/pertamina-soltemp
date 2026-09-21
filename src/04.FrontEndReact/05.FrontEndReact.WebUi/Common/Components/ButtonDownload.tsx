import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonDownload({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.Download}
    </Button>
  );
}
