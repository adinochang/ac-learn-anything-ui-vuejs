<script setup lang="ts">
  import { useUserStore } from '@/stores/useUserStore';
  import { useRouter } from 'vue-router';
  import { ref, reactive } from 'vue';
  import { createUserService } from '@/services/authServices';
  import { getErrorMessage } from '@utils/axios-error-handler';
  import type { CreateUserParams } from '@/types/request';
  import FormInput from '@/components/common/FormInput.vue';

  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const isLoading = ref(false);

  const error = ref('');
  const errors = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const userStore = useUserStore();
  const router = useRouter();

  // logged in user cannot sign up
  if (userStore.isAuthenticated) {
    router.push('/dashboard');
  }

  const validateForm = () => {
    errors.name = name.value.trim() === '' ? 'Name is required.' : '';
    errors.email =
      email.value.trim() === ''
        ? 'Email is required.'
        : !/^\S+@\S+\.\S+$/.test(email.value)
          ? 'Email is invalid.'
          : '';
    errors.password =
      password.value.length < 4
        ? 'Password must be at least 4 characters.'
        : '';
    errors.confirmPassword =
      confirmPassword.value.length < 4
        ? 'Confirm Password must be at least 4 characters.'
        : '';

    if (password.value != confirmPassword.value) {
      error.value = 'Passwords do not match.';

      return false;
    }

    return Object.values(errors).every((error) => error === '');
  };

  const register = async () => {
    if (!validateForm()) {
      return;
    }

    isLoading.value = true;
    error.value = '';

    try {
      const formData: CreateUserParams = {
        name: name.value,
        email: email.value,
        password: password.value,
      };

      await createUserService(formData);

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
          Sign Up
        </h2>
        <form
          id="sign-up-form"
          @submit.prevent="register"
          class="space-y-4"
        >
          <FormInput
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            v-model="name"
            :error="errors.name"
          />

          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            v-model="email"
            :error="errors.email"
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="Enter a password"
            v-model="password"
            :error="errors.password"
          />

          <FormInput
            id="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            v-model="confirmPassword"
            :error="errors.confirmPassword"
          />

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full p-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors duration-200 mt-4"
          >
            {{ isLoading ? 'Creating user...' : 'Sign Up' }}
          </button>
        </form>
        <p
          v-if="error"
          class="text-red-400 text-center mt-2"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </main>
</template>
