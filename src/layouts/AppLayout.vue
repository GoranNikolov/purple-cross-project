<script setup lang="ts">
import { ref } from "vue";
import { useThemeStore } from "@/stores/theme";
import { getNavItems } from "@/config/navigation";
import BaseButton from "@/components/ui/button/BaseButton.vue";

const themeStore = useThemeStore();
const navItems = getNavItems();
const sidebarOpen = ref(true);
</script>

<template>
  <div
    class="h-screen overflow-hidden bg-surface-light-alt dark:bg-surface-dark text-slate-900 dark:text-slate-100"
  >
    <!-- Header -->
    <header
      class="fixed top-0 left-0 right-0 h-14 z-20 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700 bg-surface-light dark:bg-surface-dark-alt"
    >
      <div class="flex items-center gap-3">
        <button
          class="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
          @click="sidebarOpen = !sidebarOpen"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon :icon="['fas', 'bars']" />
        </button>
        <span class="font-semibold text-primary-700 dark:text-primary-300"
          >Purple Cross</span
        >
      </div>

      <BaseButton variant="ghost" size="sm" @click="themeStore.toggle()">
        <FontAwesomeIcon
          :icon="themeStore.mode === 'dark' ? ['fas', 'sun'] : ['fas', 'moon']"
          class="mr-2 transition-colors"
          :class="themeStore.mode === 'dark' ? 'text-yellow-400' : ''"
        />
        {{ themeStore.mode === "dark" ? "Light mode" : "Dark mode" }}
      </BaseButton>
    </header>

    <!-- Sidebar -->
    <aside
      class="fixed top-14 left-0 bottom-0 z-10 border-r border-slate-200 dark:border-slate-700 bg-surface-light dark:bg-surface-dark-alt transition-all overflow-hidden"
      :class="sidebarOpen ? 'w-56' : 'w-0'"
    >
      <nav class="flex flex-col gap-1 p-3">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="{ name: item.name }"
          class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/30"
          active-class="bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
        >
          {{ item.label }}
        </router-link>
      </nav>
    </aside>

    <!-- Content -->
    <main class="pt-14 transition-all h-full flex flex-col" :class="sidebarOpen ? 'pl-56' : 'pl-0'">
      <div class="p-6 flex-1 flex flex-col overflow-hidden">
        <router-view />
      </div>
    </main>
  </div>
</template>
