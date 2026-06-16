<script setup lang="ts">
import { computed } from "vue";
import {
  buttonVariantClasses,
  buttonSizeClasses,
  type ButtonVariant,
  type ButtonSize,
} from "./buttonVariants";

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  type: "button",
  fullWidth: false,
});

defineEmits<{ click: [event: MouseEvent] }>();

const classes = computed(() => [
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-60",
  buttonVariantClasses[props.variant],
  buttonSizeClasses[props.size],
  props.fullWidth ? "w-full" : "",
]);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="classes"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>
