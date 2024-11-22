import { useCheckUser } from "~/composable/useCheckUser";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkUserData, checkUserError } = await useCheckUser();
  if (checkUserError.value || !checkUserData.value) {
    return navigateTo("/auth/login");
  }
});
