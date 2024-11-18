<script setup lang="ts">
import type { BasketType } from "~/types/basket";

const props = defineProps<{
  basket: BasketType[];
  reduceQuantity: (id: number) => void;
  addQuantity: (id: number) => void;
}>();
</script>
<template>
  <div
    class="w-full md:w-3/4 flex flex-col gap-4 h-80 md:h-[calc(100vh-6rem)] overflow-auto"
  >
    <div
      class="flex gap-3 items-center w-[350px] h-96"
      v-for="item in basket"
      :key="item.id"
    >
      <div class="w-[100px]">
        <img
          class="w-24 h-24 rounded-md object-cover"
          :src="item.images[0]"
          :alt="item.title"
        />
      </div>
      <div
        class="flex flex-col justify-between items-stretch gap-1 w-[250px] h-full"
      >
        <p
          class="whitespace-nowrap overflow-hidden text-ellipsis font-bold max-w-full"
        >
          {{ item.title }}
        </p>
        <p class="whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
          {{ item.totalPrice }} $
        </p>
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
