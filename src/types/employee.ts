export interface Employee {
  code: string;
  fullName: string;
  occupation: Occupation;
  department: Department;
  dateOfEmployment: string; // ISO date string
  terminationDate: string | null;
}

// Used by the create/edit form — same shape, code is editable on create
// but should be treated as read-only once an employee exists.
export type EmployeeFormData = Omit<Employee, "code"> & {
  code: string;
};

export const OCCUPATIONS = [
  "IT Support",
  "Production Supervisor",
  "Pharmacist",
  "Chemist",
  "Lab Technician",
  "HR Specialist",
  "Accountant",
  "Sales Executive",
] as const;

export type Occupation = (typeof OCCUPATIONS)[number];

export const DEPARTMENTS = [
  "Research",
  "IT",
  "Logistics",
  "Quality Assurance",
  "Finance",
  "Human Resources",
  "Production",
  "Sales",
] as const;

export type Department = (typeof DEPARTMENTS)[number];
