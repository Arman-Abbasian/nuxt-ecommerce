<script setup lang="ts">
import type { CategoryType, GetCategoryRes } from "~/types/category";
import type { FilterOptionsTypes, productType } from "../../types/product";
import { truncateText } from "~/utils/stringFUnc";
import { getProducts } from "~/services/products";
import { useRouter, useRoute } from "vue-router";
import type { Avatar } from "#ui/types";

//---------------------
const products = ref<productType[]>([]);
const categories = ref<CategoryType[]>([]);
const selectedCategory = ref<CategoryType>({} as CategoryType);

console.log(selectedCategory);
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
watch(selectedCategory, () => {
  filters.categoryId = selectedCategory.value?.id;
  updateFilters();
});

// Load initial products on component mount
onMounted(() => {
  updateFilters();
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
categories.value = categoryRes.map((item) => {
  return { id: item.id, label: item.name, avatar: { src: item.image } };
});
// categories.value = categoryData.value as CategoryType[];
</script>

<template>
  <div class="container-xxl h-screen">
    <div class="row g-5 h-full">
      <!-- filter section -->
      <div class="col-md-3 bg-primary">
        <div class="row gap-4">
          <!-- search title -->
          <div class="col-6 col-sm-12">
            <div class="input-group">
              <input
                type="text"
                v-model="filters.title"
                class="form-control"
                placeholder="product name"
                aria-label="product name"
                aria-describedby="button-addon"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                @click="updateFilters"
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <!-- category select -->
          <div class="col-6 col-sm-12">
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
          <div class="row col-12 flex gap-2">
            <div class="col-6">
              <UInput
                placeholder="min price"
                v-model="filters.price_min"
                type="number"
                icon="bi bi-cash"
              />
            </div>
            <div class="col-6">
              <UInput
                placeholder="max price"
                v-model="filters.price_max"
                type="number"
                icon="bi bi-cash"
              />
            </div>
            <div>
              <UButton @click="updateFilters">filter price</UButton>
            </div>
          </div>
        </div>
      </div>
      <!-- products section -->
      <div class="col-md-9 bg-success h-full overflow-auto">
        <div class="row justify-content-center g-3 pt-2">
          <div
            v-for="product in products"
            :key="product.id"
            class="card col-sm-6 col-md-4"
            style="width: 25rem"
          >
            <img
              :src="product.images[0]"
              class="card-img-top"
              :alt="product.title"
            />
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">{{ truncateText(product.description) }}</p>
              <p>price: {{ product.price }}$</p>
              <div class="d-flex justify-content-between">
                <NuxtLink
                  :to="`/products/${product.id}`"
                  class="btn btn-primary"
                  >more...</NuxtLink
                >
                <NuxtLink to="#" class="btn btn-primary">add to cart</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
