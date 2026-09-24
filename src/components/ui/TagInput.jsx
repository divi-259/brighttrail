import { useState } from "react";
import { X } from "lucide-react";
import fieldStyles from "./Field.module.css";
import styles from "./TagInput.module.css";

export default function TagInput({ label, value = [], onChange }) {
  const [draft, setDraft] = useState("");

  const commitDraft = () => {
    const tag = draft.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setDraft("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className={fieldStyles.field}>
      {label && <span className={fieldStyles.label}>{label}</span>}
      <div className={styles.wrapper}>
        {value.map((tag) => (
          <span className={styles.chip} key={tag}>
            {tag}
            <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          className={styles.input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder={value.length === 0 ? "Add a tag and press Enter" : ""}
        />
      </div>
    </div>
  );
}
