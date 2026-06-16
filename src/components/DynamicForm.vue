<script setup lang="ts" generic="T extends Record<string, any>">
import { reactive } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { ZodType } from "zod";
import type { FormConfig, FieldConfig } from "@/types/form";
import BaseButton from "@/components/ui/button/BaseButton.vue";
import DateInput from "@/components/ui/DateInput.vue";

const props = defineProps<{
  config: FormConfig<T>;
  schema: ZodType<T>;
  initialValues?: Partial<T>;
  mode: "create" | "edit";
  submitLabel?: string;
}>();

const emit = defineEmits<{
  submit: [values: T];
  cancel: [];
}>();

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(props.schema),
  initialValues: props.initialValues as any,
});

const models = reactive<Record<string, any>>({});
props.config.fields.forEach((field) => {
  const [model] = defineField(field.key as any);
  models[field.key as string] = model;
});

const isFieldDisabled = (field: FieldConfig<T>) => {
  return typeof field.disabled === "function"
    ? field.disabled(props.mode)
    : !!field.disabled;
};

const onSubmit = handleSubmit((values) => {
  emit("submit", values as T);
});

const inputClasses =
  "w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-surface-dark text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed";
</script>

<template>
  <form class="space-y-4" @submit="onSubmit">
    <div v-for="field in config.fields" :key="String(field.key)">
      <label
        class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 block"
      >
        {{ field.label }}
      </label>

      <select
        v-if="field.type === 'select'"
        v-model="models[field.key as string]"
        :disabled="isFieldDisabled(field)"
        :class="inputClasses"
      >
        <option v-for="opt in field.options" :key="opt" :value="opt">
          {{ opt }}
        </option>
      </select>

      <textarea
        v-else-if="field.type === 'textarea'"
        v-model="models[field.key as string]"
        :disabled="isFieldDisabled(field)"
        :placeholder="field.placeholder"
        :class="inputClasses"
        rows="3"
      />

      <input
        v-else-if="field.type === 'checkbox'"
        v-model="models[field.key as string]"
        type="checkbox"
        :disabled="isFieldDisabled(field)"
        class="h-4 w-4"
      />

      <DateInput
        v-else-if="field.type === 'date'"
        v-model="models[field.key as string]"
        :disabled="isFieldDisabled(field)"
        :placeholder="field.placeholder ?? 'Enter date (dd/mm/yyyy)'"
      />

      <input
        v-else
        v-model="models[field.key as string]"
        :type="field.type"
        :disabled="isFieldDisabled(field)"
        :placeholder="field.placeholder"
        :class="inputClasses"
      />

      <p v-if="errors[field.key as any]" class="text-xs text-danger-600 mt-1">
        {{ errors[field.key as any] }}
      </p>
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <BaseButton variant="ghost" type="button" @click="emit('cancel')"
        >Cancel</BaseButton
      >
      <BaseButton variant="primary" type="submit">
        {{ submitLabel ?? (mode === "create" ? "Create" : "Save Changes") }}
      </BaseButton>
    </div>
  </form>
</template>
