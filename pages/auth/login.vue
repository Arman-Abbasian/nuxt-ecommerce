<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleSubmit = () => {
  emailError.value = "";
  passwordError.value = "";

  if (!validateEmail(email.value)) {
    emailError.value = "Please enter a valid email address.";
  }

  if (password.value.length < 6) {
    passwordError.value = "Password must be at least 6 characters long.";
  }

  if (!emailError.value && !passwordError.value) {
    // Handle successful login
    console.log("Login successful:", {
      email: email.value,
      password: password.value,
    });
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
            />
            <div v-if="emailError" class="text-danger">{{ emailError }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
            />
            <div v-if="passwordError" class="text-danger">
              {{ passwordError }}
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
}
</style>
