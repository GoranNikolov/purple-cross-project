<script setup lang="ts">
import { ref } from "vue";
import { useEmployeesStore } from "@/stores/employees";
import { employeeGridConfig } from "@/config/grid/employeeGridColumns";
import DataGrid from "@/components/DataGrid.vue";
import Dialog from "@/components/ui/Dialog.vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
import BaseButton from "@/components/ui/button/BaseButton.vue";

import {
  formatDate,
  formatEmploymentDate,
  formatTerminationDate,
} from "@/utils/dateStatus";
import type { Employee } from "@/types/employee";

const store = useEmployeesStore();

const formOpen = ref(false);
const formMode = ref<"create" | "edit">("create");
const formInitialValues = ref<Employee | undefined>(undefined);
const formError = ref<string | null>(null);
const viewOpen = ref(false);
const viewEmployee = ref<Employee | null>(null);
const confirmOpen = ref(false);
const pendingDelete = ref<Employee | null>(null);

function openCreate() {
  formMode.value = "create";
  formInitialValues.value = undefined;
  formError.value = null;
  formOpen.value = true;
}

function openEdit(employee: Employee) {
  formMode.value = "edit";
  formInitialValues.value = employee;
  formError.value = null;
  formOpen.value = true;
}

function closeForm() {
  formOpen.value = false;
}

function handleFormSubmit(values: Employee) {
  formError.value = null;
  try {
    if (formMode.value === "create") {
      store.create(values);
    } else {
      store.update(values.code, values);
    }
    formOpen.value = false;
  } catch (err) {
    formError.value =
      err instanceof Error ? err.message : "Something went wrong";
  }
}

function openView(employee: Employee) {
  viewEmployee.value = employee;
  viewOpen.value = true;
}

function requestDelete(employee: Employee) {
  pendingDelete.value = employee;
  confirmOpen.value = true;
}

function confirmDelete() {
  if (pendingDelete.value) store.remove(pendingDelete.value.code);
  confirmOpen.value = false;
  pendingDelete.value = null;
}
</script>

<template>
  <div class="h-full flex flex-col gap-4">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <h1 class="text-xl font-semibold">Employees</h1>
    </div>

    <div class="flex-1 overflow-hidden">
      <DataGrid
        :rows="store.employees"
        :config="
          employeeGridConfig({
            onView: openView,
            onEdit: openEdit,
            onDelete: requestDelete,
          })
        "
      />
    </div>

    <div class="w-full flex justify-end mt-auto shrink-0">
      <BaseButton
        variant="primary"
        class="w-full sm:w-auto shadow-md"
        @click="openCreate"
      >
        + Create Employee
      </BaseButton>
    </div>

    <!-- Create / Edit -->
    <Dialog
      :open="formOpen"
      :title="
        formMode === 'create'
          ? 'Create Employee'
          : `Edit ${formInitialValues?.fullName}`
      "
      hide-footer
      max-width="max-w-lg"
      @cancel="closeForm"
    >
      <div
        v-if="formError"
        class="mb-4 p-3 rounded-md bg-danger-50 dark:bg-danger-500/10 text-danger-600 dark:text-danger-400 text-sm"
      >
        {{ formError }}
      </div>
      <EmployeeForm
        :mode="formMode"
        :initial-values="formInitialValues"
        @submit="handleFormSubmit"
        @cancel="closeForm"
      />
    </Dialog>

    <!-- View profile -->
    <Dialog
      :open="viewOpen"
      :title="viewEmployee?.fullName ?? ''"
      hide-footer
      max-width="max-w-md"
      @cancel="viewOpen = false"
    >
      <p
        v-if="viewEmployee"
        class="text-sm text-slate-500 dark:text-slate-400 mb-2"
      >
        {{ viewEmployee.code }}
      </p>
      <dl v-if="viewEmployee" class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt class="text-slate-500 dark:text-slate-400">Occupation</dt>
          <dd class="font-medium">{{ viewEmployee.occupation }}</dd>
        </div>
        <div>
          <dt class="text-slate-500 dark:text-slate-400">Department</dt>
          <dd class="font-medium">{{ viewEmployee.department }}</dd>
        </div>
        <div>
          <dt class="text-slate-500 dark:text-slate-400">Date of Employment</dt>
          <dd class="font-medium">
            <div>{{ formatEmploymentDate(viewEmployee) }}</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {{ formatDate(viewEmployee.dateOfEmployment) }}
            </div>
          </dd>
        </div>
        <div>
          <dt class="text-slate-500 dark:text-slate-400">Termination Date</dt>
          <dd class="font-medium">
            <template v-if="viewEmployee.terminationDate">
              <div>{{ formatTerminationDate(viewEmployee) }}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {{ formatDate(viewEmployee.terminationDate) }}
              </div>
            </template>
            <template v-else>—</template>
          </dd>
        </div>
      </dl>
      <div class="flex justify-end gap-2 mt-6">
        <BaseButton variant="ghost" size="sm" @click="viewOpen = false"
          >Cancel</BaseButton
        >
        <BaseButton
          variant="primary"
          size="sm"
          @click="
            viewOpen = false;
            openEdit(viewEmployee!);
          "
          >Edit</BaseButton
        >
      </div>
    </Dialog>

    <!-- Delete -->
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
      @cancel="
        confirmOpen = false;
        pendingDelete = null;
      "
    />
  </div>
</template>
