import type { CheckUserResponseType } from "~/types/user";

export const useCheckUser = async () => {
  const {
    data: checkUserData,
    error: checkUserError,
    refresh: checkUserRefresh,
    status: checkUserStatus,
  } = await useAsyncData<CheckUserResponseType>("checkUser", () =>
    $fetch<CheckUserResponseType>("/api/auth/checkUser")
  );
  return { checkUserData, checkUserError, checkUserRefresh, checkUserStatus };
};
