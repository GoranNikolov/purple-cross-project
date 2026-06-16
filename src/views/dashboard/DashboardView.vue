<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useEmployeesStore } from "@/stores/employees";
import { DEPARTMENTS, OCCUPATIONS, type Employee } from "@/types/employee";
import StatCard from "@/views/dashboard/StatCard.vue";
import CategoryBreakdown from "@/views/dashboard/CategoryBreakdown.vue";
import RecentHires from "@/views/dashboard/RecentHires.vue";

const store = useEmployeesStore();

onMounted(() => {
  if (!store.employees.length) store.load();
});

const active = computed(() => store.activeEmployees);
const terminatedCount = computed(() => store.count - active.value.length);

const avgTenureYears = computed(() => {
  if (!active.value.length) return "0.0";
  const now = Date.now();
  const years = active.value.reduce((sum, e) => {
    const start = new Date(e.dateOfEmployment).getTime();
    return sum + (now - start) / (1000 * 60 * 60 * 24 * 365.25);
  }, 0);
  return (years / active.value.length).toFixed(1);
});

const departmentsRepresented = computed(
  () => new Set(active.value.map((e) => e.department)).size,
);

function buildCounts<T extends string>(
  categories: readonly T[],
  pick: (e: Employee) => T,
) {
  const counts = new Map<T, number>(categories.map((c) => [c, 0]));
  for (const e of active.value)
    counts.set(pick(e), (counts.get(pick(e)) ?? 0) + 1);
  return categories
    .map((c) => ({ label: c, count: counts.get(c) ?? 0 }))
    .sort((a, b) => b.count - a.count);
}

const departmentCounts = computed(() =>
  buildCounts(DEPARTMENTS, (e) => e.department),
);
const occupationCounts = computed(() =>
  buildCounts(OCCUPATIONS, (e) => e.occupation),
);

const recentHires = computed(() =>
  [...active.value]
    .sort(
      (a, b) =>
        new Date(b.dateOfEmployment).getTime() -
        new Date(a.dateOfEmployment).getTime(),
    )
    .slice(0, 5),
);
</script>

<template>
  <h1 class="text-xl font-semibold text-slate-900 dark:text-slate-100">
    Dashboard
  </h1>
  <p class="mt-2 text-slate-500 dark:text-slate-400">
    Overview of current headcount, distribution, and recent activity.
  </p>

  <div v-if="store.loading" class="mt-6 text-sm text-slate-400">
    Loading employees…
  </div>
  <div v-else-if="store.error" class="mt-6 text-sm text-rose-500">
    {{ store.error }}
  </div>

  <template v-else>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Employees"
        :value="store.count"
        :icon="['fas', 'users']"
        accent="sky"
      />

      <StatCard
        label="Active"
        :value="active.length"
        :hint="`${terminatedCount} terminated`"
        :icon="['fas', 'user-check']"
        accent="emerald"
      />
      <StatCard
        label="Departments Active"
        :value="departmentsRepresented"
        :hint="`of ${DEPARTMENTS.length} total`"
        :icon="['fas', 'building']"
        accent="violet"
      />
      <StatCard
        label="Avg. Tenure"
        :value="`${avgTenureYears} yrs`"
        :icon="['fas', 'clock']"
        accent="amber"
      />
    </div>

    <div class="mt-6 grid gap-4 lg:grid-cols-2">
      <CategoryBreakdown
        title="Headcount by Department"
        :items="departmentCounts"
      />
      <CategoryBreakdown
        title="Headcount by Occupation"
        :items="occupationCounts"
      />
    </div>

    <div class="mt-6">
      <RecentHires :employees="recentHires" />
    </div>
  </template>
</template>
