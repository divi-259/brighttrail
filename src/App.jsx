import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import { ApplicationsProvider } from "./lib/ApplicationsContext";

export default function App() {
  return (
    <ApplicationsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="applications" element={<Applications />} />
        </Route>
      </Routes>
    </ApplicationsProvider>
  );
}
