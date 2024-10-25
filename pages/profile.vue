<script setup lang="ts">
import { useCheckUser } from "~/composable/useCheckUser";

const { checkUserData, checkUserError } = await useCheckUser();
console.log(checkUserData, checkUserError);
</script>
<template>
  <div>
    <p>name:{{}}</p>
    <p>name:{{}}</p>
    <p>name:{{}}</p>
    <p>name:{{}}</p>
    <p>name:{{}}</p>
  </div>
</template>
