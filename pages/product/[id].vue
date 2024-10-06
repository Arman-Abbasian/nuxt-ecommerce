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
console.log(getProductData.value);
product.value = getProductData.value;
console.log(product.value);
</script>

<template>
  <div class="swiper-container">
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
      <swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
      ><swiper-slide
        ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
      /></swiper-slide>
    </swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="10"
      :slidesPerView="4"
      :freeMode="true"
      :watchSlidesProgress="true"
      :modules="modules"
      class="mySwiper thumbSwiper"
    >
      <swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-1.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-2.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-3.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-4.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-5.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-6.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-7.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-8.jpg" /></swiper-slide
      ><swiper-slide
        ><img
          src="https://swiperjs.com/demos/images/nature-9.jpg" /></swiper-slide
      ><swiper-slide
        ><img src="https://swiperjs.com/demos/images/nature-10.jpg"
      /></swiper-slide>
    </swiper>
  </div>
</template>
<style scoped>
.swiper-container {
  display: flex;
  height: 500px; /* Adjust the height as needed */
}

.mainSwiper {
  flex: 3;
}

.thumbSwiper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
