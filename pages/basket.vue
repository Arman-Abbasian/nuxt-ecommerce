<script setup lang="ts">
import Loader from "~/common/Loader.vue";
import { useGuestNavigate } from "~/composable/guestNavigate";
import type { BasketType } from "~/types/basket";

// definePageMeta({
//   middleware: ["auth"],
// });

const basket = reactive<BasketType[]>([]);
const isChecked = ref(false);
onMounted(async () => {
  await useGuestNavigate();
  isChecked.value = true;
  const localStorageBasket: BasketType[] = JSON.parse(
    localStorage.getItem("basket") || "[]"
  );
  basket.push(...localStorageBasket);
});
function addQuantity(id: number) {
  const item = basket.find((item: BasketType) => item.id === id);
  if (item) {
    item.quantity += 1;
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}
function reduceQuantity(id: number) {
  const item = basket.find((item: BasketType) => item.id === id);
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

const totalPrice: ComputedRef<number> = computed(() => {
  return basket.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.price * currentValue.quantity,
    0
  );
});
const tax: ComputedRef<number> = computed(() => {
  return (10 / 100) * totalPrice.value;
});
const subtotal: ComputedRef<number> = computed(() => {
  return totalPrice.value + tax.value;
});
</script>
<template>
  <div class="fixed top-0 right-0 w-screen h-screen" v-if="!isChecked">
    <Loader />
  </div>
  <div class="flex flex-col md:flex-row gap-4" v-else>
    <!-- basket items -->
    <BasketProducts
      :add-quantity="addQuantity"
      :basket="basket"
      :reduce-quantity="reduceQuantity"
    />
    <!-- payment details -->
    <BasketCalc :subtotal="subtotal" :tax="tax" :total-price="totalPrice" />
  </div>
</template>
