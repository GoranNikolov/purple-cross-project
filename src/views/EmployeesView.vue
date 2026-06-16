<script setup lang="ts">
import { useEmployeesStore } from "@/stores/employees";

const store = useEmployeesStore();
</script>

<template>
  <h1 class="text-xl font-semibold">Employees</h1>
  <p class="text-slate-500 dark:text-slate-400 mt-2">
    {{ store.count }} employees loaded.
  </p>
  <p class="text-slate-500 dark:text-slate-400">
    {{ store.activeEmployees.length }} currently active.
  </p>
</template>
