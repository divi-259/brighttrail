import styles from "./Field.module.css";

export default function Input({ label, id, as = "input", className = "", ...rest }) {
  const Tag = as;
  return (
    <label className={styles.field} htmlFor={id}>
      {label && (
        <span className={styles.label}>
          {label}
          {rest.required && <span className={styles.required}> *</span>}
        </span>
      )}
      <Tag id={id} className={`${styles.control} ${className}`} {...rest} />
    </label>
  );
}
