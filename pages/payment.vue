<script setup lang="ts">
import { z } from "zod";

type StateType = {
  name: string;
  active: boolean;
  bg: string;
};
const states: StateType[] = [
  { name: "Baden-Württemberg", active: true, bg: "red" },
  { name: "Bavaria", active: true, bg: "green" },
  { name: "Berlin", active: true, bg: "blue" },
  { name: "Brandenburg", active: true, bg: "yellow" },
  { name: "Bremen", active: true, bg: "green" },
  { name: "Hamburg", active: true, bg: "blue" },
  { name: "Hesse", active: true, bg: "red" },
  { name: "Lower Saxony", active: true, bg: "yellow" },
  { name: "Mecklenburg-Vorpommern", active: true, bg: "green" },
  { name: "North Rhine-Westphalia", active: true, bg: "blue" },
];

type PayementType = {
  name: string;
  lastname: string;
  state: StateType;
  address: string;
};
const recipientForm: PayementType = reactive({
  name: "",
  lastname: "",
  state: {} as StateType,
  address: "",
});
const discountCodee = ref("");

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const onSubmit = () => {
  console.log("Form submitted:", recipientForm);
};
const discounCodeHandler = () => {
  alert("code is not valid");
};
</script>

<template>
  <div class="max-w-md mx-auto">
    <div class="flex justify-between items-center">
      <!-- total payment -->
      <h2>subtotal: 1200$</h2>
      <!-- discount code -->
      <UInput
        v-model="discountCodee"
        name="q"
        class="p-2 max-w-64"
        placeholder="Enter discount code here ..."
        autocomplete="off"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #trailing>
          <UButton
            color="white"
            variant="link"
            :padded="false"
            icon="material-symbols:touch-app-outline"
            class="bg-blue-500 py-1 px-2"
            @click="discounCodeHandler"
          />
        </template>
      </UInput>
    </div>
    <!-- Recipient data -->
    <template>
      <UForm :state="recipientForm" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Name" name="name">
          <UInput v-model="recipientForm.name" />
        </UFormGroup>
        <UFormGroup label="Lastname" name="lastname">
          <UInput v-model="recipientForm.lastname" />
        </UFormGroup>
        <p>country: Germany</p>
        <USelectMenu
          v-model="recipientForm.state"
          :options="states"
          option-attribute="name"
          placeholder="select a state"
          searchable
          searchable-placeholder="search the state"
        >
          <template #option="{ option: states }">
            <span
              :class="[
                `bg-${states.bg}-400 inline-block h-2 w-2 flex-shrink-0 rounded-full`,
              ]"
              aria-hidden="true"
            />
            <span class="truncate">{{ states.name }}</span>
          </template>
        </USelectMenu>
        <UFormGroup label="Address" name="address">
          <UInput v-model="recipientForm.address" />
        </UFormGroup>
        <UButton type="submit">Submit</UButton>
      </UForm>
      <UButton type="submit"> Submit </UButton>
    </template>
    <!-- delivery type -->
    <div></div>
    <!-- payment type -->
    <div></div>
    <!-- payment button -->
    <div></div>
  </div>
</template>
