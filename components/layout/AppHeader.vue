<script setup lang="ts">
import { ref } from "vue";
import { useLogout } from "~/composable/logout";
import { useCheckUser } from "~/composable/useCheckUser";
import type { UserType } from "~/types/user";

const isLoggedIn = ref(false);
const user = reactive<UserType>({
  id: null,
  email: null,
  name: null,
  role: null,
  avatar: null,
});

const route = useRoute();

const logoutHandler = async () => {
  const { logoutData, logoutError } = await useLogout();
  if (logoutData.value) {
    navigateTo("/");
  }
};

watch(
  route,
  async () => {
    const { checkUserData, checkUserError } = await useCheckUser();
    if (checkUserError.value || !checkUserData.value) {
      isLoggedIn.value = false;
      Object.assign(user, {
        id: null,
        email: null,
        name: null,
        role: null,
        avatar: null,
      });
    } else {
      Object.assign(user, {
        id: checkUserData?.value?.data?.data?.id,
        email: checkUserData?.value?.data?.data?.email,
        name: checkUserData?.value?.data?.data?.name,
        role: checkUserData?.value?.data?.data?.role,
        avatar: checkUserData?.value?.data?.data?.avatar,
      });
      isLoggedIn.value = true;
    }
  },
  { immediate: true }
);
</script>

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
        <NuxtLink to="/about-us" class="text-gray-800 hover:text-blue-500"
          >About us</NuxtLink
        >
        <NuxtLink to="/basket" class="text-gray-800 hover:text-blue-500"
          >Basket</NuxtLink
        >
      </nav>

      <!-- Right side: Login or Username -->
      <div>
        <div v-if="isLoggedIn" class="flex gap-2 items-center">
          <NuxtLink class="text-gray-800" to="/profile">{{
            user.name
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
    </div>
  </header>
</template>
