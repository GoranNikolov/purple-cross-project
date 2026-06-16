import { defineStore } from "pinia";
import type { Employee } from "@/types/employee";
import rawData from "@/data/employees.json";

interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

export const useEmployeesStore = defineStore("employees", {
  state: (): EmployeesState => ({
    employees: [],
    loading: false,
    error: null,
  }),

  getters: {
    getByCode: (state) => {
      return (code: string): Employee | undefined =>
        state.employees.find((e) => e.code === code);
    },
    activeEmployees: (state): Employee[] =>
      state.employees.filter((e) => !e.terminationDate),
    count: (state): number => state.employees.length,
  },

  actions: {
    load() {
      this.loading = true;
      this.error = null;
      try {
        this.employees = rawData as Employee[];
      } catch (err) {
        this.error =
          err instanceof Error ? err.message : "Failed to load employees";
      } finally {
        this.loading = false;
      }
    },

    create(employee: Employee) {
      const exists = this.employees.some((e) => e.code === employee.code);
      if (exists) {
        throw new Error(`Employee with code "${employee.code}" already exists`);
      }
      this.employees.push(employee);
    },

    update(code: string, patch: Partial<Omit<Employee, "code">>) {
      const idx = this.employees.findIndex((e) => e.code === code);
      if (idx === -1) {
        throw new Error(`Employee with code "${code}" not found`);
      }
      this.employees[idx] = { ...this.employees[idx], ...patch };
    },

    remove(code: string) {
      const idx = this.employees.findIndex((e) => e.code === code);
      if (idx === -1) {
        throw new Error(`Employee with code "${code}" not found`);
      }
      this.employees.splice(idx, 1);
    },
  },
});
