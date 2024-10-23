export async function checkUser() {
  const {
    data: checkUserData,
    status: checkUserStatus,
    error: checkUserError,
    refresh: checkUserRefresh,
    clear: checkUserClear,
  } = await useAsyncData("checkUser", () => $fetch(`"/api/auth/checkUser`));
  return {
    checkUserData,
    checkUserStatus,
    checkUserError,
    checkUserRefresh,
    checkUserClear,
  };
}
