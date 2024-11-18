<script setup lang="ts">
const props = defineProps<{
  totalPrice: number;
  tax: number;
  subtotal: number;
}>();
</script>
<template>
  <div class="w-full md:w-1/4 md:flex md:justify-end h-[400px]">
    <div
      class="w-[350px] flex flex-col gap-3 p-4 border-2 border-primary-100 rounded-md"
    >
      <div class="h-28">
        <img
          src="/images/calcImage.webp"
          class="rounded-md w-full h-full object-center"
        />
      </div>
      <div class="flex items-center gap-2">
        <h4>cart total:</h4>
        <p class="font-bold">{{ totalPrice }}$</p>
      </div>
      <div class="flex items-center gap-2">
        <p class="font-bold">tax:</p>
        <p class="font-bold text-red-700">{{ tax }}$</p>
      </div>
      <div class="flex items-center gap-2">
        <p class="font-bold">discount of products:</p>
        <p class="font-bold text-teal-800">0 $</p>
      </div>
      <hr />
      <div class="flex items-center gap-2 mt-4">
        <h3>subtotal:</h3>
        <p class="font-bold text-xl">{{ subtotal }}$</p>
      </div>
      <UButton class="w-full flex justify-center items-center">
        <ULink to="/payment">payment </ULink>
      </UButton>
    </div>
  </div>
</template>
