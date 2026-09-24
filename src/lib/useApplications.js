import { useCallback, useEffect, useState } from "react";
import {
  STORAGE_KEY,
  addApplication,
  deleteApplication,
  getApplications,
  resetAllData,
  updateApplication,
} from "./storage";

export function useApplications() {
  const [applications, setApplications] = useState(() => getApplications());

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setApplications(getApplications());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((partial) => {
    const created = addApplication(partial);
    setApplications(getApplications());
    return created;
  }, []);

  const update = useCallback((id, patch) => {
    const next = updateApplication(id, patch);
    setApplications(next);
  }, []);

  const remove = useCallback((id) => {
    const next = deleteApplication(id);
    setApplications(next);
  }, []);

  const reset = useCallback(() => {
    resetAllData();
    setApplications([]);
  }, []);

  return { applications, add, update, remove, reset };
}
