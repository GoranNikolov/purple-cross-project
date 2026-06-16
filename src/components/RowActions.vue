<script setup lang="ts">
import BaseButton from "@/components/ui/button/BaseButton.vue";

defineEmits<{
  view: [];
  edit: [];
  delete: [];
}>();
</script>

<template>
  <div class="flex items-center gap-1">
    <BaseButton variant="ghost" size="sm" @click="$emit('view')">
      <template #icon-left>
        <FontAwesomeIcon icon="fa-solid fa-eye" class="text-xs" />
      </template>
      View
    </BaseButton>
    <BaseButton variant="ghost" size="sm" @click="$emit('edit')">
      <template #icon-left>
        <FontAwesomeIcon icon="fa-solid fa-pen" class="text-xs" />
      </template>
      Edit
    </BaseButton>
    <BaseButton variant="ghost" size="sm" @click="$emit('delete')">
      <template #icon-left>
        <FontAwesomeIcon
          icon="fa-solid fa-trash"
          class="text-xs text-danger-600 dark:text-danger-400"
        />
      </template>
      <span class="text-danger-600 dark:text-danger-400">Delete</span>
    </BaseButton>
  </div>
</template>
