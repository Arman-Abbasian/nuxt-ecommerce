<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import type { LoginType } from "~/types/login";
import { useLogin } from "~/composable/login";
import { useHostNavigate } from "~/composable/hostNavigate";

// definePageMeta({
//   middleware: ["login"],
// });

onMounted(async () => {
  await useHostNavigate();
});

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const formData: LoginType = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { loginData, loginError } = await useLogin(formData);
  if (loginData.value) {
    navigateTo("/");
  } else {
    alert("login failed");
  }
}
</script>

<template>
  <div class="">
    <UForm
      :schema="schema"
      :state="formData"
      class="space-y-4 max-w-sm mx-auto bg-slate-400 p-6 rounded-md"
      @submit="onSubmit"
    >
      <UFormGroup label="Email" name="email">
        <UInput v-model="formData.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="formData.password" type="password" />
      </UFormGroup>

      <UButton type="submit" class="w-full flex justify-center items-center">
        Submit
      </UButton>
    </UForm>
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
}
</style>
