<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
const desktopItems = [
  "/images/desktop/miscellaneous.webp",
  "/images/desktop/furniture.webp",
  "/images/desktop/cloth.webp",
  "/images/desktop/electronic.webp",
];

const mobileItems = [
  "/images/mobile/miscellaneous.webp",
  "/images/mobile/furniture.webp",
  "/images/mobile/cloth.webp",
  "/images/mobile/electronic.webp",
];
// Check if the screen width is md (768px) or lower
const isMobile = useMediaQuery("(max-width: 1023px)");

// Use mobileItems if on a small screen, otherwise use items
const selectedItems = computed(() =>
  isMobile.value ? mobileItems : desktopItems
);
const carouselRef = ref();

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
});
</script>
<template>
  <UCarousel
    v-slot="{ item }"
    :items="selectedItems"
    class="w-[calc(100vw-2rem)] mx-auto rounded-lg overflow-hidden h-[calc(100vh-6rem)]"
    indicators
    ref="carouselRef"
    :ui="{
      container: 'h-full',
      item: 'w-full h-full object-cover object-center',
    }"
  >
    <img :src="item" class="w-full h-full object-center" draggable="false" />
  </UCarousel>
</template>
