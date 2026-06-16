import type { Employee } from "@/types/employee";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function isFuture(isoDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(isoDate) > today;
}

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

/**
 * Date of Employment column:
 * - future date      -> "Employed soon"
 * - past/today date  -> "Currently employed"
 */
export function formatEmploymentDate(employee: Employee): string {
  return isFuture(employee.dateOfEmployment)
    ? "Employed soon"
    : "Currently employed";
}

/**
 * Termination Date column:
 * - null              -> "Currently employed" (no termination on record)
 * - future date       -> "To be terminated"
 * - past/today date   -> "Terminated"
 */
export function formatTerminationDate(employee: Employee): string {
  if (!employee.terminationDate) return "Currently employed";
  return isFuture(employee.terminationDate) ? "To be terminated" : "Terminated";
}
