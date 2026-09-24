import { Plus } from "lucide-react";
import SunFace from "./SunFace";
import Plant from "./Plant";
import Button from "../ui/Button";
import styles from "./EmptyBoard.module.css";

export default function EmptyBoard({ onAdd }) {
  return (
    <div className={styles.wrapper}>
      <SunFace size={110} />
      <h3>Your board is empty</h3>
      <p>Add your first application to start tracking your job search.</p>
      <Button icon={Plus} onClick={onAdd}>
        Add application
      </Button>
      <div className={styles.plant}>
        <Plant size={64} />
      </div>
    </div>
  );
}
