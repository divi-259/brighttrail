import { useEffect, useState } from "react";
import fieldStyles from "./Field.module.css";
import styles from "./Autocomplete.module.css";

export default function Autocomplete({
  label,
  id,
  value,
  onChange,
  suggestions,
  placeholder,
  required,
  autoFocus,
  maxSuggestions = 5,
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const query = value.trim().toLowerCase();
  const filtered = (
    query ? suggestions.filter((s) => s.toLowerCase().includes(query)) : suggestions
  ).slice(0, maxSuggestions);

  useEffect(() => {
    setActiveIndex(-1);
  }, [value, open]);

  const selectValue = (title) => {
    onChange(title);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!open || filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectValue(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={fieldStyles.field}>
      {label && (
        <span className={fieldStyles.label}>
          {label}
          {required && <span className={fieldStyles.required}> *</span>}
        </span>
      )}
      <div className={styles.wrapper}>
        <input
          id={id}
          className={fieldStyles.control}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          autoComplete="off"
        />
        {open && filtered.length > 0 && (
          <ul className={styles.menu} role="listbox">
            {filtered.map((title, index) => (
              <li key={title}>
                <button
                  type="button"
                  className={`${styles.option} ${index === activeIndex ? styles.optionActive : ""}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectValue(title)}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
