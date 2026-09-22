import type { ReactNode } from "react";
import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ButtonSubmit({
  onClick,
  disabled,
  children,
}: {
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}) {
  return (
    <Button variant="primary" size="medium" type="submit" onClick={onClick} disabled={disabled}>
      {children ?? CommonDisplayTextFor.Submit}
    </Button>
  );
}
