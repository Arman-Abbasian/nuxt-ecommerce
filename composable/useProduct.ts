export async function useGetProduct(param: string) {
  const {
    data: getProductData,
    status: getProductStatus,
    error: getProductError,
    refresh: getProductRefresh,
    clear: getProductClear,
  } = await useAsyncData("getProduct", () =>
    $fetch(`https://api.escuelajs.co/api/v1/products/${param}`)
  );
  return {
    getProductData,
    getProductStatus,
    getProductError,
    getProductRefresh,
    getProductClear,
  };
}
