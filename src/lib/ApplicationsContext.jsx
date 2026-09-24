import { createContext, useContext } from "react";
import { useApplications } from "./useApplications";

const ApplicationsContext = createContext(null);

export function ApplicationsProvider({ children }) {
  const value = useApplications();
  return <ApplicationsContext.Provider value={value}>{children}</ApplicationsContext.Provider>;
}

export function useApplicationsContext() {
  const ctx = useContext(ApplicationsContext);
  if (!ctx) {
    throw new Error("useApplicationsContext must be used within ApplicationsProvider");
  }
  return ctx;
}
