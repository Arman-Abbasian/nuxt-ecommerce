<script setup lang="ts">
import ImageCard from "~/common/ImageCard.vue";
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
      <ImageCard
        v-for="product in products"
        :key="product.id"
        class="w-[23rem] overflow-hidden"
        :src="product.images[0]"
      >
        <template v-slot:body>
          <div class="">
            <h4
              class="card-title text-nowrap overflow-clip text-ellipsis mb-4 text-gray-700"
            >
              {{ product.title }}
            </h4>
            <p class="card-text text-nowrap overflow-clip text-ellipsis mb-6">
              {{ product.description }}
            </p>
            <p
              class="text-nowrap overflow-clip text-ellipsis text-gray-700 font-bold"
            >
              price: {{ product.price }}$
            </p>
          </div>
        </template>
        <template v-slot:footer>
          <div class="flex justify-between items-center py-2">
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
      </ImageCard>
    </div>
  </div>
</template>
