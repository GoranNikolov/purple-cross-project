<script setup lang="ts">
import { useThemeStore } from "@/stores/theme";
import BaseButton from "@/components/ui/button/BaseButton.vue";
import UserProfileFlyout from "@/components/UserProfileFlyout.vue";

defineEmits<{
  (e: "toggle-sidebar"): void;
}>();

const themeStore = useThemeStore();
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 h-14 z-20 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700 bg-[#f9f8ff] dark:bg-surface-dark-alt transition-colors duration-200"
  >
    <div class="flex items-center gap-3">
      <button
        class="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
        @click="$emit('toggle-sidebar')"
        aria-label="Toggle sidebar"
      >
        <FontAwesomeIcon :icon="['fas', 'bars']" />
      </button>
      <span class="font-semibold text-primary-700 dark:text-primary-300">
        Purple Cross
      </span>
    </div>

    <div class="flex items-center gap-4">
      <!-- User Info & Flyout -->
      <UserProfileFlyout />

      <!-- Theme Toggle -->
      <BaseButton variant="ghost" size="sm" @click="themeStore.toggle()">
        <FontAwesomeIcon
          :icon="themeStore.mode === 'dark' ? ['fas', 'sun'] : ['fas', 'moon']"
          class="mr-2 transition-colors"
          :class="themeStore.mode === 'dark' ? 'text-yellow-400' : ''"
        />
        {{ themeStore.mode === "dark" ? "Light mode" : "Dark mode" }}
      </BaseButton>
    </div>
  </header>
</template>
