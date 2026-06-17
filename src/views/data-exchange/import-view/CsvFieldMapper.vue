<script setup lang="ts">
import { computed } from "vue";
import { EMPLOYEE_FIELDS, applyMapping } from "@/utils/csvImport";
import BaseButton from "@/components/ui/button/BaseButton.vue";

const props = defineProps<{
  fileName: string;
  csvHeaders: string[];
  csvRows: string[][];
  fieldMapping: Record<string, string>;
  mappingComplete: boolean;
}>();

const emit = defineEmits<{
  cancel: [];
  import: [];
  "update:fieldMapping": [mapping: Record<string, string>];
}>();

const requiredFields = [
  "code",
  "fullName",
  "occupation",
  "department",
  "dateOfEmployment",
];

const mappedPreview = computed(() => {
  if (props.csvRows.length === 0) return [];
  return applyMapping(
    props.csvRows.slice(0, 5),
    props.csvHeaders,
    props.fieldMapping,
  );
});

function updateMapping(fieldKey: string, csvHeader: string) {
  const updated = { ...props.fieldMapping };
  if (csvHeader) {
    updated[fieldKey] = csvHeader;
  } else {
    delete updated[fieldKey];
  }
  emit("update:fieldMapping", updated);
}
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark overflow-hidden"
  >
    <div
      class="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between flex-wrap gap-2"
    >
      <div>
        <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Step 2 — Map CSV Columns to Employee Fields
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          <font-awesome-icon icon="file-csv" class="mr-1" />
          {{ fileName }} — {{ csvRows.length }} row{{
            csvRows.length !== 1 ? "s" : ""
          }}
          detected
        </p>
      </div>
      <BaseButton variant="ghost" size="sm" @click="emit('cancel')">
        <template #icon-left>
          <font-awesome-icon icon="xmark" class="mr-1 text-xs" />
        </template>
        Cancel
      </BaseButton>
    </div>

    <div class="p-6 space-y-6">
      <!-- Mapping grid -->
      <div class="grid gap-3">
        <div
          v-for="field in EMPLOYEE_FIELDS"
          :key="field.key"
          class="grid grid-cols-[1fr,auto,1fr] items-center gap-3 py-2 px-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/30"
        >
          <!-- System field -->
          <div class="flex items-center gap-2">
            <span
              class="text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              {{ field.label }}
            </span>
            <span
              v-if="requiredFields.includes(field.key)"
              class="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300"
            >
              Required
            </span>
          </div>

          <!-- Arrow -->
          <font-awesome-icon
            icon="arrow-right"
            class="text-xs text-slate-400 dark:text-slate-500"
          />

          <!-- CSV column dropdown -->
          <select
            :value="fieldMapping[field.key] ?? ''"
            class="w-full text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all"
            @change="
              updateMapping(
                field.key,
                ($event.target as HTMLSelectElement).value,
              )
            "
          >
            <option value="">— Skip (do not map) —</option>
            <option v-for="h in csvHeaders" :key="h" :value="h">
              {{ h }}
            </option>
          </select>
        </div>
      </div>

      <!-- Live preview -->
      <div v-if="mappedPreview.length > 0">
        <h3
          class="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2"
        >
          Preview (first {{ Math.min(5, csvRows.length) }} rows)
        </h3>
        <div
          class="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700"
        >
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th
                  v-for="field in EMPLOYEE_FIELDS"
                  :key="field.key"
                  class="px-3 py-2 text-left font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap"
                >
                  {{ field.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, rIdx) in mappedPreview"
                :key="rIdx"
                class="border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                :class="
                  rIdx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-800/20' : ''
                "
              >
                <td
                  v-for="field in EMPLOYEE_FIELDS"
                  :key="field.key"
                  class="px-3 py-2 text-slate-700 dark:text-slate-300 whitespace-nowrap"
                >
                  <span v-if="row[field.key as keyof typeof row]">
                    {{ row[field.key as keyof typeof row] }}
                  </span>
                  <span
                    v-else
                    class="text-slate-300 dark:text-slate-600 italic"
                  >
                    —
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex items-center justify-between pt-2">
        <p class="text-xs text-slate-500 dark:text-slate-400">
          <template v-if="mappingComplete">
            <font-awesome-icon
              icon="circle-check"
              class="text-emerald-500 mr-1"
            />
            All required fields mapped
          </template>
          <template v-else>
            <font-awesome-icon
              icon="circle-exclamation"
              class="text-amber-500 mr-1"
            />
            Map all required fields to continue
          </template>
        </p>
        <BaseButton
          variant="primary"
          size="sm"
          :disabled="!mappingComplete"
          @click="emit('import')"
        >
          <template #icon-left>
            <font-awesome-icon icon="check" class="mr-1.5 text-xs" />
          </template>
          Import {{ csvRows.length }} Row{{ csvRows.length !== 1 ? "s" : "" }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>
