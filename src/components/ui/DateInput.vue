<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  modelValue: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const isEmpty = computed(() => !props.modelValue);

const displayText = computed(() => {
  if (!props.modelValue) return props.placeholder ?? "Select date";
  const date = new Date(props.modelValue + "T00:00:00");
  return date.toLocaleDateString("en-GB"); // dd/mm/yyyy format
});

function openPicker() {
  if (props.disabled) return;
  if (typeof inputRef.value?.showPicker === "function") {
    inputRef.value.showPicker();
  } else {
    inputRef.value?.focus();
  }
}

function onInput(e: Event) {
  const target = e.target as HTMLInputElement | null;
  if (target) {
    emit("update:modelValue", target.value);
  }
}
</script>

<template>
  <div
    class="relative w-full"
    :class="{ 'cursor-pointer': !disabled, 'cursor-not-allowed': disabled }"
    @click="openPicker"
  >
    <div
      :class="[
        'w-full px-3 py-2 text-sm rounded-md border select-none',
        isEmpty
          ? 'text-slate-400 dark:text-slate-500'
          : 'text-slate-900 dark:text-slate-100',
        'border-slate-300 dark:border-slate-600',
        'bg-white dark:bg-surface-dark',
        disabled ? 'opacity-60' : '',
        'focus-within:ring-2 focus-within:ring-primary-500',
      ]"
    >
      {{ displayText }}
    </div>

    <input
      ref="inputRef"
      type="date"
      :value="modelValue ?? ''"
      :disabled="disabled"
      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      @input="onInput"
    />
  </div>
</template>
