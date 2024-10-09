export async function checkUser() {
  const {
    data: checkUserData,
    status: checkUserStatus,
    error: checkUserError,
    refresh: checkUserRefresh,
    clear: checkUserClear,
  } = await useAsyncData("checkUser", () =>
    $fetch(`https://api.escuelajs.co/api/v1/auth/profile`)
  );
  return {
    checkUserData,
    checkUserStatus,
    checkUserError,
    checkUserRefresh,
    checkUserClear,
  };
}
