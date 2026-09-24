import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import styles from "./RecentTable.module.css";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function RecentTable({ applications }) {
  const recent = [...applications]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 6);

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <h3>Recent Applications</h3>
        <Link to="/applications" className={styles.viewAll}>
          View all →
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className={styles.empty}>No applications yet — add one to see it here.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((app) => (
                <tr key={app.id}>
                  <td className={styles.company}>{app.company || "—"}</td>
                  <td>{app.title || "—"}</td>
                  <td>
                    <Badge status={app.status} />
                  </td>
                  <td className={styles.date}>{formatDate(app.appliedDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
