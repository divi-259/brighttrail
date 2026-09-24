import { useEffect } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

export default function Modal({ title, onClose, children, footer, width }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className={styles.overlay} onMouseDown={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={styles.dialog} style={width ? { maxWidth: width } : undefined} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
