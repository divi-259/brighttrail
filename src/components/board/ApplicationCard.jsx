import { useDraggable } from "@dnd-kit/core";
import { MapPin, Calendar } from "lucide-react";
import styles from "./Board.module.css";

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function CardBody({ application }) {
  const dateLabel = formatDate(application.appliedDate);

  return (
    <>
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
    </>
  );
}

export function ApplicationCardOverlay({ application }) {
  return (
    <div className={`${styles.card} ${styles.cardOverlayGhost}`}>
      <CardBody application={application} />
    </div>
  );
}

export default function ApplicationCard({ application, onClick }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: application.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.card} ${isDragging ? styles.cardPlaceholder : ""}`}
      onClick={onClick}
      {...listeners}
      {...attributes}
    >
      <CardBody application={application} />
    </div>
  );
}
