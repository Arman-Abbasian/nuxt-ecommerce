<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { productType } from "~/types/product";

const route = useRoute();
const productId = computed(() => route.params.id as string);
const product = reactive<productType>({
  id: null,
  title: "",
  price: null,
  description: "",
  category: null,
  images: [],
});
const loading = ref(true); // Loading state

const fetchProduct = async (id: string) => {
  loading.value = true;
  const { data: getProductData, error: getProductError } = await useAsyncData(
    "getProduct",
    () => $fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
  );
  if (getProductData.value) {
    Object.assign(product, {
      id: getProductData.value.id,
      title: getProductData.value.title,
      price: getProductData.value.price,
      description: getProductData.value.description,
      category: getProductData.value.category,
      images: getProductData.value.images,
    });
  } else {
    console.error("Failed to fetch product:", getProductError);
  }
  loading.value = false; // Data loaded
};

// Watch for changes to productId and re-fetch product data
watch(productId, async (newId) => {
  await fetchProduct(newId);
});

// Initial fetch on mount
onMounted(() => fetchProduct(productId.value));
</script>

<template>
  <div v-if="loading">Loading product details...</div>
  <div class="flex gap-3" v-else-if="product.id">
    <div class="swiper-container flex-3">
      <swiper
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :spaceBetween="10"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="[FreeMode, Navigation, Thumbs]"
        class="mySwiper2 mainSwiper"
      >
        <swiper-slide v-for="(image, index) in product.images" :key="index">
          <img :src="image" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="flex-1">
      <h1>{{ product.title }}</h1>
      <h2>{{ product.price }}</h2>
      <h3>{{ product.category.name }}</h3>
      <p>{{ product.description }}</p>
      <button>add to basket</button>
    </div>
  </div>
</template>

<style scoped>
.swiper-container {
  height: 500px;
  width: 50%;
}
.mainSwiper {
  height: 70%;
  width: 100%;
}
</style>
