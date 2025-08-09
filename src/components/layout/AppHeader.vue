<script setup lang="ts">
  import { useUserStore } from '@/stores/useUserStore';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const router = useRouter();

  const logout = () => {
    userStore.logout();

    router.push('/');
  };
</script>

<template>
  <div class="p-4 bg-gray-600 text-amber-50 flex justify-between">
    <div
      id="navigation"
      class=""
    >
      <router-link to="/">AC Learn Anything</router-link>
    </div>
    <div
      id="user"
      v-if="userStore.isAuthenticated"
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
  </div>
</template>
