<script setup lang="ts">
import type { basketType } from "~/types/basket";

const basket = reactive<basketType[]>([]);
onMounted(() => {
  const localStorageBasket: basketType[] = JSON.parse(
    localStorage.getItem("basket") || "[]"
  );
  console.log(localStorageBasket);
  basket.push(...localStorageBasket);
});
function addQuantity(id: number) {
  const item = basket.find((item) => item.id === id);
  if (item) {
    item.quantity += 1;
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}
function reduceQuantity(id: number) {
  const item = basket.find((item) => item.id === id);
  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem("basket", JSON.stringify(basket));
    } else {
      const itemIndex = basket.findIndex((item) => item.id === id);
      basket.splice(itemIndex, 1);
    }
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}
</script>
<template>
  <div class="flex flex-col md:flex-row w-[calc(100vw-2rem)] mx-auto gap-4">
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
            <UButton
              class="w-6 h-6 rounded-sm bg-red-500 flex justify-center items-center"
              @click="reduceQuantity(item.id)"
              :icon="
                item.quantity > 1
                  ? 'material-symbols-remove'
                  : 'material-symbols-delete'
              "
            />
            <p>{{ item.quantity }}</p>
            <UButton
              class="w-6 h-6 rounded-sm bg-teal-500 flex justify-center items-center"
              icon="material-symbols-add"
              @click="addQuantity(item.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- payment details -->
    <div class="w-full md:w-1/4 md:flex md:justify-end">
      <div
        class="w-64 flex justify-end flex-col gap-3 p-4 border-2 border-teal-100 rounded-md"
      >
        <div class="flex items-center gap-2">
          <h3>cart total:</h3>
          <p class="font-bold">1200$</p>
        </div>
        <div class="flex items-center gap-2">
          <h3>tax:</h3>
          <p class="font-bold text-red-700">1200$</p>
        </div>
        <div class="flex items-center gap-2">
          <h3>discount of products:</h3>
          <p class="font-bold text-teal-800">- 1200$</p>
        </div>
        <hr />
        <div class="flex items-center gap-2 mt-4">
          <h2>subtotal:</h2>
          <p class="font-bold text-2xl">1200$</p>
        </div>
        <UButton>checkout</UButton>
      </div>
    </div>
  </div>
</template>
