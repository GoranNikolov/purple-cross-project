<script setup lang="ts">
import BaseButton from "@/components/ui/button/BaseButton.vue";

defineProps<{
  employeeCount: number;
  disabled?: boolean;
}>();

defineEmits<{
  exportCsv: [];
  exportJson: [];
}>();
</script>

<template>
  <div
    class="rounded-xl border border-primary-200 dark:border-primary-500/30 bg-primary-50/30 dark:bg-primary-500/5 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  >
    <div>
      <h2
        class="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2"
      >
        Ready to export
        <span
          class="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 text-sm font-bold"
        >
          {{ employeeCount }}
        </span>
        employee{{ employeeCount !== 1 ? "s" : "" }}
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Based on your selected filters
      </p>
    </div>

    <div class="flex gap-3">
      <BaseButton
        variant="outline"
        :disabled="disabled || employeeCount === 0"
        @click="$emit('exportJson')"
      >
        <template #icon-left>
          <font-awesome-icon icon="download" class="mr-1.5 text-xs" />
        </template>
        Export JSON
      </BaseButton>
      <BaseButton
        variant="primary"
        :disabled="disabled || employeeCount === 0"
        @click="$emit('exportCsv')"
      >
        <template #icon-left>
          <font-awesome-icon icon="file-csv" class="mr-1.5 text-sm" />
        </template>
        Export CSV
      </BaseButton>
    </div>
  </div>
</template>
