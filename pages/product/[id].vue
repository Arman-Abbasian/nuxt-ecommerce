<script setup lang="ts">
const state = ref({
  email: "",
  password: "",
});

async function onSubmit() {
  console.log(state);
}
</script>

<template>
  <UCard>
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput
          type="text"
          v-model="state.email"
          placeholder="email"
          class="text-slate-700"
        />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput type="text" v-model="state.password" placeholder="password" />
      </UFormGroup>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </UCard>
</template>
