import { defineStore } from 'pinia';
import type { User } from '@models/User';

export const useUserStore = defineStore('user', {
  // return an object to store state data
  state: () => ({
    userId: null as number | null,
    userName: null as string | null,
  }),
  // functions to manipulate the state
  actions: {
    setUser(data: User) {
      this.userId = data.userId;
      this.userName = data.userName;
    },
    logout() {
      this.userId = null;
      this.userName = null;
    },
  },
  // persists data across page reloads
  persist: true,
});
