<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
</script>

<template>
  <div
    class="min-h-screen bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-slate-100 p-8"
  >
    <button
      @click="themeStore.toggle()"
      class="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
    >
      Toggle theme (currently: {{ themeStore.mode }})
    </button>

    <p class="mt-4">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>
</template>
