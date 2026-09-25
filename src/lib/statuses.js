export const STATUSES = [
  { id: "applied", label: "Applied" },
  { id: "inProgress", label: "In Progress" },
  { id: "ghosted", label: "Ghosted" },
  { id: "rejected", label: "Rejected" },
];

export const STATUS_IDS = STATUSES.map((s) => s.id);

export const STATUS_LABEL = Object.fromEntries(STATUSES.map((s) => [s.id, s.label]));

export const SOURCES = [
  "LinkedIn",
  "Referral",
  "Company site",
  "Job board",
  "Recruiter outreach",
  "Other",
];
