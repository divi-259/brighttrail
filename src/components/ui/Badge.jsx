import { STATUS_LABEL } from "../../lib/statuses";
import styles from "./Badge.module.css";

export default function Badge({ status, children }) {
  return (
    <span className={`${styles.badge} ${styles[status] ?? ""}`}>
      {children ?? STATUS_LABEL[status] ?? status}
    </span>
  );
}
