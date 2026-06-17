<script setup lang="ts">
import { DEPARTMENTS, OCCUPATIONS } from "@/types/employee";
import DateInput from "@/components/ui/DateInput.vue";

defineProps<{
  status: "All" | "Active" | "Terminated";
  department: string;
  occupation: string;
  dateFrom: string | null;
  dateTo: string | null;
}>();

const emit = defineEmits<{
  "update:status": ["All" | "Active" | "Terminated"];
  "update:department": [string];
  "update:occupation": [string];
  "update:dateFrom": [string | null];
  "update:dateTo": [string | null];
  reset: [];
}>();
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark overflow-hidden"
  >
    <div
      class="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center"
    >
      <div>
        <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Export Filters
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Narrow down which employees to export
        </p>
      </div>
      <button
        class="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        @click="$emit('reset')"
      >
        Reset Filters
      </button>
    </div>

    <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Status -->
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-slate-700 dark:text-slate-300">
          Status
        </label>
        <select
          :value="status"
          @change="
            $emit(
              'update:status',
              ($event.target as HTMLSelectElement).value as any,
            )
          "
          class="w-full text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="All">All Employees</option>
          <option value="Active">Active Only</option>
          <option value="Terminated">Terminated Only</option>
        </select>
      </div>

      <!-- Department -->
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-slate-700 dark:text-slate-300">
          Department
        </label>
        <select
          :value="department"
          @change="
            $emit(
              'update:department',
              ($event.target as HTMLSelectElement).value,
            )
          "
          class="w-full text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="All">All Departments</option>
          <option v-for="dept in DEPARTMENTS" :key="dept" :value="dept">
            {{ dept }}
          </option>
        </select>
      </div>

      <!-- Occupation -->
      <div class="space-y-1.5">
        <label class="text-xs font-medium text-slate-700 dark:text-slate-300">
          Occupation
        </label>
        <select
          :value="occupation"
          @change="
            $emit(
              'update:occupation',
              ($event.target as HTMLSelectElement).value,
            )
          "
          class="w-full text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="All">All Occupations</option>
          <option v-for="occ in OCCUPATIONS" :key="occ" :value="occ">
            {{ occ }}
          </option>
        </select>
      </div>

      <!-- Date Range -->
      <div class="col-span-1 md:col-span-2 lg:col-span-1 space-y-1.5">
        <label class="text-xs font-medium text-slate-700 dark:text-slate-300">
          Employed Between
        </label>
        <div class="flex gap-2">
          <DateInput
            :model-value="dateFrom"
            @update:model-value="$emit('update:dateFrom', $event)"
            placeholder="From"
          />
          <DateInput
            :model-value="dateTo"
            @update:model-value="$emit('update:dateTo', $event)"
            placeholder="To"
          />
        </div>
      </div>
    </div>
  </div>
</template>
