import type { Employee } from "@/types/employee";

/** All employee system fields available for mapping */
export const EMPLOYEE_FIELDS: { key: keyof Employee; label: string }[] = [
  { key: "code", label: "Code" },
  { key: "fullName", label: "Full Name" },
  { key: "occupation", label: "Occupation" },
  { key: "department", label: "Department" },
  { key: "dateOfEmployment", label: "Date of Employment" },
  { key: "terminationDate", label: "Termination Date" },
];

/**
 * Parse a CSV string into rows of string arrays.
 * Handles quoted fields containing commas and newlines.
 */
export function parseCSV(text: string): {
  headers: string[];
  rows: string[][];
} {
  const lines = splitCSVLines(text);
  if (lines.length === 0) throw new Error("CSV file is empty");

  const headers = parseCSVLine(lines[0]);
  const rows = lines
    .slice(1)
    .filter((l) => l.trim())
    .map(parseCSVLine);

  return { headers, rows };
}

function splitCSVLines(text: string): string[] {
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      current += ch;
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      lines.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) lines.push(current);
  return lines;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Auto-detect the best mapping from CSV headers to Employee fields.
 * Returns a Record<employeeFieldKey, csvHeaderName>.
 */
export function autoMapHeaders(csvHeaders: string[]): Record<string, string> {
  const mapping: Record<string, string> = {};
  const lowerHeaders = csvHeaders.map((h) =>
    h.toLowerCase().replace(/[_\s-]+/g, ""),
  );

  for (const field of EMPLOYEE_FIELDS) {
    const normalizedKey = field.key.toLowerCase();
    const normalizedLabel = field.label.toLowerCase().replace(/[_\s-]+/g, "");

    const exactIdx = lowerHeaders.findIndex(
      (h) => h === normalizedKey || h === normalizedLabel,
    );

    if (exactIdx !== -1) {
      mapping[field.key] = csvHeaders[exactIdx];
    } else {
      // Try partial match
      const partialIdx = lowerHeaders.findIndex(
        (h) => h.includes(normalizedKey) || normalizedKey.includes(h),
      );
      if (partialIdx !== -1) {
        mapping[field.key] = csvHeaders[partialIdx];
      }
    }
  }

  return mapping;
}

/**
 * Apply a field mapping to parsed CSV rows and produce Employee-like objects.
 */
export function applyMapping(
  rows: string[][],
  csvHeaders: string[],
  mapping: Record<string, string>,
): Partial<Employee>[] {
  return rows.map((row) => {
    const obj: Record<string, string | null> = {};

    for (const field of EMPLOYEE_FIELDS) {
      const csvHeader = mapping[field.key];
      if (!csvHeader) {
        obj[field.key] = field.key === "terminationDate" ? null : "";
        continue;
      }
      const colIdx = csvHeaders.indexOf(csvHeader);
      if (colIdx === -1 || colIdx >= row.length) {
        obj[field.key] = field.key === "terminationDate" ? null : "";
        continue;
      }
      const val = row[colIdx].trim();
      obj[field.key] = val === "" ? null : val;
    }

    return obj as Partial<Employee>;
  });
}

/**
 * Validate that required fields are present on a mapped employee object.
 */
export function validateMappedEmployee(emp: Partial<Employee>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (!emp.code) errors.push("Missing code");
  if (!emp.fullName) errors.push("Missing full name");
  if (!emp.occupation) errors.push("Missing occupation");
  if (!emp.department) errors.push("Missing department");
  if (!emp.dateOfEmployment) errors.push("Missing date of employment");
  return { valid: errors.length === 0, errors };
}

/** Generate a demo/template CSV string */
export function generateTemplateCSV(): string {
  const headers = EMPLOYEE_FIELDS.map((f) => f.key);
  const sampleRows = [
    ["EMP001", "John Smith", "IT Support", "Research", "2024-01-15", ""],
    ["EMP002", "Jane Doe", "Pharmacist", "Production", "2023-06-01", ""],
    [
      "EMP003",
      "Bob Wilson",
      "Accountant",
      "Finance",
      "2022-03-20",
      "2024-12-31",
    ],
  ];
  return [headers.join(","), ...sampleRows.map((r) => r.join(","))].join("\n");
}
