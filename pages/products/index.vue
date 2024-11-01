<script setup lang="ts">
import type { CategoryType, GetCategoryRes } from "~/types/category";
import type { FilterOptionsTypes, ProductType } from "../../types/product";
import { getProducts } from "~/services/products";
import { useRouter, useRoute } from "vue-router";
import type { BasketType } from "~/types/basket";

//---------------------
const products = ref<ProductType[]>([]);
const selectedCategory = ref<CategoryType>({} as CategoryType);
const basket = reactive([] as BasketType[]);
const filters = reactive<FilterOptionsTypes>({
  title: "",
  categoryId: selectedCategory?.value.id,
  price_min: 0,
  price_max: 0,
});
console.log(selectedCategory);
// Router and Route for query string management
const router = useRouter();
const route = useRoute();

// Update the query string and send request to backend
const updateFilters = async () => {
  const query: FilterOptionsTypes = { ...filters };
  // Remove empty or default values from the query (keep non-zero numbers)
  Object.keys(query).forEach((key) => {
    const typedKey = key as keyof FilterOptionsTypes;
    if (!query[typedKey]) {
      delete query[typedKey]; // Remove if it's falsy but not 0
    }
  });

  // Update the query string in the URL
  await router.push({ query });
  // Send request to the backend with updated query params
  fetchFilteredProducts();
};

// Fetch the filtered products from the backend
async function fetchFilteredProducts() {
  // Build the query string from the current route.query
  const query = new URLSearchParams(
    Object.entries(route.query).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value[0] ?? ""; // Take the first array element, if any
      } else {
        acc[key] = value?.toString() ?? ""; // Handle null/undefined
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  // Fetch products from the backend using the built query string
  const { getProductsData } = await getProducts(query); // Your API request logic
  products.value = getProductsData.value as ProductType[]; // Assume the backend returns a list of products
}

// Watch for changes in the route to refetch filtered products
watch(route, () => {
  updateFilters();
});
watch(basket, () => {
  localStorage.setItem("basket", JSON.stringify(basket));
});
watch(selectedCategory, () => {
  console.log(selectedCategory);
  filters.categoryId = selectedCategory.value?.id;
  updateFilters();
});

const addLocalStorageBasketItemsToBasketReactive = () => {
  const localStorageBasket: BasketType[] = JSON.parse(
    localStorage.getItem("basket") || "[]"
  );
  basket.push(...localStorageBasket);
};
// Load initial products on component mount
onMounted(() => {
  updateFilters();
  if (process.client) addLocalStorageBasketItemsToBasketReactive();
});

//---------------------

const addToBasketHandler = (product: ProductType) => {
  basket.push({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    images: product.images,
    quantity: 1,
    totalPrice: product.price,
  });
};
const isInBasket = (productId: number): boolean => {
  if (process.client) {
    return basket.some((product: BasketType) => product.id === productId);
  }
  return false;
};
</script>

<template>
  <div class="container-xxl h-[calc(100vh-6rem)]">
    <div class="flex flex-col md:flex-row gap-4 h-full">
      <!-- filter section -->
      <ProductsFilter
        :filters="filters"
        @selected-category="selectedCategory"
        :update-filters="updateFilters"
      />
      <!-- products section -->
      <Products
        :products="products"
        :isInBasket="isInBasket"
        :addToBasketHandler="addToBasketHandler"
      />
    </div>
  </div>
</template>
