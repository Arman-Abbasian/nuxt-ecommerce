<script setup lang="ts">
import type { productType } from "../types/product";
import { truncateText } from "~/utils/stringFUnc";

const { data, status, error, refresh, clear } = await useAsyncData(
  "products",
  () => $fetch("https://api.escuelajs.co/api/v1/products")
);
const products = data.value as productType[];
</script>
<template>
  <div class="container">
    <div class="row justify-content-center gx-3 gy-3">
      <div
        v-for="product in products"
        :key="product.id"
        class="card col-sm-6 col-md-4"
        style="width: 20rem"
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
</template>
