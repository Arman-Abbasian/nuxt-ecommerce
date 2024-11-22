import { useCheckUser } from "./useCheckUser";

export const useHostNavigate = async () => {
  const isChecked = ref(false);
  const { checkUserData, checkUserError } = await useCheckUser();
  if (checkUserData.value) {
    isChecked.value = true;
    return navigateTo("/");
  }
};
