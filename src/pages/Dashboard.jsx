import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, RefreshCw, Ghost, XCircle, Plus, Trash2 } from "lucide-react";
import SunFace from "../components/illustrations/SunFace";
import Plant from "../components/illustrations/Plant";
import Hills from "../components/illustrations/Hills";
import Cloud from "../components/illustrations/Cloud";
import StatCard from "../components/dashboard/StatCard";
import RecentTable from "../components/dashboard/RecentTable";
import DailyQuote from "../components/dashboard/DailyQuote";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { useApplicationsContext } from "../lib/ApplicationsContext";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { applications, reset } = useApplicationsContext();
  const navigate = useNavigate();
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);

  const stats = useMemo(() => {
    const total = applications.length;
    const inProgress = applications.filter((a) => a.status === "inProgress").length;
    const ghosted = applications.filter((a) => a.status === "ghosted").length;
    const rejected = applications.filter((a) => a.status === "rejected").length;
    return { total, inProgress, ghosted, rejected };
  }, [applications]);

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Good jobs, brighter tomorrows.</h1>
          <p>Track your applications, celebrate progress, and take the next step with confidence.</p>
          <Button icon={Plus} onClick={() => navigate("/applications", { state: { openAdd: true } })}>
            Add Application
          </Button>
        </div>
        <div className={styles.heroArt}>
          <Cloud size={54} className={styles.heroCloud} />
          <SunFace size={130} />
        </div>
        <div className={styles.heroHills}>
          <Hills width={340} height={110} tone="warm" />
        </div>
      </section>

      <section className={styles.stats}>
        <StatCard icon={FileText} label="Total Applications" value={stats.total} tone="primary" />
        <StatCard icon={RefreshCw} label="In Progress" value={stats.inProgress} tone="warm" />
        <StatCard icon={Ghost} label="Ghosted" value={stats.ghosted} tone="muted" />
        <StatCard icon={XCircle} label="Rejected" value={stats.rejected} tone="danger" />
      </section>

      <RecentTable applications={applications} />

      {applications.length > 0 && (
        <div className={styles.deleteAllRow}>
          <Button variant="ghost" icon={Trash2} onClick={() => setConfirmDeleteAll(true)}>
            Delete all applications
          </Button>
        </div>
      )}

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Plant size={56} potColor="var(--color-primary-hover)" />
          <DailyQuote />
        </div>
        <div className={styles.footerHills}>
          <Hills width={260} height={92} tone="mint" />
        </div>
      </footer>

      {confirmDeleteAll && (
        <ConfirmDialog
          title="Delete all applications?"
          message="This will permanently delete every application and clear your dashboard. This can't be undone — export a backup first if you want to keep a copy."
          confirmLabel="Delete everything"
          onConfirm={() => {
            reset();
            setConfirmDeleteAll(false);
          }}
          onCancel={() => setConfirmDeleteAll(false)}
        />
      )}
    </div>
  );
}
