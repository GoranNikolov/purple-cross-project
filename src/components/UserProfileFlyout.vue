<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const showFlyout = ref(false);

const toggleFlyout = () => {
  showFlyout.value = !showFlyout.value;
};
</script>

<template>
  <div class="relative hidden sm:block pr-4 border-r border-slate-200 dark:border-slate-700">
    <button 
      @click="toggleFlyout" 
      class="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-md transition-colors"
    >
      <FontAwesomeIcon :icon="['fas', 'user-circle']" class="text-2xl text-slate-400 dark:text-slate-500" />
      <span class="text-sm font-medium">{{ userStore.name }}</span>
    </button>

    <!-- Flyout Menu -->
    <div 
      v-if="showFlyout" 
      class="absolute right-0 top-full mt-2 w-48 bg-surface-light dark:bg-surface-dark-alt border border-slate-200 dark:border-slate-700 rounded-md shadow-lg py-1 z-50"
    >
      <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
        <p class="text-sm font-semibold truncate">{{ userStore.name }}</p>
        <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ userStore.email }}</p>
      </div>
      <div class="px-4 py-2">
        <div class="flex justify-between items-center text-sm">
          <span class="text-slate-500 dark:text-slate-400">Role</span>
          <span class="font-medium px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs">
            {{ userStore.role }}
          </span>
        </div>
      </div>
      <div class="px-4 py-2 border-t border-slate-100 dark:border-slate-700">
        <button 
          @click="$router.push('/login')" 
          class="flex items-center gap-2 w-full text-left text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          <FontAwesomeIcon :icon="['fas', 'arrow-right-from-bracket']" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Flyout Backdrop -->
  <div 
    v-if="showFlyout" 
    @click="showFlyout = false" 
    class="fixed inset-0 z-40 bg-transparent"
  ></div>
</template>
