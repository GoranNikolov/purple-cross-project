<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
  hint?: string;
  icon: [string, string];
  accent?: "sky" | "emerald" | "amber" | "violet";
}>();

const accentClasses: Record<string, string> = {
  sky: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
  emerald:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  violet:
    "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
};
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
  >
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ label }}</p>
        <p
          class="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100"
        >
          {{ value }}
        </p>
        <p v-if="hint" class="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {{ hint }}
        </p>
      </div>
      <div
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
        :class="accentClasses[accent ?? 'sky']"
      >
        <FontAwesomeIcon :icon="icon" class="h-4 w-4" />
      </div>
    </div>
  </div>
</template>
