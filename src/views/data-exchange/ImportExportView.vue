<script setup lang="ts">
import { ref } from "vue";
import ImportTab from "@/views/data-exchange/import-view/ImportTab.vue";
import ExportTab from "@/views/data-exchange/export-view/ExportTab.vue";

type TabMode = "import" | "export";
const activeTab = ref<TabMode>("import");
</script>

<template>
  <div class="flex flex-col gap-6 pb-8 h-full">
    <!-- Page Header & Tab Navigation -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Import / Export
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage employees data
        </p>
      </div>

      <!-- Pill Tabs -->
      <div
        class="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
      >
        <button
          class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
          :class="
            activeTab === 'import'
              ? 'bg-white dark:bg-surface-dark shadow-sm text-primary-600 dark:text-primary-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          "
          @click="activeTab = 'import'"
        >
          <font-awesome-icon icon="cloud-arrow-up" />
          Import
        </button>
        <button
          class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
          :class="
            activeTab === 'export'
              ? 'bg-white dark:bg-surface-dark shadow-sm text-primary-600 dark:text-primary-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          "
          @click="activeTab = 'export'"
        >
          <font-awesome-icon icon="download" />
          Export
        </button>
      </div>
    </div>

    <!-- Active Tab Content -->
    <div class="flex-1">
      <Transition name="fade" mode="out-in">
        <ImportTab v-if="activeTab === 'import'" />
        <ExportTab v-else-if="activeTab === 'export'" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
