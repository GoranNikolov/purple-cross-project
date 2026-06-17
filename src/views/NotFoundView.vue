<script setup lang="ts">
import { useRouter } from "vue-router";
import BaseButton from "@/components/ui/button/BaseButton.vue";

const router = useRouter();
</script>

<template>
  <section class="flex min-h-[60vh] items-center justify-center px-4">
    <div class="max-w-2xl text-center">
      <p
        class="text-sm font-semibold uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400"
      >
        404 Error
      </p>
      <h1
        class="mt-4 text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl"
      >
        This page could not be found
      </h1>
      <p class="mt-4 text-base text-slate-600 dark:text-slate-400 sm:text-lg">
        The URL you entered doesn't match any available page. Please check the
        address or go back home.
      </p>
      <div class="mt-8 flex justify-center gap-3">
        <BaseButton variant="primary" @click="router.push('/')">
          Go to dashboard
        </BaseButton>
        <BaseButton variant="secondary" @click="router.back()">
          Go back
        </BaseButton>
      </div>
    </div>
  </section>
</template>
