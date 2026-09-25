import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import fieldStyles from "./Field.module.css";
import styles from "./Select.module.css";

export default function Select({ label, id, value, onChange, options, required, variant = "field" }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!open) setActiveIndex(-1);
  }, [open]);

  const selectValue = (val) => {
    onChange(val);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else if (activeIndex >= 0) {
        selectValue(options[activeIndex].value);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((i) => (i <= 0 ? options.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const trigger = (
    <button
      type="button"
      id={id}
      className={variant === "pill" ? styles.triggerPill : styles.triggerField}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={handleKeyDown}
      aria-haspopup="listbox"
      aria-expanded={open}
    >
      <span>{selected?.label}</span>
      <ChevronDown size={15} className={styles.chevron} />
    </button>
  );

  const menu = open && (
    <ul className={styles.menu} role="listbox">
      {options.map((opt, index) => (
        <li key={opt.value}>
          <button
            type="button"
            className={`${styles.option} ${opt.value === value ? styles.optionSelected : ""} ${
              index === activeIndex ? styles.optionActive : ""
            }`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => selectValue(opt.value)}
          >
            {opt.label}
          </button>
        </li>
      ))}
    </ul>
  );

  if (variant === "pill") {
    return (
      <div className={styles.pillWrapper} ref={containerRef}>
        {trigger}
        {menu}
      </div>
    );
  }

  return (
    <div className={fieldStyles.field} ref={containerRef}>
      {label && (
        <span className={fieldStyles.label}>
          {label}
          {required && <span className={fieldStyles.required}> *</span>}
        </span>
      )}
      <div className={styles.wrapper}>
        {trigger}
        {menu}
      </div>
    </div>
  );
}
