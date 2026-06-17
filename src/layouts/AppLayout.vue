<script setup lang="ts">
import { computed } from "vue";
import Navigation from "@/components/navigation/Navigation.vue";
import AppHeader from "@/components/header/Header.vue";
import MobileHeader from "@/components/header/MobileHeader.vue";
import MobileNavigation from "@/components/navigation/MobileNavigation.vue";
import { useBreakpoint } from "@/composables/useBreakpoint";
import { getNavItems } from "@/config/navigation";

const navItems = getNavItems();

const { width, isMobile } = useBreakpoint();

const sidebarOpen = computed(() => width.value >= 768);
</script>

<template>
  <div
    class="h-screen overflow-hidden bg-[#f8f7ff] dark:bg-surface-dark text-slate-900 dark:text-slate-100 transition-colors duration-200"
  >
    <template v-if="isMobile">
      <MobileHeader :items="navItems" />

      <main class="pt-4 pb-16 h-full overflow-y-auto">
        <div class="p-4 flex flex-col">
          <router-view />
        </div>
      </main>

      <MobileNavigation :items="navItems" />
    </template>

    <template v-else>
      <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />

      <aside
        class="fixed top-14 left-0 bottom-0 z-10 border-r border-slate-200 dark:border-slate-700 bg-[#f6f3ff] dark:bg-surface-dark-alt transition-all overflow-visible"
        :class="sidebarOpen ? 'w-56' : 'w-16'"
      >
        <Navigation :items="navItems" :collapsed="!sidebarOpen" />
      </aside>

      <main
        class="pt-14 transition-all h-full flex flex-col"
        :class="sidebarOpen ? 'pl-56' : 'pl-16'"
      >
        <div class="p-6 flex-1 flex flex-col overflow-y-auto">
          <router-view />
        </div>
      </main>
    </template>
  </div>
</template>
