<script setup lang="ts">
import type { Employee } from "@/types/employee";

defineProps<{ employees: Employee[] }>();

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function isNew(iso: string) {
  const days = (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24);
  return days <= 30;
}
</script>

<template>
  <div
    class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
  >
    <h2 class="text-sm font-medium text-slate-900 dark:text-slate-100">
      Recent Hires
    </h2>
    <ul class="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
      <li
        v-for="emp in employees"
        :key="emp.code"
        class="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
      >
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          {{ initials(emp.fullName) }}
        </div>
        <div class="min-w-0 flex-1">
          <p
            class="truncate text-sm font-medium text-slate-900 dark:text-slate-100"
          >
            {{ emp.fullName }}
            <span
              v-if="isNew(emp.dateOfEmployment)"
              class="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
            >
              New
            </span>
          </p>
          <p class="truncate text-xs text-slate-500 dark:text-slate-400">
            {{ emp.occupation }} · {{ emp.department }}
          </p>
        </div>
        <span class="shrink-0 text-xs text-slate-400 dark:text-slate-500">{{
          formatDate(emp.dateOfEmployment)
        }}</span>
      </li>
      <li
        v-if="!employees.length"
        class="py-6 text-center text-sm text-slate-400 dark:text-slate-500"
      >
        No employees yet.
      </li>
    </ul>
  </div>
</template>
