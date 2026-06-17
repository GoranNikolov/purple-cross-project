<script setup lang="ts">
import type { Employee } from "@/types/employee";
import RowActions from "@/components/RowActions.vue";

defineProps<{
  row: Employee;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}>();
</script>

<template>
  <RowActions @view="onView" @edit="onEdit" @delete="onDelete" />
</template>
