<script setup lang="ts">
import { ref } from "vue";
import { useEmployeesStore } from "@/stores/employees";
import { employeeGridConfig } from "@/config/grid/employeeGridColumns";
import DataGrid from "@/components/DataGrid.vue";
import RowActions from "@/components/RowActions.vue";
import Dialog from "@/components/ui/Dialog.vue";
import type { Employee } from "@/types/employee";
import type { GridConfig } from "@/types/grid";

const store = useEmployeesStore();
const mode = ref<"paged" | "infinite">("paged");
const config = (): GridConfig<Employee> => ({
  ...employeeGridConfig,
  pagination: { mode: mode.value, pageSize: 10 },
});

const confirmOpen = ref(false);
const pendingDelete = ref<Employee | null>(null);

function viewEmployee(employee: Employee) {
  window.alert(`View employee: ${employee.code}`);
}

function editEmployee(employee: Employee) {
  window.alert(`Edit employee: ${employee.code}`);
}

function requestDelete(employee: Employee) {
  pendingDelete.value = employee;
  confirmOpen.value = true;
}

function confirmDelete() {
  if (pendingDelete.value) {
    store.remove(pendingDelete.value.code);
  }
  confirmOpen.value = false;
  pendingDelete.value = null;
}

function cancelDelete() {
  confirmOpen.value = false;
  pendingDelete.value = null;
}
</script>

<template>
  <div class="h-full flex flex-col gap-4">
    <div class="flex gap-2 items-center text-sm shrink-0">
      <span class="text-slate-500">Pagination mode:</span>
      <button class="underline" @click="mode = 'paged'">paged</button>
      <button class="underline" @click="mode = 'infinite'">infinite</button>
    </div>

    <div class="h-[70vh] min-h-0 overflow-hidden">
      <DataGrid :rows="store.employees" :config="config()">
        <template #cell-actions="{ row }: { row: Employee }">
          <RowActions
            @view="() => viewEmployee(row)"
            @edit="() => editEmployee(row)"
            @delete="() => requestDelete(row)"
          />
        </template>
      </DataGrid>
    </div>

    <Dialog
      :open="confirmOpen"
      title="Delete employee"
      :message="
        pendingDelete
          ? `Are you sure you want to delete ${pendingDelete.fullName}? This cannot be undone.`
          : ''
      "
      confirm-label="Delete"
      variant="danger"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
