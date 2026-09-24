import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Board from "../components/board/Board";
import FilterBar from "../components/board/FilterBar";
import ApplicationForm from "../components/board/ApplicationForm";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import Button from "../components/ui/Button";
import EmptyBoard from "../components/illustrations/EmptyBoard";
import { useApplicationsContext } from "../lib/ApplicationsContext";
import styles from "./Applications.module.css";

const EMPTY_FILTERS = { query: "", status: "", source: "", tag: "" };

export default function Applications() {
  const { applications, add, update, remove } = useApplicationsContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [editingApp, setEditingApp] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  useEffect(() => {
    if (location.state?.openAdd) {
      setIsAdding(true);
      navigate(".", { replace: true, state: null });
    }
  }, [location.state, navigate]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    applications.forEach((app) => app.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [applications]);

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return applications.filter((app) => {
      if (query) {
        const haystack = `${app.company} ${app.title}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (filters.status && app.status !== filters.status) return false;
      if (filters.source && app.source !== filters.source) return false;
      if (filters.tag && !app.tags?.includes(filters.tag)) return false;
      return true;
    });
  }, [applications, filters]);

  const handleSave = (values) => {
    if (editingApp) {
      update(editingApp.id, values);
      setEditingApp(null);
    } else {
      add(values);
      setIsAdding(false);
    }
  };

  const closeForm = () => {
    setIsAdding(false);
    setEditingApp(null);
  };

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Applications</h1>
          <p className={styles.subtitle}>Drag cards across the board as you move through the process.</p>
        </div>
        <Button icon={Plus} onClick={() => setIsAdding(true)}>
          Add application
        </Button>
      </div>

      <FilterBar filters={filters} onChange={setFilters} allTags={allTags} />

      {applications.length === 0 ? (
        <EmptyBoard onAdd={() => setIsAdding(true)} />
      ) : (
        <Board
          applications={filtered}
          onStatusChange={(id, status) => update(id, { status })}
          onCardClick={(app) => setEditingApp(app)}
        />
      )}

      {(isAdding || editingApp) && (
        <ApplicationForm
          initialValue={editingApp}
          onSave={handleSave}
          onClose={closeForm}
          onDelete={() => {
            setPendingDelete(editingApp);
            setEditingApp(null);
          }}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this application?"
          message={`This will permanently remove "${pendingDelete.company || "this application"}" from your tracker.`}
          confirmLabel="Delete"
          onConfirm={() => {
            remove(pendingDelete.id);
            setPendingDelete(null);
          }}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
