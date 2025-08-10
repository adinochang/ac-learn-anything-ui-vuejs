<script setup lang="ts">
  import type { Topic } from '@/models/Topic';
  import { getTopicLevelText } from '@/models/Topic';
  import { TailwindColours } from '@/types/colours.d';
  import { LightBulbIcon } from '@heroicons/vue/24/outline';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = defineProps<{
    topic: Topic;
    index: number;
  }>();
</script>

<template>
  <div
    class="subject-card relative p-6 rounded-3xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 duration-300 overflow-hidden"
    :class="[TailwindColours[index % TailwindColours.length]]"
  >
    <div class="flex items-center space-x-4">
      <div class="flex-shrink-0">
        <LightBulbIcon class="h-6 w-6 text-white-900" />
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {{ topic.topic }}
        </h2>
        <p class="text-sm text-gray-200 dark:text-gray-100">
          {{ topic.description }}
        </p>
        <p class="text-sm text-gray-200 dark:text-gray-100">
          ({{ getTopicLevelText(topic.level) }})
        </p>
      </div>
    </div>
  </div>
</template>
