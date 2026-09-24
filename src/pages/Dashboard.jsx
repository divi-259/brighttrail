import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, RefreshCw, CalendarClock, Trophy, Plus } from "lucide-react";
import SunFace from "../components/illustrations/SunFace";
import Plant from "../components/illustrations/Plant";
import StatCard from "../components/dashboard/StatCard";
import RecentTable from "../components/dashboard/RecentTable";
import Button from "../components/ui/Button";
import { useApplicationsContext } from "../lib/ApplicationsContext";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { applications } = useApplicationsContext();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const total = applications.filter((a) => a.status !== "saved").length;
    const inProgress = applications.filter((a) =>
      ["applied", "screening", "interview"].includes(a.status)
    ).length;
    const interviews = applications.filter((a) => a.status === "interview").length;
    const offers = applications.filter((a) => a.status === "offer").length;
    return { total, inProgress, interviews, offers };
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
          <SunFace size={130} />
        </div>
      </section>

      <section className={styles.stats}>
        <StatCard icon={FileText} label="Total Applications" value={stats.total} tone="primary" />
        <StatCard icon={RefreshCw} label="In Progress" value={stats.inProgress} tone="warm" />
        <StatCard icon={CalendarClock} label="Interviews" value={stats.interviews} tone="secondary" />
        <StatCard icon={Trophy} label="Offers" value={stats.offers} tone="success" />
      </section>

      <RecentTable applications={applications} />

      <footer className={styles.footer}>
        <Plant size={44} />
        <p>Small steps today. Big opportunities tomorrow.</p>
      </footer>
    </div>
  );
}
