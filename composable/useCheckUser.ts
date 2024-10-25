import type { UserType } from "~/types/user";

export const useCheckUser = async () => {
  const {
    data: checkUserData,
    error: checkUserError,
    refresh: checkUserRefresh,
  } = await useAsyncData("checkUser", () =>
    $fetch<UserType>("/api/auth/checkUser", {
      method: "get",
    })
  );
  return { checkUserData, checkUserError, checkUserRefresh };
};
