import styles from "./Button.module.css";

const VARIANT_CLASS = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  danger: styles.danger,
};

export default function Button({
  variant = "primary",
  icon: Icon,
  className = "",
  children,
  ...rest
}) {
  return (
    <button
      className={`${styles.button} ${VARIANT_CLASS[variant] ?? styles.primary} ${className}`}
      {...rest}
    >
      {Icon && <Icon size={16} strokeWidth={2.25} />}
      {children}
    </button>
  );
}
