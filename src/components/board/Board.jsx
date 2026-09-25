import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Column from "./Column";
import ApplicationCard, { ApplicationCardOverlay } from "./ApplicationCard";
import { STATUSES } from "../../lib/statuses";
import styles from "./Board.module.css";

export default function Board({ applications, onStatusChange, onCardClick }) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const grouped = STATUSES.reduce((acc, s) => {
    acc[s.id] = applications.filter((app) => app.status === s.id);
    return acc;
  }, {});

  const activeApplication = applications.find((app) => app.id === activeId) ?? null;

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    const newStatus = over.id;
    const application = applications.find((a) => a.id === active.id);
    if (application && application.status !== newStatus) {
      onStatusChange(application.id, newStatus);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
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
      <DragOverlay>
        {activeApplication ? <ApplicationCardOverlay application={activeApplication} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
