<script setup lang="ts">
import type { CategoryType, GetCategoryRes } from "~/types/category";
import type { FilterOptionsTypes, productType } from "../../types/product";
import { truncateText } from "~/utils/stringFUnc";
import { getProducts } from "~/services/products";
import { useRouter, useRoute } from "vue-router";
import type { Avatar } from "#ui/types";
import type { basketType } from "~/types/basket";

//---------------------
const products = ref<productType[]>([]);
const categories = ref<CategoryType[]>([]);
const selectedCategory = ref<CategoryType>({} as CategoryType);
const basket = reactive([] as basketType[]);

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
  Object.keys(query).forEach((key: string) => {
    if (!query[key]) {
      delete query[key]; // Remove if it's falsy but not 0
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
  products.value = getProductsData.value as productType[]; // Assume the backend returns a list of products
}

// Watch for changes in the route to refetch filtered products
watch(route, () => {
  updateFilters();
});
watch(basket, () => {
  localStorage.setItem("basket", JSON.stringify(basket));
});
watch(selectedCategory, () => {
  filters.categoryId = selectedCategory.value?.id;
  updateFilters();
});
const addLocalStorageBasketItemsToBasketReactive = () => {
  const localStorageBasket: basketType[] = JSON.parse(
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
//fetch categories
const {
  data: categoryData,
  status: categoryStatus,
  error: errorStatus,
} = await useAsyncData("categories", () =>
  $fetch(`https://api.escuelajs.co/api/v1/categories`)
);
const categoryRes = categoryData.value as GetCategoryRes[];
categories.value = categoryRes?.map((item) => {
  return { id: item.id, label: item.name, avatar: { src: item.image } };
});
const addToBasketHandler = (product: productType) => {
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
    return basket.some((product: basketType) => product.id === productId);
  }
  return false;
};
</script>

<template>
  <div class="container-xxl h-[calc(100vh-6rem)]">
    <div class="flex flex-col md:flex-row gap-4 h-full">
      <!-- filter section -->
      <div class="w-full md:h-full md:w-1/5 p-4">
        <div class="flex flex-col gap-4">
          <!-- search title -->
          <div class="w-44">
            <UInput
              v-model="filters.title"
              name="title"
              placeholder="Search..."
              autocomplete="off"
              :ui="{ icon: { trailing: { pointer: '' } } }"
            >
              <template #trailing>
                <UButton
                  color="teal"
                  class="cursor-pointer"
                  variant="link"
                  icon="material-symbols-search-rounded"
                  :padded="false"
                  @click="updateFilters()"
                />
              </template>
            </UInput>
          </div>
          <!-- category select -->
          <div class="w-44">
            <USelectMenu
              v-model="selectedCategory"
              :options="categories"
              searchable
              placeholder="Select a category"
            >
              <template #leading>
                <UAvatar
                  v-bind="(selectedCategory.avatar as Avatar)"
                  size="xs"
                />
              </template>
              <template #option-empty="{ query }">
                <q>{{ query }}</q> not found
              </template>
            </USelectMenu>
          </div>
          <!-- price range inputs -->
          <div class="w-full flex items-center gap-2">
            <div>
              <UInput
                placeholder="min price"
                v-model="filters.price_min"
                type="number"
                icon="material-symbols-attach-money-rounded"
                class="w-24"
              />
            </div>
            <div>
              <UInput
                placeholder="max price"
                v-model="filters.price_max"
                type="number"
                icon="material-symbols-attach-money-rounded"
                class="w-24"
              />
            </div>
            <div>
              <UButton
                @click="updateFilters"
                icon="material-symbols-attach-money"
                >filter</UButton
              >
            </div>
          </div>
        </div>
      </div>
      <!-- products section -->
      <div class="w-full md:h-full overflow-auto md:w-4/5 h-full p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-8">
          <UCard
            v-for="product in products"
            :key="product.id"
            class="max-w-[19rem] mx-auto flex flex-col justify-between"
          >
            <template #header>
              <div class="h-72 overflow-hidden rounded-t-lg">
                <img
                  :src="product.images[0]"
                  class="w-full h-full overflow-hidden object-cover rounded-t-lg"
                  :alt="product.title"
                />
              </div>
            </template>

            <div class="h-20">
              <h5 class="card-title text-nowrap overflow-clip text-ellipsis">
                {{ product.title }}
              </h5>
              <p class="card-text text-nowrap overflow-clip text-ellipsis">
                {{ product.description }}
              </p>
              <p class="text-nowrap overflow-clip text-ellipsis">
                price: {{ product.price }}$
              </p>
            </div>

            <template #footer>
              <div class="flex justify-between items-center h-8 px-2">
                <UButton
                  :to="`/products/${product.id}`"
                  target="_blank"
                  label="Details"
                  icon="i-material-symbols-visibility-outline"
                />
                <UButton
                  icon="material-symbols-light-add-shopping-cart"
                  size="sm"
                  :disabled="isInBasket(product.id)"
                  color="primary"
                  variant="solid"
                  :label="isInBasket(product.id) ? 'Added' : 'Add to Cart'"
                  :trailing="false"
                  @click="addToBasketHandler(product)"
                />
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
