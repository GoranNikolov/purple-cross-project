<script setup lang="ts">
import { ref } from "vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
import BaseButton from "@/components/ui/button/BaseButton.vue";
import type { Employee } from "@/types/employee";

const mode = ref<"create" | "edit">("create");

const sampleEmployee: Employee = {
  code: "EMP001",
  fullName: "Nicole Berry",
  occupation: "IT Support",
  department: "Research",
  dateOfEmployment: "2016-07-06",
  terminationDate: null,
};

function handleSubmit(values: Employee) {
  console.log("submitted", values);
  alert(`Submitted: ${JSON.stringify(values, null, 2)}`);
}

function handleCancel() {
  console.log("cancelled");
}
</script>

<template>
  <div class="space-y-4 max-w-md">
    <div class="flex gap-2 text-sm">
      <BaseButton @click="mode = 'create'">Create mode</BaseButton>
      <BaseButton @click="mode = 'edit'">Edit mode</BaseButton>
    </div>

    <EmployeeForm
      :mode="mode"
      :initial-values="mode === 'edit' ? sampleEmployee : undefined"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>
