<script setup lang="ts">
import { useRoute } from "vue-router";
import type { NavItem } from "@/config/navigation";

defineProps<{
  items: NavItem[];
  collapsed: boolean;
}>();

const route = useRoute();

const isPathActive = (name: string) => {
  if (name === "dashboard" && route.name !== "dashboard") return false;
  return route.name === name || route.matched.some((r) => r.name === name);
};
</script>

<template>
  <div class="flex h-full flex-col justify-between py-3">
    <nav class="flex flex-col gap-1 px-3">
      <router-link
        v-for="item in items"
        :key="item.name"
        :to="{ name: item.name }"
        class="group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-50 dark:hover:bg-primary-900/30"
        :class="[
          isPathActive(item.name)
            ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
            : 'text-slate-700 dark:text-slate-300',
          collapsed ? 'justify-center' : ''
        ]"
      >
        <FontAwesomeIcon
          :icon="['fas', item.icon]"
          class="text-lg"
          :class="collapsed ? '' : 'mr-3'"
        />
        <span v-if="!collapsed" class="truncate">{{ item.label }}</span>

        <div
          v-if="collapsed"
          class="absolute left-full ml-2 invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 z-50 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white"
        >
          {{ item.label }}
        </div>
      </router-link>
    </nav>

    <div class="px-3">
      <router-link
        :to="{ name: 'settings' }"
        class="group relative flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-50 dark:hover:bg-primary-900/30"
        :class="[
          isPathActive('settings')
            ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
            : 'text-slate-700 dark:text-slate-300',
          collapsed ? 'justify-center' : ''
        ]"
      >
        <FontAwesomeIcon
          :icon="['fas', 'gear']"
          class="text-lg"
          :class="collapsed ? '' : 'mr-3'"
        />
        <span v-if="!collapsed" class="truncate">Settings</span>

        <div
          v-if="collapsed"
          class="absolute left-full ml-2 invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 z-50 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-xs text-white"
        >
          Settings
        </div>
      </router-link>
    </div>
  </div>
</template>
