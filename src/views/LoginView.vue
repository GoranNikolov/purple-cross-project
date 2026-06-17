<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import BaseButton from "@/components/ui/button/BaseButton.vue";

const router = useRouter();
const userStore = useUserStore();
const name = ref(userStore.name);

const handleLogin = () => {
  userStore.saveProfile({ name: name.value });
  router.push("/");
};
</script>

<template>
  <div 
    class="flex items-center justify-center px-4 transition-colors w-full bg-surface-light-alt dark:bg-surface-dark" 
    style="min-height: 100vh;"
  >
    <div class="max-w-lg w-full bg-surface-light dark:bg-surface-dark-alt p-10 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition-colors">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-6">Welcome Back</h1>
        <p class=" text-slate-500 dark:text-slate-400 text-lg mb-6">Enter your name to access the dashboard</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6 flex flex-col items-center ">
        <div class="w-full text-center">
          <input 
            type="text" 
            v-model="name" 
            required
            class="w-full max-w-sm mx-auto text-center px-4 py-3 text-lg bg-surface-light dark:bg-surface-dark border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900 dark:text-slate-100 transition-colors"
            placeholder="e.g. John Doe"
          />
        </div>

        <BaseButton type="submit" variant="primary" class="w-full max-w-sm justify-center text-lg py-3">
          Log in
        </BaseButton>
      </form>
    </div>
  </div>
</template>