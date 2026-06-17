<script setup lang="ts">
import { useRoute } from "vue-router";
import type { NavItem } from "@/config/navigation";

const props = defineProps<{
  items: NavItem[];
}>();

const route = useRoute();

const isPathActive = (name: string) => {
  if (name === "dashboard" && route.name !== "dashboard") return false;
  return route.name === name || route.matched.some((r) => r.name === name);
};

const allItems = [
  ...props.items,
  { name: "settings", label: "Settings", icon: "gear" },
];
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-20 flex items-stretch justify-between border-t border-slate-200 dark:border-slate-700 bg-[#f9f8ff] dark:bg-surface-dark-alt pb-[env(safe-area-inset-bottom)] transition-colors duration-200"
  >
    <router-link
      v-for="item in allItems"
      :key="item.name"
      :to="{ name: item.name }"
      class="flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors"
      :class="
        isPathActive(item.name)
          ? 'text-primary-700 dark:text-primary-300'
          : 'text-slate-500 dark:text-slate-400'
      "
    >
      <FontAwesomeIcon :icon="['fas', item.icon]" class="text-lg" />
      <span class="truncate">{{ item.label }}</span>
    </router-link>
  </nav>
</template>
