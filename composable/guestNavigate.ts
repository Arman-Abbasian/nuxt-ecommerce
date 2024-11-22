import { useCheckUser } from "./useCheckUser";

export const useGuestNavigate = async () => {
  const { checkUserData, checkUserError, checkUserStatus } =
    await useCheckUser();
  if (checkUserError.value || !checkUserData.value) {
    return navigateTo("/auth/login");
  }
};
