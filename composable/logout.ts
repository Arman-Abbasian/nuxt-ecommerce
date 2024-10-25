import type { UserType } from "~/types/user";

export const useLogout = async () => {
  const {
    data: logoutData,
    error: logoutError,
    refresh: logoutRefresh,
  } = await useAsyncData("logout", () =>
    $fetch("/api/auth/logout", {
      method: "get",
    })
  );
  return { logoutData, logoutError, logoutRefresh };
};
