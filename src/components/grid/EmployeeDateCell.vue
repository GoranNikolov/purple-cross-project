<script setup lang="ts">
import { computed } from "vue";
import type { Employee } from "@/types/employee";
import {
  formatDate,
  formatEmploymentDate,
  formatTerminationDate,
} from "@/utils/dateStatus";

const props = defineProps<{
  row: Employee;
  mode: "employment" | "termination";
}>();

const primaryLabel = computed(() =>
  props.mode === "employment"
    ? formatEmploymentDate(props.row)
    : formatTerminationDate(props.row),
);

const secondaryLabel = computed(() => {
  const value =
    props.mode === "employment"
      ? props.row.dateOfEmployment
      : props.row.terminationDate;

  return value ? formatDate(value) : null;
});
</script>

<template>
  <div class="flex flex-col">
    <span>{{ primaryLabel }}</span>
    <span
      v-if="secondaryLabel"
      class="text-xs text-slate-500 dark:text-slate-400 mt-0.5"
    >
      {{ secondaryLabel }}
    </span>
  </div>
</template>
