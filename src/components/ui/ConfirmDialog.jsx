import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({
  title,
  message,
  confirmLabel = "Confirm",
  variant = "danger",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      title={title}
      onClose={onCancel}
      width="420px"
      footer={
        <>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant={variant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{message}</p>
    </Modal>
  );
}
