export async function getProducts(query: string) {
  const {
    data: getProductsData,
    status: getProductsStatus,
    error: getProductsError,
    refresh: getProductsRefresh,
    clear: getProductsClear,
  } = await useAsyncData("getProducts", () =>
    $fetch(`https://api.escuelajs.co/api/v1/products?${query}`)
  );
  return {
    getProductsData,
    getProductsStatus,
    getProductsError,
    getProductsRefresh,
    getProductsClear,
  };
}

export async function getProduct(param: string) {
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
