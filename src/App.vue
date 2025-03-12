<template>
  <div>
    <DashboardPage v-if="loggedIn" />
    <LoginPage v-else-if="loggingIn" @signup="loggingIn = false"  />
    <SignupPage v-else @login="loggingIn = true" />
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue';
import DashboardPage from './components/DashboardPage.vue';
import { useUserStore } from './stores/user.js';
import SignupPage from "@/components/SignupPage.vue";

export default {
  name: 'App',
  components: {
    SignupPage,
    LoginPage,
    DashboardPage
  },
  data() {
    return {
      loggingIn: true
    }
  },
  setup() {
    const userStore = useUserStore();
    return {userStore}
  },
  computed: {
    loggedIn() {
      return !!this.userStore.userId;
    }
  }
};
</script>
