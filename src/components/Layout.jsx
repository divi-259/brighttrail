import { useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Download, RotateCcw, ChevronDown, Sun, Moon } from "lucide-react";
import SunMark from "./illustrations/SunMark";
import Button from "./ui/Button";
import ConfirmDialog from "./ui/ConfirmDialog";
import { useApplicationsContext } from "../lib/ApplicationsContext";
import { useThemeContext } from "../lib/ThemeContext";
import { exportToCSV, exportToExcel } from "../lib/export";
import styles from "./Layout.module.css";

export default function Layout() {
  const { applications, reset } = useApplicationsContext();
  const { theme, toggleTheme } = useThemeContext();
  const [exportOpen, setExportOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const exportRef = useRef(null);

  const handleExport = (format) => {
    if (format === "csv") exportToCSV(applications);
    if (format === "xlsx") exportToExcel(applications);
    setExportOpen(false);
  };

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          <SunMark size={30} />
          <span className={styles.wordmark}>BrightTrail</span>
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}>
            Dashboard
          </NavLink>
          <NavLink to="/applications" className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}>
            Applications
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <div className={styles.exportWrapper} ref={exportRef}>
            <Button variant="secondary" icon={Download} onClick={() => setExportOpen((o) => !o)}>
              Export <ChevronDown size={14} />
            </Button>
            {exportOpen && (
              <>
                <div className={styles.exportBackdrop} onClick={() => setExportOpen(false)} />
                <div className={styles.exportMenu}>
                  <button onClick={() => handleExport("csv")}>Export as CSV</button>
                  <button onClick={() => handleExport("xlsx")}>Export as Excel (.xlsx)</button>
                </div>
              </>
            )}
          </div>
          <Button variant="ghost" icon={RotateCcw} onClick={() => setConfirmReset(true)}>
            Reset
          </Button>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      {confirmReset && (
        <ConfirmDialog
          title="Reset all data?"
          message="This will permanently delete every application stored in this browser. This can't be undone — export a backup first if you want to keep a copy."
          confirmLabel="Reset everything"
          onConfirm={() => {
            reset();
            setConfirmReset(false);
          }}
          onCancel={() => setConfirmReset(false)}
        />
      )}
    </div>
  );
}
