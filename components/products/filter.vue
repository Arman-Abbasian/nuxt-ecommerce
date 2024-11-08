<script setup lang="ts">
import type { CategoryType, GetCategoryRes } from "~/types/category";
import type { Avatar } from "#ui/types";
import type { FilterOptionsTypes } from "~/types/product";

const props = defineProps<{
  filters: FilterOptionsTypes;
  updateFilters: () => void;
}>();
const emits = defineEmits(["selectedCategory:selectedCategory"]);
const categories = ref<CategoryType[]>([]);
const selectedCategory = ref<CategoryType>({} as CategoryType);
//fetch categories
const {
  data: categoryData,
  status: categoryStatus,
  error: errorStatus,
} = await useAsyncData<GetCategoryRes[]>("categories", () =>
  $fetch(`https://api.escuelajs.co/api/v1/categories`)
);
watch(selectedCategory, () => {});
const slicedCategories: GetCategoryRes[] =
  categoryData.value?.slice(0, 5) || [];

categories.value = slicedCategories.map((item) => {
  return { id: item.id, label: item.name, avatar: { src: item.image } };
});
const filterPriceButtonDisabledHandler = () => {
  if (
    props.filters.price_max === 0 ||
    props.filters.price_min > props.filters.price_max
  ) {
    return true;
  }
};
</script>
<template>
  <div class="w-full md:h-full md:w-1/5">
    <div class="flex flex-col gap-4">
      <!-- search title -->
      <div class="w-48">
        <UInput
          v-model="props.filters.title"
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
              :onClick="props.updateFilters"
            />
          </template>
        </UInput>
      </div>
      <!-- category select -->
      <div class="w-48">
        <USelectMenu
          v-model="selectedCategory"
          :options="categories"
          searchable
          placeholder="Select a category"
        >
          <template #leading>
            <UAvatar
              v-if="selectedCategory.avatar"
              v-bind="(selectedCategory.avatar as Avatar)"
              size="xs"
            />
            <UAvatar v-else src="/images/icons/category_icon.png" size="xs" />
          </template>
          <template #option-empty="{ query }">
            <q>{{ query }}</q> not found
          </template>
        </USelectMenu>
      </div>
      <!-- price range inputs -->
      <div class="w-48 flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <div>
            <UInput
              placeholder="min price"
              v-model="filters.price_min"
              type="number"
              icon="material-symbols-attach-money-rounded"
              class=""
            />
          </div>
          <div>
            <UInput
              placeholder="max price"
              v-model="filters.price_max"
              type="number"
              icon="material-symbols-attach-money-rounded"
            />
          </div>
        </div>
        <div>
          <UButton
            :onClick="props.updateFilters"
            icon="material-symbols-attach-money"
            :disabled="filterPriceButtonDisabledHandler()"
            class="w-full"
            >filter</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
