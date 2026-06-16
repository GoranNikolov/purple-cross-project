import { useEmployeesStore } from "@/stores/employees";

export function initEmployees(): void {
  const employeesStore = useEmployeesStore();
  employeesStore.load();
}
