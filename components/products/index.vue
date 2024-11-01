<script setup lang="ts">
import type { ProductType } from "~/types/product";

const props = defineProps<{
  products: ProductType[];
  isInBasket: (id: number) => boolean;
  addToBasketHandler: (product: ProductType) => void;
}>();
</script>
<template>
  <div class="w-full md:h-full overflow-auto md:w-4/5 h-full p-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 md:gap-8">
      <UCard
        v-for="product in products"
        :key="product.id"
        class="w-[23rem] mx-auto flex flex-col justify-between"
      >
        <template #header>
          <div class="h-72 overflow-hidden rounded-t-lg">
            <img
              :src="product.images[0]"
              class="w-full h-full overflow-hidden object-cover rounded-t-lg"
              :alt="product.title"
            />
          </div>
        </template>

        <div class="h-20">
          <h5 class="card-title text-nowrap overflow-clip text-ellipsis">
            {{ product.title }}
          </h5>
          <p class="card-text text-nowrap overflow-clip text-ellipsis">
            {{ product.description }}
          </p>
          <p class="text-nowrap overflow-clip text-ellipsis">
            price: {{ product.price }}$
          </p>
        </div>

        <template #footer>
          <div class="flex justify-between items-center h-8 px-2">
            <UButton
              :to="`/products/${product.id}`"
              target="_blank"
              label="Details"
              icon="i-material-symbols-visibility-outline"
            />
            <UButton
              icon="material-symbols-light-add-shopping-cart"
              size="sm"
              :disabled="isInBasket(product.id)"
              color="primary"
              variant="solid"
              :label="isInBasket(product.id) ? 'Added' : 'Add to Cart'"
              :trailing="false"
              @click="addToBasketHandler(product)"
            />
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
