<script setup lang="ts">
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
    <div class="h-[20%]">
      <h1 class="text-center mb-4 text-3xl font-bold">About us</h1>
      <p class="text-center">
        We gift you trust, speed, and quality. Just experience shopping with us
        once.
      </p>
    </div>
    <UContainer
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4"
    >
      <UCard v-for="job in jobPositions" :key="job.id" class="overflow-hidden">
        <template #header>
          <Placeholder class="h-8" />
          <img :src="`/images/workers/${job.image}`" class="overflow-hidden" />
        </template>

        <Placeholder class="h-32" />
        {{ job.title }}
        <template #footer>
          <Placeholder class="h-8" />
          {{ job.contact }}
        </template>
      </UCard>
    </UContainer>
    <UContainer>
      <h1 class="text-center">Team Culture At Nuxt ecommerce</h1>
      <p>
        our team is the heart of everything we do. We’re a group of creative,
        driven, and customer-focused individuals who are passionate about
        delivering the best online shopping experience. Our culture is built on
        collaboration, innovation, and a shared commitment to excellence.
      </p>
    </UContainer>
  </div>
</template>
