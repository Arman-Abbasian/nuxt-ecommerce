<script setup lang="ts">
import { ref } from "vue";
import { useLogout } from "~/composable/logout";
import useAuthenticateUser from "~/composable/useAuthenticateUser";

const { isLoggedIn, user } = await useAuthenticateUser();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const logoutHandler = async () => {
  const { logoutData, logoutError } = await useLogout();
  if (logoutData.value) {
    navigateTo("/");
  }
};
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="bg-white shadow-md md:h-16 mb-4 max-h-64 flex flex-col">
    <nav class="container mx-auto p-4 flex justify-between items-center">
      <!-- Left side: Navigation links -->
      <div class="md:flex space-x-6 hidden">
        <NuxtLink to="/" class="text-gray-800 hover:text-blue-500"
          >Home</NuxtLink
        >
        <NuxtLink to="/products" class="text-gray-800 hover:text-blue-500"
          >Products</NuxtLink
        >
        <NuxtLink to="/about-us" class="text-gray-800 hover:text-blue-500"
          >About us</NuxtLink
        >
        <NuxtLink to="/basket" class="text-gray-800 hover:text-blue-500"
          >Basket</NuxtLink
        >
      </div>

      <!-- Right side: Login or Username -->
      <div class="md:flex hidden">
        <div v-if="isLoggedIn" class="flex gap-2 items-center">
          <NuxtLink class="text-gray-800" to="/profile">{{
            user?.name
          }}</NuxtLink>
          <div>
            <UIcon
              name="material-symbols:logout"
              class="w-5 h-5"
              :onclick="logoutHandler"
            />
          </div>
        </div>
        <NuxtLink
          v-else
          to="/auth/login"
          class="text-gray-800 hover:text-blue-500"
          ><UIcon name="material-symbols:login" class="w-5 h-5"
        /></NuxtLink>
      </div>
      <!-- mobile hamburger menu -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
    <!-- Mobile menu with transition -->
    <transition name="slide-down" class="w-screen">
      <div v-show="isMenuOpen" class="md:hidden text-white pl-4 z-20">
        <ul class="flex flex-col space-y-4">
          <NuxtLink
            to="/"
            class="text-gray-800 hover:text-blue-500"
            @click="closeMenu()"
            >Home</NuxtLink
          >
          <NuxtLink
            to="/products"
            class="text-gray-800 hover:text-blue-500"
            @click="closeMenu()"
            >Products</NuxtLink
          >
          <NuxtLink
            to="/about-us"
            class="text-gray-800 hover:text-blue-500"
            @click="closeMenu()"
            >About us</NuxtLink
          >
          <NuxtLink
            to="/basket"
            class="text-gray-800 hover:text-blue-500"
            @click="closeMenu()"
            >Basket</NuxtLink
          >
          <div>
            <div v-if="isLoggedIn" class="flex gap-2 items-center">
              <NuxtLink
                class="text-gray-800"
                @click="closeMenu()"
                to="/profile"
                >{{ user?.name }}</NuxtLink
              >
              <div>
                <UIcon
                  name="material-symbols:logout"
                  class="w-5 h-5"
                  :onclick="logoutHandler"
                />
              </div>
            </div>
            <NuxtLink
              v-else
              to="/auth/login"
              class="text-gray-800 hover:text-blue-500"
              @click="closeMenu()"
              ><UIcon name="material-symbols:login" class="w-5 h-5"
            /></NuxtLink>
          </div>
        </ul>
      </div>
    </transition>
  </header>
</template>
<style scoped>
/* Transition styles */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.8s ease, opacity 0.8s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
