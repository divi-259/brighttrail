import { useDroppable } from "@dnd-kit/core";
import ApplicationCard from "./ApplicationCard";
import styles from "./Board.module.css";

export default function Column({ status, applications, onCardClick }) {
  const { setNodeRef, isOver } = useDroppable({ id: status.id });

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <span className={`${styles.dot} ${styles[status.id]}`} />
        <h3>{status.label}</h3>
        <span className={styles.count}>{applications.length}</span>
      </div>
      <div ref={setNodeRef} className={`${styles.columnBody} ${isOver ? styles.columnBodyOver : ""}`}>
        {applications.length === 0 && <div className={styles.emptyColumn}>No applications yet</div>}
        {applications.map((app) => (
          <ApplicationCard key={app.id} application={app} onClick={() => onCardClick(app)} />
        ))}
      </div>
    </div>
  );
}
