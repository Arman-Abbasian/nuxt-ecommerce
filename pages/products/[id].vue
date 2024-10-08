<script setup lang="ts">
import { useRoute } from "vue-router";
import { getProduct } from "~/services/products";

//------------------
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const thumbsSwiper = ref(null);
const modules = [FreeMode, Navigation, Thumbs];
const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};
//-------------------

const route = useRoute();
const product = ref();
const productId = route.params.id as string;
const { getProductData } = await getProduct(productId);
console.log(getProductData?.value);
product.value = getProductData?.value;
console.log(product?.value);
</script>

<template>
  <div class="flex gap-3">
    <div class="swiper-container flex-3">
      <!-- main swiper section -->
      <swiper
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :spaceBetween="10"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        :modules="modules"
        class="mySwiper2 mainSwiper"
      >
        <swiper-slide v-for="(image, index) in product.images" :key="index">
          <img :src="image[index]" />
        </swiper-slide>
      </swiper>
      <!-- thumb swiper section -->
      <swiper
        @swiper="setThumbsSwiper"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        :modules="modules"
        class="mySwiper thumbSwiper"
      >
        <swiper-slide v-for="(image, index) in product.images" :key="index">
          <img :src="image[index]" />
        </swiper-slide>
      </swiper>
    </div>
    <!-- product details -->
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
  height: 500px; /* Adjust the height as needed */
  width: 50%;
}
.mainSwiper {
  height: 70%;
  width: 100%;
}
.thumbSwiper {
  height: 30%;
  width: 100%;
}
</style>
