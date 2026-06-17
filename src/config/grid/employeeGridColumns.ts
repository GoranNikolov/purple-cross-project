import type { GridConfig } from "@/types/grid";
import type { Employee } from "@/types/employee";
import EmployeeDateCell from "@/components/grid/EmployeeDateCell.vue";
import EmployeeActionsCell from "@/components/grid/EmployeeActionsCell.vue";
import {
  formatEmploymentDate,
  formatTerminationDate,
} from "@/utils/dateStatus";

export interface EmployeeGridHandlers {
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export const employeeGridConfig = (
  handlers: EmployeeGridHandlers,
): GridConfig<Employee> => ({
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
      component: EmployeeDateCell,
      componentProps: (row) => ({
        row,
        mode: "employment",
      }),
      formatter: formatEmploymentDate,
    },
    {
      key: "terminationDate",
      label: "Termination Date",
      sortable: true,
      component: EmployeeDateCell,
      componentProps: (row) => ({
        row,
        mode: "termination",
      }),
      formatter: formatTerminationDate,
    },
    {
      key: "actions",
      label: "Actions",
      component: EmployeeActionsCell,
      componentProps: (row) => ({
        row,
        onView: () => handlers.onView(row),
        onEdit: () => handlers.onEdit(row),
        onDelete: () => handlers.onDelete(row),
      }),
    },
  ],
  enableGrouping: true,
  pagination: { mode: "paged", pageSize: 10 },
});
