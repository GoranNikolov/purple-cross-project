<script setup lang="ts">
import { ref } from "vue";
import { useEmployeesStore } from "@/stores/employees";
import {
  parseCSV,
  autoMapHeaders,
  applyMapping,
  validateMappedEmployee,
} from "@/utils/csvImport";
import type { Employee } from "@/types/employee";

import ImportStepIndicator from "./ImportStepIndicator.vue";
import CsvTemplateCard from "./CsvTemplateCard.vue";
import CsvUploadZone from "./CsvUploadZone.vue";
import CsvFieldMapper from "./CsvFieldMapper.vue";
import CsvImportProgress from "./CsvImportProgress.vue";
import CsvImportResults from "./CsvImportResults.vue";

type Step = "upload" | "map" | "importing" | "done";

const store = useEmployeesStore();

const currentStep = ref<Step>("upload");
const steps = [
  { key: "upload", label: "Upload CSV" },
  { key: "map", label: "Map Fields" },
  { key: "done", label: "Complete" },
];

const fileName = ref<string>("");
const csvHeaders = ref<string[]>([]);
const csvRows = ref<string[][]>([]);

const fieldMapping = ref<Record<string, string>>({});

const importProgress = ref(0);
const importResults = ref<{
  imported: number;
  skipped: number;
  errors: number;
  total: number;
} | null>(null);

const uploadZoneRef = ref<InstanceType<typeof CsvUploadZone> | null>(null);

async function processFile(file: File) {
  try {
    const text = await file.text();
    const parsed = parseCSV(text);

    if (parsed.headers.length === 0) {
      if (uploadZoneRef.value)
        uploadZoneRef.value.uploadError = "CSV file has no headers";
      return;
    }
    if (parsed.rows.length === 0) {
      if (uploadZoneRef.value)
        uploadZoneRef.value.uploadError = "CSV file has no data rows";
      return;
    }

    fileName.value = file.name;
    csvHeaders.value = parsed.headers;
    csvRows.value = parsed.rows;

    fieldMapping.value = autoMapHeaders(parsed.headers);
    currentStep.value = "map";
  } catch (err) {
    if (uploadZoneRef.value) {
      uploadZoneRef.value.uploadError =
        err instanceof Error ? err.message : "Failed to parse CSV file";
    }
  }
}

async function startImport() {
  currentStep.value = "importing";
  importProgress.value = 0;

  const mapped = applyMapping(
    csvRows.value,
    csvHeaders.value,
    fieldMapping.value,
  );
  let imported = 0;
  let skipped = 0;
  let errors = 0;
  const total = mapped.length;

  for (let i = 0; i < mapped.length; i++) {
    const emp = mapped[i];
    const validation = validateMappedEmployee(emp);

    if (!validation.valid) {
      errors++;
    } else if (store.getByCode(emp.code!)) {
      skipped++;
    } else {
      try {
        store.create(emp as Employee);
        imported++;
      } catch {
        errors++;
      }
    }

    importProgress.value = Math.round(((i + 1) / total) * 100);
    if (i % 10 === 0) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  importResults.value = { imported, skipped, errors, total };
  currentStep.value = "done";
}

function resetImport() {
  currentStep.value = "upload";
  csvHeaders.value = [];
  csvRows.value = [];
  fieldMapping.value = {};
  fileName.value = "";
  importProgress.value = 0;
  importResults.value = null;
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <ImportStepIndicator :steps="steps" :currentStep="currentStep" />

    <CsvTemplateCard v-if="currentStep === 'upload'" />

    <CsvUploadZone
      v-if="currentStep === 'upload'"
      ref="uploadZoneRef"
      @fileSelected="processFile"
    />

    <CsvFieldMapper
      v-if="currentStep === 'map'"
      :fileName="fileName"
      :csvHeaders="csvHeaders"
      :csvRows="csvRows"
      v-model:fieldMapping="fieldMapping"
      :mappingComplete="
        [
          'code',
          'fullName',
          'occupation',
          'department',
          'dateOfEmployment',
        ].every((f) => fieldMapping[f])
      "
      @cancel="resetImport"
      @import="startImport"
    />

    <CsvImportProgress
      v-if="currentStep === 'importing'"
      :progress="importProgress"
    />

    <CsvImportResults
      v-if="currentStep === 'done' && importResults"
      :fileName="fileName"
      :results="importResults"
      @reset="resetImport"
    />
  </div>
</template>
