<script setup lang="ts">
const props = defineProps<{
  totalPrice: number;
  tax: number;
  subtotal: number;
}>();
</script>
<template>
  <div class="w-full md:w-1/4 md:flex md:justify-end h-[420px]">
    <div
      class="w-[350px] flex flex-col gap-3 p-4 border-2 border-teal-100 rounded-md"
    >
      <div class="h-40">
        <img
          src="/images/calcImage.webp"
          class="rounded-md w-full h-full object-center"
        />
      </div>
      <div class="flex items-center gap-2">
        <h3>cart total:</h3>
        <p class="font-bold">{{ totalPrice }}$</p>
      </div>
      <div class="flex items-center gap-2">
        <h3>tax:</h3>
        <p class="font-bold text-red-700">{{ tax }}$</p>
      </div>
      <div class="flex items-center gap-2">
        <h3>discount of products:</h3>
        <p class="font-bold text-teal-800">0 $</p>
      </div>
      <hr />
      <div class="flex items-center gap-2 mt-4">
        <h2>subtotal:</h2>
        <p class="font-bold text-2xl">{{ subtotal }}$</p>
      </div>
      <UButton class="w-full flex justify-center items-center">
        <ULink to="/payment">payment </ULink>
      </UButton>
    </div>
  </div>
</template>
