<script setup lang="ts">
const props = defineProps(["iconName", "iconClass", "text"]);
</script>
<template>
  <UContainer class="flex items-center gap-2 p-4">
    <UIcon :name="iconName" :class="iconClass" />
    <p>{{ text }}</p>
  </UContainer>
</template>
