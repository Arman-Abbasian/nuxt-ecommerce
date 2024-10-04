export async function getProducts() {
  const {
    data: getProductsData,
    status: getProductsStatus,
    error: getProductsError,
    refresh: getProductsRefresh,
    clear: getProductsClear,
  } = await useAsyncData("products", () =>
    $fetch("https://api.escuelajs.co/api/v1/products")
  );
  return {
    getProductsData,
    getProductsStatus,
    getProductsError,
    getProductsRefresh,
    getProductsClear,
  };
}
