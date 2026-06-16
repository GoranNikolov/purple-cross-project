<script setup lang="ts">
import BaseButton from "@/components/ui/button/BaseButton.vue";
import type {
  ButtonVariant,
  ButtonSize,
} from "@/components/ui/button/buttonVariants";

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "danger",
  "ghost",
  "outline",
];
const sizes: ButtonSize[] = ["sm", "md", "lg"];
</script>

<template>
  <div class="space-y-8">
    <section v-for="variant in variants" :key="variant">
      <h2
        class="text-sm font-semibold mb-2 capitalize text-slate-600 dark:text-slate-400"
      >
        {{ variant }}
      </h2>
      <div class="flex flex-wrap items-center gap-3">
        <BaseButton
          v-for="size in sizes"
          :key="size"
          :variant="variant"
          :size="size"
        >
          {{ size.toUpperCase() }}
        </BaseButton>
        <BaseButton :variant="variant" disabled>Disabled</BaseButton>
        <BaseButton :variant="variant" full-width class="max-w-xs"
          >Full width</BaseButton
        >
      </div>
    </section>
  </div>
</template>
