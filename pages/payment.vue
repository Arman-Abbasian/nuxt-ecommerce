<script setup lang="ts">
import { string, z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
definePageMeta({
  middleware: ["auth"],
});
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
const stateNames = [
  "Baden-Württemberg",
  "Bavaria",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hesse",
  "Lower Saxony",
  "Mecklenburg-Vorpommern",
  "North Rhine-Westphalia",
] as const;

type PayementType = {
  name: string;
  lastname: string;
  state: StateType;
  address: string;
  shipping: "express" | "normal";
  payment: "paypal" | "mastercard" | "bitpay" | "visa";
};
const recipientForm: PayementType = reactive({
  name: "",
  lastname: "",
  state: {} as StateType,
  address: "",
  shipping: "normal",
  payment: "paypal",
});

const shippingOptions = [
  {
    value: "normal",
    label: "Normal",
  },
  {
    value: "express",
    label: "Express",
  },
];
const paymentOptions = [
  {
    value: "paypal",
    label: "/images/paymentMethods/paypal.png",
  },
  {
    value: "mastercard",
    label: "/images/paymentMethods/mastercard.png",
  },
  {
    value: "visa",
    label: "/images/paymentMethods/visa.png",
  },
  {
    value: "bitpay",
    label: "/images/paymentMethods/bitpay.png",
  },
];

const discountCodee = ref("");

const schema = z.object({
  name: z.string().min(2, "min 2 character").max(20, "max 20 character"),
  lastname: z.string().min(2, "min 2 character").max(30, "max 30 character"),
  state: z.object({
    name: z.enum(stateNames), // Validates that `name` matches one of the state names
    active: z.boolean(), // Validates that `active` is a boolean
    bg: z.string().nonempty(), // Validates that `bg` is a non-empty string
  }),
  address: z.string().min(20, "min 20 character").max(200, "max 200 character"),
  shipping: z.enum(["express", "normal"]),
  payment: z.enum(["paypal", "mastercard", "bitpay", "visa"]),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    schema.parse(recipientForm);
  } catch (error) {
    console.error("Validation error:", error);
  }
}
const discounCodeHandler = () => {
  alert("code is not valid");
};
</script>

<template>
  <div class="max-w-sm md:max-w-md mx-auto">
    <div class="flex justify-between items-center">
      <!-- total payment -->
      <h2>subtotal: 1200$</h2>
      <!-- discount code -->
      <UInput
        v-model="discountCodee"
        name="q"
        class="max-w-full"
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
            class="bg-blue-500 w-full h-full px-0 py-0"
            @click="discounCodeHandler"
          />
        </template>
      </UInput>
    </div>
    <!-- Recipient data -->
    <UForm
      :schema="schema"
      :state="recipientForm"
      class="space-y-4"
      @submit.prevent="onSubmit"
    >
      <div class="flex justify-between items-center gap-3">
        <UFormGroup label="Name" name="name">
          <UInput v-model="recipientForm.name" />
        </UFormGroup>
        <UFormGroup label="Lastname" name="lastname">
          <UInput v-model="recipientForm.lastname" />
        </UFormGroup>
      </div>
      <div class="flex gap-4 items-center">
        <img src="/images/flags/germany-flag.png" class="w-12 rounded-md" />
        <USelectMenu
          name="state"
          v-model="recipientForm.state"
          :options="states"
          option-attribute="name"
          placeholder="select a state"
          searchable
          searchable-placeholder="search the state"
          class="flex-1"
        >
          <template #option="{ option: states }">
            <span
              :class="[
                `bg-${states.bg}-400 inline-block h-2 w-2 flex-shrink-0 rounded-full`,
              ]"
              aria-hidden="true"
            ></
            <span class="truncate">{{ states.name }}</span>
          </template>
        </USelectMenu>
      </div>
      <UFormGroup label="Address" name="address">
        <UInput v-model="recipientForm.address" />
      </UFormGroup>
      <!-- delivery type -->
      <URadioGroup
        name="shipping"
        v-model="recipientForm.shipping"
        legend="Choose shipping options"
        :options="shippingOptions"
        :ui="{ fieldset: 'flex gap-4 items-center' }"
      />
      <!-- payment type -->
      <URadioGroup
        name="payment"
        v-model="recipientForm.payment"
        :options="paymentOptions"
        class="flex flex-row items-center gap-2"
        :ui="{ fieldset: 'flex gap-4 items-center' }"
      >
        <template #label="{ option }">
          <img :src="option.label" class="w-16 h-8" />
        </template>
      </URadioGroup>
      <UButton type="submit" class="w-full flex justify-center items-center"
        >pay: 1200$</UButton
      >
    </UForm>
  </div>
</template>
