<script setup lang="ts">
interface StepDef {
  key: string;
  label: string;
}

const props = defineProps<{
  steps: StepDef[];
  currentStep: string;
}>();

const order = ["upload", "map", "importing", "done"];

function stepStatus(stepKey: string): "completed" | "current" | "upcoming" {
  const currentIdx = order.indexOf(props.currentStep);
  const stepIdx = order.indexOf(stepKey === "done" ? "done" : stepKey);
  if (stepKey === "done" && props.currentStep === "importing") return "current";
  if (stepIdx < currentIdx) return "completed";
  if (stepIdx === currentIdx) return "current";
  return "upcoming";
}
</script>

<template>
  <div class="flex items-center gap-0 px-2">
    <template v-for="(step, idx) in steps" :key="step.key">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300"
          :class="{
            'bg-primary-600 text-white shadow-md shadow-primary-500/30':
              stepStatus(step.key) === 'current',
            'bg-emerald-500 text-white':
              stepStatus(step.key) === 'completed',
            'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400':
              stepStatus(step.key) === 'upcoming',
          }"
        >
          <font-awesome-icon
            v-if="stepStatus(step.key) === 'completed'"
            icon="check"
            class="text-xs"
          />
          <span v-else>{{ idx + 1 }}</span>
        </div>
        <span
          class="text-sm font-medium transition-colors duration-300 whitespace-nowrap"
          :class="{
            'text-primary-600 dark:text-primary-400':
              stepStatus(step.key) === 'current',
            'text-emerald-600 dark:text-emerald-400':
              stepStatus(step.key) === 'completed',
            'text-slate-400 dark:text-slate-500':
              stepStatus(step.key) === 'upcoming',
          }"
        >
          {{ step.label }}
        </span>
      </div>
      <div
        v-if="idx < steps.length - 1"
        class="flex-1 h-px mx-3 transition-colors duration-300"
        :class="{
          'bg-emerald-400': stepStatus(steps[idx + 1].key) !== 'upcoming',
          'bg-slate-200 dark:bg-slate-700':
            stepStatus(steps[idx + 1].key) === 'upcoming',
        }"
      />
    </template>
  </div>
</template>
