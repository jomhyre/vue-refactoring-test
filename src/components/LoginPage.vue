<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-md rounded p-6">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
              id="email"
              type="email"
              v-model="email"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
              id="password"
              type="password"
              v-model="password"
              required
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user.js';
import { loginApi } from '../api.js';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await loginApi(this.email, this.password);
        const userStore = useUserStore();
        userStore.setUser(response);
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>
