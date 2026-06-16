<!-- src/views/playground/GridPlayground.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { useEmployeesStore } from "@/stores/employees";
import { employeeGridConfig } from "@/config/employeeGridColumns";
import DataGrid from "@/components/DataGrid.vue";
import type { Employee } from "@/types/employee";
import type { GridConfig } from "@/types/grid";

const store = useEmployeesStore();
const mode = ref<"paged" | "infinite">("paged");

const config = (): GridConfig<Employee> => ({
  ...employeeGridConfig,
  pagination: { mode: mode.value, pageSize: 10 },
});
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2 items-center text-sm">
      <span class="text-slate-500">Pagination mode:</span>
      <button class="underline" @click="mode = 'paged'">paged</button>
      <button class="underline" @click="mode = 'infinite'">infinite</button>
    </div>

    <DataGrid :rows="store.employees" :config="config()">
      <template #cell-actions>
        <div class="flex gap-2">
          <button class="text-xs text-primary-600 hover:underline">View</button>
          <button class="text-xs text-primary-600 hover:underline">Edit</button>
          <button class="text-xs text-danger-600 hover:underline">
            Delete
          </button>
        </div>
      </template>
    </DataGrid>
  </div>
</template>
