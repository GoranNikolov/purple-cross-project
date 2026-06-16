import type { Employee } from "@/types/employee";

export function exportEmployeesAsJSON(employees: Employee[]): void {
  const blob = new Blob([JSON.stringify(employees, null, 2)], {
    type: "application/json",
  });
  downloadBlob(blob, `employees-${new Date().toISOString().slice(0, 10)}.json`);
}

export function exportEmployeesAsCSV(employees: Employee[]): void {
  const headers: (keyof Employee)[] = [
    "code",
    "fullName",
    "occupation",
    "department",
    "dateOfEmployment",
    "terminationDate",
  ];
  const rows = employees.map((e) =>
    headers.map((h) => csvEscape(e[h] ?? "")).join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  downloadBlob(blob, `employees-${new Date().toISOString().slice(0, 10)}.csv`);
}

function csvEscape(value: string | null): string {
  const str = String(value ?? "");
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseImportedJSON(text: string): Employee[] {
  const data = JSON.parse(text);
  if (!Array.isArray(data))
    throw new Error("JSON file must contain an array of employees");
  return data as Employee[];
}
