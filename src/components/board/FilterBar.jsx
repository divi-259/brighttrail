import { Search } from "lucide-react";
import styles from "./FilterBar.module.css";
import { SOURCES, STATUSES } from "../../lib/statuses";

export default function FilterBar({ filters, onChange, allTags }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className={styles.bar}>
      <div className={styles.searchWrapper}>
        <Search size={16} className={styles.searchIcon} />
        <input
          className={styles.search}
          placeholder="Search by company or role…"
          value={filters.query}
          onChange={set("query")}
        />
      </div>

      <select className={styles.select} value={filters.status} onChange={set("status")}>
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>

      <select className={styles.select} value={filters.source} onChange={set("source")}>
        <option value="">All sources</option>
        {SOURCES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select className={styles.select} value={filters.tag} onChange={set("tag")}>
        <option value="">All tags</option>
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}
