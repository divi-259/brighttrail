import { useDraggable } from "@dnd-kit/core";
import { MapPin, Calendar } from "lucide-react";
import styles from "./Board.module.css";

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function ApplicationCard({ application, onClick }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application.id,
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  const dateLabel = formatDate(application.appliedDate);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.card} ${isDragging ? styles.cardDragging : ""}`}
      onClick={onClick}
      {...listeners}
      {...attributes}
    >
      <p className={styles.cardCompany}>{application.company || "Untitled company"}</p>
      <p className={styles.cardTitle}>{application.title || "Untitled role"}</p>

      <div className={styles.cardMeta}>
        {application.location && (
          <span>
            <MapPin size={12} /> {application.location}
          </span>
        )}
        {dateLabel && (
          <span>
            <Calendar size={12} /> {dateLabel}
          </span>
        )}
      </div>

      {application.tags?.length > 0 && (
        <div className={styles.cardTags}>
          {application.tags.map((tag) => (
            <span key={tag} className={styles.tagChip}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
