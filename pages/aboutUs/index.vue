<script setup lang="ts">
import ImageCard from "~/common/ImageCard.vue";
import Cart from "~/common/ImageCard.vue";
import TextIcon from "~/common/TextIcon.vue";

type JobPositions = {
  id: number;
  title: string;
  image: string;
  contact: string;
};
const jobPositions: JobPositions[] = [
  {
    id: 1,
    title: "content manager",
    image: "content-manager.webp",
    contact: "+4911111111",
  },
  {
    id: 2,
    title: "customer support pecialist",
    image: "customer-support-pecialist.webp",
    contact: "+4911111111",
  },
  {
    id: 3,
    title: "data analyst ecommerce",
    image: "data-analyst-ecommerce.webp",
    contact: "+4911111111",
  },
  {
    id: 4,
    title: "ecommerce product manager",
    image: "ecommerce-product-manager.webp",
    contact: "+4911111111",
  },
  {
    id: 5,
    title: "SEO specialist",
    image: "SEO-specialist.webp",
    contact: "+4911111111",
  },
  {
    id: 6,
    title: "warehouse inventory manager",
    image: "warehouse-inventory-manager.webp",
    contact: "+4911111111",
  },
];
</script>
<template>
  <div class="container-xxl h-[calc(100vh-6rem)]">
    <div class="h-[80%] mb-4">
      <img
        src="/images/aboutus/aboutusBanner.webp"
        class="h-full w-screen object-cover object-center rounded-md"
      />
    </div>
    <div class="h-[20%] mb-8">
      <h1 class="text-center mb-4 text-3xl font-bold">About us</h1>
      <p class="text-center">
        We gift you trust, speed, and quality. Just experience shopping with us
        once.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
      <ImageCard
        v-for="job in jobPositions"
        :key="job.id"
        class="overflow-hidden"
        :src="`/images/workers/${job.image}`"
      >
        <template v-slot:body>
          <TextIcon
            icon-name="material-symbols-light:person"
            :text="job.title"
          />
        </template>
        <template v-slot:footer>
          <TextIcon
            icon-name="material-symbols-light:mobile-friendly-outline"
            :text="job.contact"
          />
        </template>
      </ImageCard>
    </div>
    <div class="mb-4">
      <h1 class="text-center">Team Culture At Nuxt ecommerce</h1>
      <p>
        our team is the heart of everything we do. We’re a group of creative,
        driven, and customer-focused individuals who are passionate about
        delivering the best online shopping experience. Our culture is built on
        collaboration, innovation, and a shared commitment to excellence.
      </p>
    </div>
    <!-- cotact us -->
    <div
      class="flex flex-col w-full rounded-md overflow-hidden border-1 border-purple-300"
    >
      <div class="w-full">
        <img
          src="/images/others/contact-us.webp"
          class="w-full h-60 object-center"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="bg-primary-400">
          <h1 class="text-center">contact us</h1>
          <TextIcon
            icon-name="material-symbols-light:phone-enabled-outline-sharp"
            text="+491111111"
          />
          <TextIcon
            icon-name="material-symbols-light:stacked-email-outline"
            text="nuxt.ecommerce@gmail.com"
          />
          <TextIcon
            icon-name="material-symbols-light:nest-heat-link-gen-3-outline"
            text="www.instagram.com"
          />
          <TextIcon
            icon-name="material-symbols-light:location-on-outline"
            text="Germany-Berlin-..."
          />
        </div>
        <div class="bg-secondary-600">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d310847.3190256848!2d13.095097421551865!3d52.506386167430094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e373f035901%3A0x42120465b5e3b70!2sBerlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1731654801709!5m2!1sen!2sus"
            width="100%"
            height="100%"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
