import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    email: null,
    status: null
  }),
  actions: {
    setUser({userId, email, status}) {
      if (!userId) {
        throw new Error("userId is null");
      }

      if (!email) {
        throw new Error("email is null");
      }

      this.userId = userId;
      this.email = email;
      this.status = status;
    },
    clearUser() {
      this.userId = null;
      this.email = null;
      this.status = null;
    },
    setStatus(status) {
      this.status = status
    }
  },
});
