<script setup lang="ts">
  import { useUserStore } from '@/stores/useUserStore';
  import { useRouter } from 'vue-router';
  import type { User } from '@models/User';

  const userStore = useUserStore();
  const router = useRouter();

  const login = () => {
    const authenticatedUser: User = {
      userId: 123,
      userName: 'Adino',
    };
    userStore.setUser(authenticatedUser);

    router.push('/dashboard');
  };
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div
      id="auth-view"
      class="flex items-center justify-center min-h-[calc(100vh-100px)]"
    >
      <div
        class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
      >
        <h2
          class="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400"
        >
          Login
        </h2>
        <form
          id="login-form"
          class="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            required
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
          <input
            type="password"
            placeholder="Password"
            required
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
          <button
            type="submit"
            @click="login"
            class="w-full p-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <div class="mt-4 text-center">
          <a
            href="#"
            class="text-sm text-blue-500 hover:underline"
          >
            Need an account? Sign Up
          </a>
        </div>
      </div>
    </div>
  </main>
</template>
