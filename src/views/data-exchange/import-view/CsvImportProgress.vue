<script setup lang="ts">
defineProps<{
  progress: number;
}>();
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark overflow-hidden"
  >
    <div class="p-6 flex flex-col items-center gap-4">
      <div
        class="w-14 h-14 rounded-full bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center"
      >
        <font-awesome-icon
          icon="spinner"
          class="text-2xl text-primary-600 dark:text-primary-400 fa-spin"
        />
      </div>
      <div class="text-center">
        <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Importing employees…
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {{ progress }}% complete
        </p>
      </div>

      <!-- Progress bar -->
      <div
        class="w-full max-w-md h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden"
      >
        <div
          class="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 ease-out"
          :style="{ width: `${progress}%` }"
        />
      </div>
    </div>
  </div>
</template>
