<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "@/components/ui/button/BaseButton.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const form = ref({
  name: userStore.name,
  email: userStore.email,
});

const handleSave = () => {
  userStore.saveProfile(form.value);
};
</script>

<template>
  <section class="bg-surface-light dark:bg-surface-dark-alt rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
    <h2 class="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2">User Profile</h2>
    
    <div class="space-y-4">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
          <FontAwesomeIcon :icon="['fas', 'user-circle']" class="text-4xl" />
        </div>
        <div>
          <BaseButton variant="secondary" size="sm">Change Avatar</BaseButton>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
          <input 
            type="text" 
            v-model="form.name" 
            class="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <input 
            type="email" 
            v-model="form.email" 
            class="w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
          <input 
            type="text" 
            :value="userStore.role" 
            disabled
            class="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-600 rounded-md cursor-not-allowed"
          />
          <p class="text-xs text-slate-500 mt-1">Roles can only be changed by super administrators.</p>
        </div>
      </div>

      <div class="pt-4 flex justify-end">
        <BaseButton variant="primary" @click="handleSave">Save Changes</BaseButton>
      </div>
    </div>
  </section>
</template>
