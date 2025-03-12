<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-md rounded p-6">
      <h2 class="text-2xl font-bold mb-4 text-center">Dashboard</h2>
      <p class="text-gray-700 mb-4">Welcome, {{ userStore.email }}!</p>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
          Update Status
        </label>
        <input
            id="status"
            type="text"
            v-model="statusInput"
            placeholder="Enter new status..."
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button @click="updateStatus" class="mt-2 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Update
        </button>
      </div>
      <p v-if="userStore.status" class="text-gray-700 mb-4">Current Status: {{ userStore.status }}</p>
      <button @click="logout" class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user.js';
import {updateUserStatus} from "@/api.js";

export default {
  name: 'DashboardPage',
  data() {
    return {
      statusInput: ''
    };
  },
  setup() {
    const userStore = useUserStore();
    return {userStore}
  },
  methods: {
    async updateStatus() {
      if (!this.statusInput.trim()) {
        alert("Status cannot be empty.");
        return;
      }
      try {
        const response = await updateUserStatus(this.userStore.userId, this.statusInput);
        this.userStore.setStatus(response.status);
        this.statusInput = '';
      } catch (error) {
        alert(error.message);
      }
    },
    logout() {
      const userStore = useUserStore();
      userStore.clearUser();
    }
  }
};
</script>
