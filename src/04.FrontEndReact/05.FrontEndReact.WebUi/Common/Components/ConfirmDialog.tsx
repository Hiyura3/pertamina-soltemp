import { Dialog } from "./Dialog";
import { ButtonCancel } from "./ButtonCancel";
import { Button } from "./Button";
import { CommonDisplayTextFor } from "../Statics/DisplayTextFor";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = CommonDisplayTextFor.Confirm,
  danger = false,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}) {
  return (
    <Dialog
      open={open}
      title={title}
      onClose={onClose}
      maxWidth="sm"
      footer={
        <>
          <ButtonCancel onClick={onClose} />
          <Button
            variant={danger ? "danger" : "primary"}
            onClick={() => {
              void onConfirm();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-muted-foreground">{message}</p>
    </Dialog>
  );
}
