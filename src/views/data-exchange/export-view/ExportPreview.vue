<script setup lang="ts">
import DataGrid from "@/components/grid/DataGrid.vue";
import type { Employee } from "@/types/employee";

defineProps<{
  rows: Employee[];
  config: any;
}>();
</script>

<template>
  <div class="flex-1 flex flex-col min-h-0">
    <h3
      class="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2"
    >
      <font-awesome-icon icon="table" class="text-slate-400" />
      Data Preview
    </h3>
    <div class="flex-1 h-[400px]">
      <DataGrid :rows="rows" :config="config" />
    </div>
  </div>
</template>
