<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  items: { label: string; count: number }[];
}>();

const total = computed(() =>
  props.items.reduce((sum, item) => sum + item.count, 0),
);

const palette = [
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-fuchsia-500",
  "bg-lime-500",
];

function percent(count: number) {
  return total.value ? Math.round((count / total.value) * 100) : 0;
}
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
  >
    <h2 class="text-sm font-medium text-slate-900 dark:text-slate-100">
      {{ title }}
    </h2>
    <ul class="mt-4 space-y-3">
      <li v-for="(item, i) in items" :key="item.label">
        <div class="flex items-center justify-between text-sm">
          <span class="text-slate-600 dark:text-slate-300">{{
            item.label
          }}</span>
          <span class="text-slate-400 dark:text-slate-500">{{
            item.count
          }}</span>
        </div>
        <div
          class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
        >
          <div
            class="h-full rounded-full transition-all"
            :class="palette[i % palette.length]"
            :style="{ width: percent(item.count) + '%' }"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
