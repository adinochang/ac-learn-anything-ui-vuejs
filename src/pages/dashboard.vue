<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useTopicStore } from '@/stores/useTopicStore';
  import { getUserTopicsService } from '@/services/topicServices';
  import DashboardTopicCard from '@/components/features/DashboardTopicCard.vue';
  import { PlusIcon } from '@heroicons/vue/24/outline';
  import { getErrorMessage } from '@utils/axios-error-handler';

  definePage({
    meta: {
      requiresAuth: true,
    },
  });

  const error = ref('');

  const topicStore = useTopicStore();

  onMounted(async () => {
    try {
      await getUserTopicsService();
    } catch (err: unknown) {
      error.value = getErrorMessage(err);
    }
  });
</script>

<template>
  <div
    id="home-view"
    class="p-4 sm:p-6 lg:p-8"
  >
    <header class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
        Your Learning Journey
      </h1>

      <p
        v-if="error"
        class="text-red-400 text-center mt-2"
      >
        {{ error }}
      </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <button
        id="add-subject-button"
        router
        class="bg-purple-600 text-white flex items-center justify-center p-6 rounded-3xl shadow-lg transition-transform transform hover:scale-105 duration-300 min-h-[150px]"
      >
        <div class="flex flex-col items-center">
          <PlusIcon class="h-6 w-6 text-white-900 mb-2" />
          <span class="text-xl font-bold">Add New Topic</span>
        </div>
      </button>
      <DashboardTopicCard
        v-for="(topic, index) in topicStore.topics"
        v-bind:key="topic.topicId"
        :topic="topic"
        :index="index"
      ></DashboardTopicCard>
    </div>
  </div>
</template>
