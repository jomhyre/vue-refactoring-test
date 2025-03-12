<template>
  <div>
    <LoginPage v-if="!loggedIn" />
    <DashboardPage v-else />
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue';
import DashboardPage from './components/DashboardPage.vue';
import { useUserStore } from './stores/user.js';

export default {
  name: 'App',
  components: {
    LoginPage,
    DashboardPage
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    loggedIn() {
      return !!this.userStore.user;
    }
  }
};
</script>
