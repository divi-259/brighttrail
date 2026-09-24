import styles from "./Field.module.css";

export default function Select({ label, id, children, className = "", ...rest }) {
  return (
    <label className={styles.field} htmlFor={id}>
      {label && <span className={styles.label}>{label}</span>}
      <select id={id} className={`${styles.control} ${className}`} {...rest}>
        {children}
      </select>
    </label>
  );
}
