<template>
  <UCard :ui="ui">
    <template #header>
      <img :src="src" class="w-full h-full object-center" />
    </template>
    <slot name="body"></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </UCard>
</template>
<script setup lang="ts">
const props = defineProps(["src"]);
const ui = {
  base: "",
  background: "bg-white dark:bg-gray-900",
  divide: "divide-y divide-gray-200 dark:divide-gray-800",
  ring: "ring-1 ring-green-600 dark:ring-green-800",
  rounded: "rounded-md",
  shadow: "shadow",
  body: {
    base: "",
    background: "",
    padding: "px-2 py-1 sm:p-2",
  },
  header: {
    base: "",
    background: "",
    padding: "px-0 py-0 sm:px-0",
  },
  footer: {
    base: "",
    background: "",
    padding: "px-2 py-1 sm:p-2",
  },
};
</script>
