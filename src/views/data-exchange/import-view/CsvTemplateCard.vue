<script setup lang="ts">
import { computed } from "vue";
import { generateTemplateCSV } from "@/utils/csvImport";
import { downloadDemoCSV } from "@/utils/employeeIO";
import BaseButton from "@/components/ui/button/BaseButton.vue";

const templatePreviewData = computed(() => {
  const csv = generateTemplateCSV();
  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  const rows = lines.slice(1).map((l) => l.split(","));
  return { headers, rows };
});
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark overflow-hidden"
  >
    <div
      class="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 flex items-center gap-3"
    >
      <div
        class="w-9 h-9 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center"
      >
        <font-awesome-icon
          icon="file-csv"
          class="text-primary-600 dark:text-primary-400"
        />
      </div>
      <div>
        <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
          CSV Template
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Download to see the expected format and headers
        </p>
      </div>
      <BaseButton
        variant="outline"
        size="sm"
        class="ml-auto"
        @click="downloadDemoCSV()"
      >
        <template #icon-left>
          <font-awesome-icon icon="download" class="mr-1.5 text-xs" />
        </template>
        Download Template
      </BaseButton>
    </div>

    <div class="px-6 py-4 overflow-x-auto">
      <table class="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th
              v-for="header in templatePreviewData.headers"
              :key="header"
              class="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 first:rounded-tl-md last:rounded-tr-md"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rIdx) in templatePreviewData.rows"
            :key="rIdx"
            class="border-b border-slate-100 dark:border-slate-700/50 last:border-0"
          >
            <td
              v-for="(cell, cIdx) in row"
              :key="cIdx"
              class="px-3 py-2 text-slate-700 dark:text-slate-300"
            >
              {{ cell || "—" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
