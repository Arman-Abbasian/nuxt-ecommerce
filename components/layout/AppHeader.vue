<template>
  <header class="bg-white shadow-md p-4 h-16 mb-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Left side: Navigation links -->
      <nav class="flex space-x-6">
        <NuxtLink to="/" class="text-gray-800 hover:text-blue-500"
          >Home</NuxtLink
        >
        <NuxtLink to="/products" class="text-gray-800 hover:text-blue-500"
          >Products</NuxtLink
        >
        <NuxtLink to="/blogs" class="text-gray-800 hover:text-blue-500"
          >Blogs</NuxtLink
        >
        <NuxtLink to="/basket" class="text-gray-800 hover:text-blue-500"
          >Basket</NuxtLink
        >
      </nav>

      <!-- Right side: Login or Username -->
      <div>
        <span v-if="isLoggedIn" class="text-gray-800">{{ username }}</span>
        <NuxtLink v-else to="/login" class="text-gray-800 hover:text-blue-500"
          >Login</NuxtLink
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

// Replace with your actual logic for checking login status
const isLoggedIn = ref(false); // Set to `true` if the user is logged in
const username = ref("JohnDoe"); // Replace with the actual username
</script>
