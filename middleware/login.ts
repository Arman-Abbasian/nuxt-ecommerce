import { useCheckUser } from "~/composable/useCheckUser";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkUserData, checkUserError } = await useCheckUser();
  console.log(checkUserData.value);
  if (checkUserData.value) {
    return navigateTo("/");
  }
});
