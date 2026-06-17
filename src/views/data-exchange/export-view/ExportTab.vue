<script setup lang="ts">
import { ref, computed } from "vue";
import { useEmployeesStore } from "@/stores/employees";
import {
  exportEmployeesAsCSV,
  exportEmployeesAsJSON,
} from "@/utils/employeeIO";
import { employeeGridConfig } from "@/config/grid/employeeGridColumns";
import ExportFilters from "./ExportFilters.vue";
import ExportActions from "./ExportActions.vue";
import ExportPreview from "./ExportPreview.vue";

const store = useEmployeesStore();

// ── Filters ──
const filterStatus = ref<"All" | "Active" | "Terminated">("All");
const filterDepartment = ref<string>("All");
const filterOccupation = ref<string>("All");
const filterDateFrom = ref<string | null>(null);
const filterDateTo = ref<string | null>(null);

// ── Filtered Data ──
const filteredEmployees = computed(() => {
  return store.employees.filter((emp) => {
    // Status
    if (filterStatus.value === "Active" && emp.terminationDate) return false;
    if (filterStatus.value === "Terminated" && !emp.terminationDate)
      return false;

    // Department & Occupation
    if (
      filterDepartment.value !== "All" &&
      emp.department !== filterDepartment.value
    )
      return false;
    if (
      filterOccupation.value !== "All" &&
      emp.occupation !== filterOccupation.value
    )
      return false;

    // Date Range (Date of Employment)
    const empDate = new Date(emp.dateOfEmployment);
    if (filterDateFrom.value) {
      if (empDate < new Date(filterDateFrom.value)) return false;
    }
    if (filterDateTo.value) {
      if (empDate > new Date(filterDateTo.value)) return false;
    }

    return true;
  });
});

// Configure grid for pure view/export, stripping actions/edit handlers
const previewGridConfig = employeeGridConfig({
  onView: () => {},
  onEdit: () => {},
  onDelete: () => {},
});
// Remove "Actions" column
previewGridConfig.columns = previewGridConfig.columns.filter(
  (c) => c.key !== "actions",
);
// Use smaller page size for preview
previewGridConfig.pagination = { mode: "paged", pageSize: 5 };

// ── Export Actions ──
function doExportCSV() {
  exportEmployeesAsCSV(filteredEmployees.value);
}

function doExportJSON() {
  exportEmployeesAsJSON(filteredEmployees.value);
}

function resetFilters() {
  filterStatus.value = "All";
  filterDepartment.value = "All";
  filterOccupation.value = "All";
  filterDateFrom.value = null;
  filterDateTo.value = null;
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Filters -->
    <ExportFilters
      :status="filterStatus"
      :department="filterDepartment"
      :occupation="filterOccupation"
      :date-from="filterDateFrom"
      :date-to="filterDateTo"
      @update:status="filterStatus = $event"
      @update:department="filterDepartment = $event"
      @update:occupation="filterOccupation = $event"
      @update:date-from="filterDateFrom = $event"
      @update:date-to="filterDateTo = $event"
      @reset="resetFilters"
    />

    <!-- Export Actions -->
    <ExportActions
      :employee-count="filteredEmployees.length"
      @export-csv="doExportCSV"
      @export-json="doExportJSON"
    />

    <!-- Data Preview -->
    <ExportPreview :rows="filteredEmployees" :config="previewGridConfig" />
  </div>
</template>
