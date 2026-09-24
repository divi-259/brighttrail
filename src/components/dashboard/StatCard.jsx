import Card from "../ui/Card";
import styles from "./StatCard.module.css";

export default function StatCard({ icon: Icon, label, value, tone = "primary" }) {
  return (
    <Card className={styles.card}>
      <span className={`${styles.iconWrap} ${styles[tone]}`}>
        <Icon size={18} strokeWidth={2.25} />
      </span>
      <div>
        <p className={styles.value}>{value}</p>
        <p className={styles.label}>{label}</p>
      </div>
    </Card>
  );
}
