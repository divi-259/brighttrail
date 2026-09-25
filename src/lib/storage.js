const STORAGE_KEY = "brighttrail.applications.v1";

export function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function todayISODate() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

export function blankApplication() {
  return {
    id: createId(),
    company: "",
    title: "",
    jobUrl: "",
    status: "saved",
    appliedDate: todayISODate(),
    location: "",
    salaryRange: "",
    contactName: "",
    contactInfo: "",
    source: "",
    notes: "",
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function getApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveApplications(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

export function addApplication(partial) {
  const applications = getApplications();
  const application = { ...blankApplication(), ...partial };
  saveApplications([application, ...applications]);
  return application;
}

export function updateApplication(id, patch) {
  const applications = getApplications();
  const next = applications.map((app) =>
    app.id === id ? { ...app, ...patch, updatedAt: new Date().toISOString() } : app
  );
  saveApplications(next);
  return next;
}

export function deleteApplication(id) {
  const applications = getApplications().filter((app) => app.id !== id);
  saveApplications(applications);
  return applications;
}

export function resetAllData() {
  localStorage.removeItem(STORAGE_KEY);
}

export { STORAGE_KEY };
