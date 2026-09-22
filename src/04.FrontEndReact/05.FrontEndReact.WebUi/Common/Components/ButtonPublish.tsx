import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonPublish({
  onClick,
  disabled,
  size = "small",
}: {
  onClick: () => void;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}) {
  return (
    <Button variant="success" size={size} onClick={onClick} disabled={disabled}>
      {CommonDisplayTextFor.Publish}
    </Button>
  );
}
