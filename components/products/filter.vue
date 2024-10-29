<script setup lang="ts">
import type { CategoryType } from "~/types/category";
import type { Avatar } from "#ui/types";

const props = defineProps({
  filters: {
    type: Object,
    default() {
      return {
        title: "",
        categoryId: "",
        price_min: 0,
        price_max: 0,
      };
    },
  },
  selectedCategory: {
    type: Object,
    default: "",
  },
  updateFilters: {
    type: Function,
    retquired: true,
  },
});
const categories = ref<CategoryType[]>([]);

//fetch categories
const {
  data: categoryData,
  status: categoryStatus,
  error: errorStatus,
} = await useAsyncData<CategoryType[]>("categories", () =>
  $fetch(`https://api.escuelajs.co/api/v1/categories`)
);
const categoryRes = categoryData.value as CategoryType[];
categories.value = categoryRes?.map((item) => {
  return { id: item.id, label: item.label, avatar: item.avatar };
});
</script>
<template>
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
              onClick="updateFilters()"
            />
          </template>
        </UInput>
      </div>
      <!-- category select -->
      <div class="w-44">
        <USelectMenu
          v-bind="selectedCategory"
          :options="categories"
          searchable
          placeholder="Select a category"
        >
          <template #leading>
            <UAvatar v-bind="(selectedCategory.avatar as Avatar)" size="xs" />
          </template>
          <template #option-empty="{ query }">
            <q>{{ query }}</q> not found
          </template>
        </USelectMenu>
      </div>
      <!-- price range inputs -->
      <div class="w-full flex flex-col gap-2">
        <div class="flex items-center justify-between">
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
        </div>
        <div>
          <UButton onClick="updateFilters" icon="material-symbols-attach-money"
            >filter</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
