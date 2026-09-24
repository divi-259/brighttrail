import { STATUS_LABEL } from "./statuses";

const COLUMNS = [
  { key: "company", header: "Company" },
  { key: "title", header: "Job Title" },
  { key: "status", header: "Status", format: (v) => STATUS_LABEL[v] ?? v },
  { key: "appliedDate", header: "Application Date" },
  { key: "location", header: "Location" },
  { key: "salaryRange", header: "Salary Range" },
  { key: "jobUrl", header: "Job URL" },
  { key: "contactName", header: "Contact Name" },
  { key: "contactInfo", header: "Contact Email / LinkedIn" },
  { key: "source", header: "Source" },
  { key: "tags", header: "Tags", format: (v) => (Array.isArray(v) ? v.join(", ") : v ?? "") },
  { key: "notes", header: "Notes" },
];

function toRows(applications) {
  return applications.map((app) =>
    Object.fromEntries(
      COLUMNS.map(({ key, header, format }) => [header, format ? format(app[key]) : app[key] ?? ""])
    )
  );
}

function timestampedName(extension) {
  const stamp = new Date().toISOString().slice(0, 10);
  return `brighttrail-applications-${stamp}.${extension}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCSV(applications) {
  const rows = toRows(applications);
  const headers = COLUMNS.map((c) => c.header);
  const lines = [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => headers.map((h) => csvEscape(row[h])).join(",")),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, timestampedName("csv"));
}

export async function exportToExcel(applications) {
  const XLSX = await import("xlsx");
  const rows = toRows(applications);
  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: COLUMNS.map((c) => c.header),
  });
  worksheet["!cols"] = COLUMNS.map(() => ({ wch: 22 }));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
  XLSX.writeFile(workbook, timestampedName("xlsx"));
}
