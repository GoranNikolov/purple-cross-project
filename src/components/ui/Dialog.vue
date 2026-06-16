<script setup lang="ts">
import { watch } from "vue";
import BaseButton from "@/components/ui/button/BaseButton.vue";
import type { ButtonVariant } from "@/components/ui/button/buttonVariants";

interface Props {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ButtonVariant;
  hideFooter?: boolean; // when content (slot) provides its own buttons, e.g. a form
  maxWidth?: string; // override panel width for larger content like forms
}

const props = withDefaults(defineProps<Props>(), {
  title: "Confirm",
  message: "Are you sure?",
  confirmLabel: "Confirm",
  cancelLabel: "Cancel",
  variant: "primary",
  hideFooter: false,
  maxWidth: "max-w-md",
});

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  },
);
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="emit('cancel')"
        />

        <div
          class="relative z-10 w-full mx-4 my-8 rounded-xl bg-white dark:bg-surface-dark shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden max-h-[90vh] flex flex-col"
          :class="maxWidth"
        >
          <div class="p-6 space-y-4 overflow-y-auto">
            <h3
              class="text-lg font-semibold text-slate-900 dark:text-slate-100"
            >
              {{ title }}
            </h3>

            <!-- Default slot: custom content like a form. Falls back to message text. -->
            <slot>
              <p
                class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
              >
                {{ message }}
              </p>
            </slot>
          </div>

          <div
            v-if="!hideFooter"
            class="flex items-center justify-end gap-2 px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex-shrink-0"
          >
            <BaseButton variant="ghost" size="sm" @click="emit('cancel')">{{
              cancelLabel
            }}</BaseButton>
            <BaseButton :variant="variant" size="sm" @click="emit('confirm')">{{
              confirmLabel
            }}</BaseButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.2s ease;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
