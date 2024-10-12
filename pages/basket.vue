<script setup lang="ts">
import type { productType } from "~/types/product";

const basket = reactive<productType[]>([]);
onMounted(() => {
  const localStorageBasket: productType[] = JSON.parse(
    localStorage.getItem("basket") || "[]"
  );
  console.log(localStorageBasket);
  basket.push(...localStorageBasket);
});
console.log(basket);
</script>
<template>
  <div class="flex w-full gap-4">
    <!-- basket items -->
    <div class="flex flex-col gap-4">
      <div class="flex gap-3" v-for="item in basket" :key="item.id">
        <div>
          <img class="w-24 h-24" :src="item.images[0]" :alt="item.title" />
        </div>
        <div class="flex flex-col gap-2">
          <h1>{{ item.title }}</h1>
          <p>{{ item.price }}</p>
          <div class="flex items-center gap-2">
            <p>-</p>
            <p>1</p>
            <p>+</p>
          </div>
        </div>
      </div>
    </div>
    <!-- payment details -->
    <div></div>
  </div>
</template>
