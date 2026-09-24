import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import Column from "./Column";
import { STATUSES } from "../../lib/statuses";
import styles from "./Board.module.css";

export default function Board({ applications, onStatusChange, onCardClick }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const grouped = STATUSES.reduce((acc, s) => {
    acc[s.id] = applications.filter((app) => app.status === s.id);
    return acc;
  }, {});

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const newStatus = over.id;
    const application = applications.find((a) => a.id === active.id);
    if (application && application.status !== newStatus) {
      onStatusChange(application.id, newStatus);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className={styles.board}>
        {STATUSES.map((status) => (
          <Column
            key={status.id}
            status={status}
            applications={grouped[status.id]}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </DndContext>
  );
}
