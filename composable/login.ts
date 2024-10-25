import type { LoginType } from "~/types/login";

export const useLogin = async (formData: LoginType) => {
  const {
    data: loginData,
    error: loginError,
    refresh: loginRefresh,
  } = await useAsyncData("login", () =>
    $fetch("/api/auth/login", {
      method: "post",
      body: formData,
    })
  );
  return { loginData, loginError, loginRefresh };
};
