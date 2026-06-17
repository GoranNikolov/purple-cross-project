<script setup lang="ts">
import { ref } from "vue";

const dragOver = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const uploadError = ref<string | null>(null);

const emit = defineEmits<{
  fileSelected: [file: File];
}>();

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) validateAndEmit(file);
  if (fileInput.value) fileInput.value.value = "";
}

function handleDrop(event: DragEvent) {
  dragOver.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) validateAndEmit(file);
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
  dragOver.value = true;
}

function handleDragLeave() {
  dragOver.value = false;
}

function validateAndEmit(file: File) {
  uploadError.value = null;
  if (!file.name.endsWith(".csv")) {
    uploadError.value = "Please upload a CSV file (.csv)";
    return;
  }
  emit("fileSelected", file);
}

defineExpose({ uploadError });
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark overflow-hidden"
  >
    <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50">
      <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
        Step 1 — Upload CSV File
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
        Drag & drop your CSV file or click to browse
      </p>
    </div>

    <div class="p-6">
      <input
        ref="fileInput"
        type="file"
        accept=".csv"
        class="hidden"
        @change="handleFileSelected"
      />

      <div
        class="relative flex flex-col items-center justify-center gap-3 py-12 px-6 rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer"
        :class="{
          'border-primary-400 bg-primary-50/50 dark:bg-primary-500/5 dark:border-primary-500':
            dragOver,
          'border-slate-300 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-slate-50/50 dark:hover:bg-slate-800/30':
            !dragOver,
        }"
        @click="triggerFileInput"
        @drop.prevent="handleDrop"
        @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
      >
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-200"
          :class="{
            'bg-primary-100 dark:bg-primary-500/20': dragOver,
            'bg-slate-100 dark:bg-slate-700': !dragOver,
          }"
        >
          <font-awesome-icon
            icon="cloud-arrow-up"
            class="text-2xl transition-colors duration-200"
            :class="{
              'text-primary-500': dragOver,
              'text-slate-400 dark:text-slate-500': !dragOver,
            }"
          />
        </div>
        <div class="text-center">
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300">
            <span class="text-primary-600 dark:text-primary-400 underline">
              Click to upload
            </span>
            or drag and drop
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
            CSV files only
          </p>
        </div>
      </div>

      <p
        v-if="uploadError"
        class="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
      >
        <font-awesome-icon icon="circle-exclamation" class="text-xs" />
        {{ uploadError }}
      </p>
    </div>
  </div>
</template>
