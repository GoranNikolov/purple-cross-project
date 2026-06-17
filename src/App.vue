<script setup lang="ts">
import { useRoute } from "vue-router";
import AppLayout from "@/layouts/AppLayout.vue";

const route = useRoute();
</script>

<template>
  <template v-if="route.meta.layout === 'none'">
    <router-view />
  </template>
  <AppLayout v-else />
</template>
