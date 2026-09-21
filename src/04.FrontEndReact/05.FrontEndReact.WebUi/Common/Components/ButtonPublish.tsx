import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonPublish({
  onClick,
  disabled,
  size = "sm",
}: {
  onClick: () => void;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <Button variant="success" size={size} onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.Publish}
    </Button>
  );
}
