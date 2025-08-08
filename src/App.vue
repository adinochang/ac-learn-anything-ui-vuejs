<script setup lang="ts">
  import AppHeader from './components/layout/AppHeader.vue';
</script>

<template>
  <AppHeader></AppHeader>

  <div
    class="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen antialiased"
  >
    <router-view></router-view>
  </div>
</template>
