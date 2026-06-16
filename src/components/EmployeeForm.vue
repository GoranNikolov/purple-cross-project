<script setup lang="ts">
import DynamicForm from "@/components/DynamicForm.vue";
import { employeeFormConfig } from "@/config/forms/employeeFormFields";
import { employeeSchema } from "@/schemas/employee.schema";
import type { Employee } from "@/types/employee";

const props = defineProps<{
  initialValues?: Employee;
  mode: "create" | "edit";
}>();

const emit = defineEmits<{
  submit: [values: Employee];
  cancel: [];
}>();

const defaults: Employee = {
  code: "",
  fullName: "",
  occupation: "IT Support",
  department: "Research",
  dateOfEmployment: "",
  terminationDate: null,
};
</script>

<template>
  <DynamicForm
    :config="employeeFormConfig"
    :schema="employeeSchema"
    :initial-values="props.initialValues ?? defaults"
    :mode="props.mode"
    @submit="(values) => emit('submit', values as Employee)"
    @cancel="emit('cancel')"
  />
</template>
