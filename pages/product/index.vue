<script setup lang="ts">
import type { CategoryType } from "~/types/category";
import type { productType } from "../../types/product";
import { truncateText } from "~/utils/stringFUnc";
import { getProducts } from "~/services/products";

//filter type
type FilterOptionsTyps = {
  title: string;
  category: string;
  minPrice: number;
  maxPrice: number;
};
//---------------------
const products = ref<productType[]>([]);
const categories = ref<CategoryType[]>([]);
const query = ref<any>(null);

const filters: FilterOptionsTyps = reactive({
  title: "",
  category: "",
  minPrice: 0,
  maxPrice: 0,
});

// Router and Route for query string management
const router = useRouter();
const route = useRoute();

// Update the query string and send request to backend
const updateFilters = () => {
  const query = { ...filters };

  // Remove empty values from query
  Object.keys(query).forEach((key) => {
    if (!query[key]) delete query[key];
  });

  // Update the query string in the URL
  router.push({ query });

  // Send request to the backend with updated query params
  fetchFilteredProducts();
};

// Fetch the filtered products from the backend
const fetchFilteredProducts = async () => {
  // Build the query string from the route
  const query = new URLSearchParams(route.query).toString();

  // Fetch products from the backend using the query string
  // Replace `/api/products` with your backend URL
  const response = await fetch(`/api/products?${query}`);
  const data = await response.json();

  products.value = data; // Assume the backend returns a list of products
};

// Watch for changes in the route to refetch filtered products
watch(route, () => {
  fetchFilteredProducts();
});

// Load initial products on component mount
onMounted(() => {
  fetchFilteredProducts();
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
const selectedCategory = ref<CategoryType>({} as CategoryType);
categories.value = categoryData.value as CategoryType[];

//fetch products
const { getProductsData } = await getProducts();
products.value = getProductsData.value as productType[];
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
                class="form-control"
                placeholder="product name"
                aria-label="product name"
                aria-describedby="button-addon"
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
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
              placeholder="select a category"
              icon=""
              :name="selectedCategory.name"
            >
              <template #leading>
                <UAvatar :src="selectedCategory.image" size="sm" alt="avatar" />
              </template>
              <template #label>
                <span
                  v-if="selectedCategory.name"
                  class="truncate text-black ml-3"
                  >{{ selectedCategory.name }}</span
                >
                <span v-else>Select category</span>
              </template>
            </USelectMenu>
          </div>
          <!-- price range inputs -->
          <div class="col-12 flex align-middle justify-between gap-2">
            <UInput placeholder="min price" type="number" icon="bi bi-cash" />
            <UInput placeholder="max price" type="number" icon="bi bi-cash" />
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
                <NuxtLink to="#" class="btn btn-primary">more...</NuxtLink>
                <NuxtLink to="#" class="btn btn-primary">add to cart</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
