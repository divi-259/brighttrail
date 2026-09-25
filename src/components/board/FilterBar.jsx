import { Search } from "lucide-react";
import Select from "../ui/Select";
import styles from "./FilterBar.module.css";
import { SOURCES, STATUSES } from "../../lib/statuses";

export default function FilterBar({ filters, onChange, allTags }) {
  const setField = (key) => (value) => onChange({ ...filters, [key]: value });

  const statusOptions = [
    { value: "", label: "All statuses" },
    ...STATUSES.map((s) => ({ value: s.id, label: s.label })),
  ];
  const sourceOptions = [
    { value: "", label: "All sources" },
    ...SOURCES.map((s) => ({ value: s, label: s })),
  ];
  const tagOptions = [
    { value: "", label: "All tags" },
    ...allTags.map((tag) => ({ value: tag, label: tag })),
  ];

  return (
    <div className={styles.bar}>
      <div className={styles.searchWrapper}>
        <Search size={16} className={styles.searchIcon} />
        <input
          className={styles.search}
          placeholder="Search by company or role…"
          value={filters.query}
          onChange={(e) => setField("query")(e.target.value)}
        />
      </div>

      <Select variant="pill" value={filters.status} onChange={setField("status")} options={statusOptions} />
      <Select variant="pill" value={filters.source} onChange={setField("source")} options={sourceOptions} />
      <Select variant="pill" value={filters.tag} onChange={setField("tag")} options={tagOptions} />
    </div>
  );
}
