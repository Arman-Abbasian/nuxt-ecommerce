<script setup lang="ts">
const items = [
  "/images/miscellaneous.webp",
  "/images/furniture.webp",
  "/images/cloth.webp",
  "/images/electronic.webp",
];
</script>
<template>
  <UCarousel
    v-slot="{ item }"
    :items="items"
    class="rounded-lg overflow-hidden h-[calc(100vh-6rem)]"
    indicators
  >
    <img :src="item" class="w-full object-center" draggable="true" />
  </UCarousel>
</template>
