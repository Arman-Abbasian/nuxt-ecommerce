<script setup lang="ts">
import type { basketType } from "~/types/basket";
import type { productType } from "~/types/product";

const basket = reactive<basketType[]>([]);
onMounted(() => {
  const localStorageBasket: basketType[] = JSON.parse(
    localStorage.getItem("basket") || "[]"
  );
  console.log(localStorageBasket);
  basket.push(...localStorageBasket);
});
console.log(basket);
</script>
<template>
  <div class="flex flex-col md:flex-row w-[calc(100vw-2rem)] gap-4">
    <!-- basket items -->
    <div class="flex flex-col gap-4 w-full md:w-3/4">
      <div class="flex gap-3" v-for="item in basket" :key="item.id">
        <div>
          <img class="w-24 h-24" :src="item.images[0]" :alt="item.title" />
        </div>
        <div class="flex flex-col gap-2">
          <h1>{{ item.title }}</h1>
          <p>{{ item.totalPrice }} $</p>
          <div class="flex items-center gap-2">
            <p>-</p>
            <p>{{ item.quantity }}</p>
            <p>+</p>
          </div>
        </div>
      </div>
    </div>
    <!-- payment details -->
    <div class="w-full md:w-1/4">
      <div
        class="w-64 flex flex-col gap-3 p-4 border-2 border-teal-100 rounded-md"
      >
        <div class="flex items-center gap-2">
          <h3>cart total:</h3>
          <p class="font-bold">1200$</p>
        </div>
        <div class="flex items-center gap-2">
          <h3>tax:</h3>
          <p class="font-bold">1200$</p>
        </div>
        <div class="flex items-center gap-5">
          <h3>delivery:</h3>
          <p class="font-bold">1200$</p>
        </div>
        <div class="flex items-center gap-2">
          <h3>discount:</h3>
          <p class="font-bold">- 1200$</p>
        </div>
        <div class="flex items-center gap-2">
          <h3>subtotal:</h3>
          <p class="font-bold">1200$</p>
        </div>
        <UButton>checkout</UButton>
      </div>
    </div>
  </div>
</template>
