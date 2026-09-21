import type { ReactNode } from "react";
import { Button } from "./Button";

export function ButtonPrimary({
  onClick,
  disabled,
  children,
  type = "button",
}: {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <Button variant="primary" size="md" type={type} onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
}
