<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const formState = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="formState"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormGroup label="Email" name="email">
      <UInput v-model="formState.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="formState.password" type="password" />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
