<script setup lang="ts">
  import { useUserStore } from '@/stores/useUserStore';
  import type { User } from '@models/User';

  const userStore = useUserStore();

  const login = () => {
    const authenticatedUser: User = {
      userId: 123,
      userName: 'Adino',
    };
    userStore.setUser(authenticatedUser);
  };

  const logout = () => {
    userStore.logout();
  };
</script>

<template>
  <div class="p-4 bg-gray-600 text-amber-50 flex justify-between">
    <div
      id="navigation"
      class=""
    >
      AC Learn Anything
    </div>
    <div
      id="user"
      v-if="userStore.userId"
      class="flex justify-end items-center"
    >
      <div class="mr-4">{{ userStore.userName }}</div>
      <button
        id="logout-button"
        @click="logout"
        class="px-4 py-1 bg-red-500 text-white rounded-full font-bold shadow-md hover:bg-red-600 transition-colors duration-200"
      >
        Logout
      </button>
    </div>
    <div
      id="guest"
      v-if="!userStore.userId"
      class="flex justify-end items-center"
    >
      <button
        id="login-button"
        @click="login"
        class="px-4 py-1 bg-green-500 text-white rounded-full font-bold shadow-md hover:bg-green-600 transition-colors duration-200"
      >
        Login
      </button>
    </div>
  </div>
</template>
