<script setup lang="ts">
const subRoutes = [
  { name: "playground-buttons", label: "Buttons" },
  { name: "playground-grid", label: "Grid / Inputs" },
  { name: "playground-forms", label: "Forms" },
];
</script>

<template>
  <div>
    <div class="border-2 border-dashed border-amber-400 rounded-lg p-4 mb-4">
      <p class="text-amber-600 dark:text-amber-400 text-sm font-semibold">
        <FontAwesomeIcon :icon="['fas', 'triangle-exclamation']" />
        Dev-only Playground — not present in production builds
      </p>
    </div>

    <nav
      class="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700"
    >
      <router-link
        v-for="r in subRoutes"
        :key="r.name"
        :to="{ name: r.name }"
        class="px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:text-primary-600"
        active-class="border-primary-600 text-primary-600 dark:text-primary-300"
      >
        {{ r.label }}
      </router-link>
    </nav>

    <router-view />
  </div>
</template>
