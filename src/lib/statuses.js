export const STATUSES = [
  { id: "saved", label: "Wishlist" },
  { id: "applied", label: "Applied" },
  { id: "screening", label: "Screening" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
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
