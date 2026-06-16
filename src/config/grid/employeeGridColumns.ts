import type { GridConfig } from "@/types/grid";
import type { Employee } from "@/types/employee";
import {
  formatEmploymentDate,
  formatTerminationDate,
} from "@/utils/dateStatus";

export const employeeGridConfig: GridConfig<Employee> = {
  rowKey: "code",
  columns: [
    { key: "fullName", label: "Full Name", sortable: true, filterable: true },
    {
      key: "occupation",
      label: "Occupation",
      sortable: true,
      filterable: true,
      groupable: true,
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      filterable: true,
      groupable: true,
    },
    {
      key: "dateOfEmployment",
      label: "Date of Employment",
      sortable: true,
      formatter: formatEmploymentDate,
    },
    {
      key: "terminationDate",
      label: "Status",
      sortable: true,
      formatter: formatTerminationDate,
    },
    { key: "actions", label: "Actions", component: "RowActions" },
  ],
  enableGrouping: true,
  pagination: { mode: "infinite", pageSize: 10 },
};
