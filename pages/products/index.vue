<script setup lang="ts">
import type { CategoryType } from "~/types/category";
import type { FilterOptionsTypes, ProductType } from "../../types/product";
import { getProducts } from "~/services/products";
import { useRouter, useRoute } from "vue-router";
import type { BasketType } from "~/types/basket";
import Loader from "~/common/Loader.vue";

//---------------------
const products = ref<ProductType[]>([]);
const selectedCategory = ref<CategoryType>({} as CategoryType);
const basket = reactive([] as BasketType[]);
const isOpenFilterSlideOver = ref<boolean>(false);
const isChecked = ref(false);
const filters = reactive<FilterOptionsTypes>({
  title: "",
  categoryId: selectedCategory?.value.id,
  price_min: 0,
  price_max: 0,
});
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
  isOpenFilterSlideOver.value = false;
};

// Fetch the filtered products from the backend
async function fetchFilteredProducts() {
  isChecked.value = false;
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
  isChecked.value = true;
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

const openFilterSlideOver = () => {
  isOpenFilterSlideOver.value = true;
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
        class="hidden md:block"
      />
      <USlideover v-model="isOpenFilterSlideOver" side="left" class="md:hidden">
        <UCard
          class="flex flex-col flex-1 overflow-auto p-4"
          :ui="{
            body: { base: 'flex-1 overflow-auto' },
            ring: '',
            divide: 'divide-y divide-primary-200 dark:divide-primary-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
              >
                filter section
              </h3>
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                @click="isOpenFilterSlideOver = false"
              />
            </div>
            <Placeholder class="h-8" />
          </template>
          <ProductsFilter
            :filters="filters"
            @selected-category="selectedCategory"
            :update-filters="updateFilters"
            class="mt-8"
          />
        </UCard>
      </USlideover>
      <UButton
        color="gray"
        variant="ghost"
        icon="material-symbols:filter-alt-outline"
        class="md:hidden"
        label="filters"
        @click="openFilterSlideOver"
      />
      <!-- products section -->
      <div
        class="w-full md:h-full overflow-auto md:w-4/5 h-full p-4"
        v-if="!isChecked"
      >
        <Loader />
      </div>
      <Products
        v-else
        :products="products"
        :isInBasket="isInBasket"
        :addToBasketHandler="addToBasketHandler"
      />
    </div>
  </div>
</template>
