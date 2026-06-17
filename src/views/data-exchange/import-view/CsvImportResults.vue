<script setup lang="ts">
import BaseButton from "@/components/ui/button/BaseButton.vue";

defineProps<{
  fileName: string;
  results: {
    imported: number;
    skipped: number;
    errors: number;
    total: number;
  };
}>();

const emit = defineEmits<{
  reset: [];
}>();
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark overflow-hidden"
  >
    <div class="p-6 space-y-5">
      <!-- Success header -->
      <div class="flex flex-col items-center gap-3 text-center">
        <div
          class="w-14 h-14 rounded-full flex items-center justify-center"
          :class="
            results.imported > 0
              ? 'bg-emerald-50 dark:bg-emerald-500/10'
              : 'bg-amber-50 dark:bg-amber-500/10'
          "
        >
          <font-awesome-icon
            :icon="
              results.imported > 0 ? 'circle-check' : 'circle-exclamation'
            "
            class="text-2xl"
            :class="
              results.imported > 0 ? 'text-emerald-500' : 'text-amber-500'
            "
          />
        </div>
        <div>
          <h2 class="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Import Complete
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Processed {{ results.total }} rows from {{ fileName }}
          </p>
        </div>
      </div>

      <!-- Stats cards -->
      <div class="grid grid-cols-3 gap-3">
        <!-- Imported -->
        <div
          class="rounded-lg p-4 text-center border"
          :class="
            results.imported > 0
              ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/5'
              : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
          "
        >
          <p
            class="text-2xl font-bold"
            :class="
              results.imported > 0
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-400 dark:text-slate-500'
            "
          >
            {{ results.imported }}
          </p>
          <p
            class="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium"
          >
            Imported
          </p>
        </div>

        <!-- Skipped -->
        <div
          class="rounded-lg p-4 text-center border"
          :class="
            results.skipped > 0
              ? 'border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5'
              : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
          "
        >
          <p
            class="text-2xl font-bold"
            :class="
              results.skipped > 0
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-slate-400 dark:text-slate-500'
            "
          >
            {{ results.skipped }}
          </p>
          <p
            class="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium"
          >
            Skipped (duplicates)
          </p>
        </div>

        <!-- Errors -->
        <div
          class="rounded-lg p-4 text-center border"
          :class="
            results.errors > 0
              ? 'border-red-200 dark:border-red-500/30 bg-red-50/50 dark:bg-red-500/5'
              : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
          "
        >
          <p
            class="text-2xl font-bold"
            :class="
              results.errors > 0
                ? 'text-red-600 dark:text-red-400'
                : 'text-slate-400 dark:text-slate-500'
            "
          >
            {{ results.errors }}
          </p>
          <p
            class="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium"
          >
            Errors
          </p>
        </div>
      </div>

      <!-- Stacked progress bar -->
      <div class="w-full h-2 rounded-full overflow-hidden flex">
        <div
          v-if="results.imported > 0"
          class="h-full bg-emerald-500"
          :style="{
            width: `${(results.imported / results.total) * 100}%`,
          }"
        />
        <div
          v-if="results.skipped > 0"
          class="h-full bg-amber-400"
          :style="{
            width: `${(results.skipped / results.total) * 100}%`,
          }"
        />
        <div
          v-if="results.errors > 0"
          class="h-full bg-red-400"
          :style="{
            width: `${(results.errors / results.total) * 100}%`,
          }"
        />
      </div>

      <!-- Action -->
      <div class="flex justify-center pt-1">
        <BaseButton variant="primary" size="sm" @click="emit('reset')">
          Import Another File
        </BaseButton>
      </div>
    </div>
  </div>
</template>
