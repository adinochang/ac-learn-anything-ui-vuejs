<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { loginService } from '@/services/authServices';
  import { getErrorMessage } from '@utils/axios-error-handler';
  import type { LoginRequestParams } from '@/types/request';

  const router = useRouter();

  const email = ref('');
  const password = ref('');
  const isLoading = ref(false);
  const error = ref('');

  const login = async () => {
    if (!email.value || !password.value) {
      error.value = 'Email and password are required';
      return;
    }

    isLoading.value = true;
    error.value = '';

    try {
      const formData: LoginRequestParams = {
        email: email.value,
        password: password.value,
      };

      await loginService(formData);

      // redirect to dashboard
      router.push('/dashboard');
    } catch (err: unknown) {
      error.value = getErrorMessage(err);
    } finally {
      isLoading.value = false;
    }
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
            v-model="email"
            placeholder="Email"
            required
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
          <button
            type="submit"
            @click="login"
            :disabled="isLoading"
            class="w-full p-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors duration-200"
          >
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        <p
          v-if="error"
          class="text-red-400 text-center mt-2"
        >
          {{ error }}
        </p>
        <div class="mt-4 text-center">
          <router-link to="/user/register/">
            Need an account? Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
