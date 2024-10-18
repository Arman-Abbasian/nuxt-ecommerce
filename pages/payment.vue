<script lang="ts">
import { UInput } from "#build/components";
</script>
<template>
  <!-- total payment -->
  <h2>subtotal: 1200$</h2>
  <!-- discount code -->
  <UInput />
  <!-- user data -->
  <div>
    <template>
      <UFormGroup
        label="Email"
        :error="!email && 'You must enter an email'"
        help="This is a nice email!"
      >
        <template #default="{ error }">
          <UInput
            v-model="email"
            type="email"
            placeholder="Enter email"
            :trailing-icon="
              error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined
            "
          />
        </template>

        <template #error="{ error }">
          <span
            :class="[
              error
                ? 'text-red-500 dark:text-red-400'
                : 'text-primary-500 dark:text-primary-400',
            ]"
          >
            {{ error ? error : "Your email is valid" }}
          </span>
        </template>
      </UFormGroup>
    </template>
  </div>
  <!-- delivery type -->
  <div></div>
  <!-- payment type -->
  <div></div>
  <!-- payment button -->
  <div></div>
</template>
