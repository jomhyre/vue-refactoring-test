// store/user.js

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    status: ''
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
      this.status = '';
    },
    setStatus(status) {
      this.status = status;
    }
  },
});
