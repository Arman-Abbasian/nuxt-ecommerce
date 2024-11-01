<script setup lang="ts">
import type { BasketType } from "~/types/basket";

const props = defineProps<{
  basket: BasketType[];
  reduceQuantity: (id: number) => void;
  addQuantity: (id: number) => void;
}>();
</script>
<template>
  <div class="flex flex-col gap-4 w-full md:w-3/4">
    <div class="flex gap-3" v-for="item in basket" :key="item.id">
      <div>
        <img
          class="w-24 h-24 rounded-md"
          :src="item.images[0]"
          :alt="item.title"
        />
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
</template>
