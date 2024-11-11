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

// Use a media query to check if the screen is at least medium-sized (md)
const isDesktop = useMediaQuery("(min-width: 768px)");

console.log(isDesktop.value);
</script>

<template>
  <UCarousel
    :items="isDesktop ? desktopItems : mobileItems"
    class="rounded-lg overflow-hidden h-[calc(100vh-6rem)]"
    indicators
  >
    <!-- Bind the `src` attribute to each item in the carousel -->
    <template v-slot="{ item }">
      <img :src="item" class="w-full object-center" draggable="true" />
    </template>
  </UCarousel>
</template>
