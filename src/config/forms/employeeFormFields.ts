import type { FormConfig } from "@/types/form";
import type { Employee } from "@/types/employee";
import { OCCUPATIONS, DEPARTMENTS } from "@/types/employee";

export const employeeFormConfig: FormConfig<Employee> = {
  fields: [
    {
      key: "code",
      label: "Employee Code",
      type: "text",
      placeholder: "e.g. EMP051",
      disabled: (mode) => mode === "edit",
    },
    {
      key: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "e.g. Jane Doe",
    },
    {
      key: "occupation",
      label: "Occupation",
      type: "select",
      options: OCCUPATIONS,
    },
    {
      key: "department",
      label: "Department",
      type: "select",
      options: DEPARTMENTS,
    },
    { key: "dateOfEmployment", label: "Date of Employment", type: "date" },
    {
      key: "terminationDate",
      label: "Termination Date (optional)",
      type: "date",
    },
  ],
};
