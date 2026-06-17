<script setup lang="ts">
import { ref } from "vue";
import { getNavItems } from "@/config/navigation";
import Navigation from "@/components/Navigation.vue";
import AppHeader from "@/components/Header.vue";

const navItems = getNavItems();
const sidebarOpen = ref(true);
</script>

<template>
  <div
    class="h-screen overflow-hidden bg-[#f8f7ff] dark:bg-surface-dark text-slate-900 dark:text-slate-100 transition-colors duration-200"
  >
    <!-- Header -->
    <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <!-- Sidebar -->
    <aside
      class="fixed top-14 left-0 bottom-0 z-10 border-r border-slate-200 dark:border-slate-700 bg-[#f6f3ff] dark:bg-surface-dark-alt transition-all overflow-visible"
      :class="sidebarOpen ? 'w-56' : 'w-16'"
    >
      <Navigation :items="navItems" :collapsed="!sidebarOpen" />
    </aside>

    <!-- Content -->
    <main
      class="pt-14 transition-all h-full flex flex-col"
      :class="sidebarOpen ? 'pl-56' : 'pl-16'"
    >
      <div class="p-6 flex-1 flex flex-col overflow-y-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>
