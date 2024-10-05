<script setup lang="ts">
import { ref } from "vue";

const selectedOption = ref("");
console.log(selectedOption);
</script>

<template>
  <div>
    <label for="category">Choose a category:</label>
    <select id="category" v-model="selectedOption">
      <option value="" disabled>Select a category</option>
      <option value="technology">Technology</option>
      <option value="health">Health</option>
      <option value="finance">Finance</option>
      <option value="education">Education</option>
    </select>
    <p>Selected option: {{ selectedOption }}</p>
  </div>
</template>
