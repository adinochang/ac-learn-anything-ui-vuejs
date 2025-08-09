<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    id: string;
    label: string;
    type: string;
    placeholder: string;
    modelValue: string;
    error?: string;
  }>();

  const emit = defineEmits(['update:modelValue']);

  // Computed property for v-model
  const value = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    },
  });
</script>

<template>
  <div>
    <label
      :for="id"
      class="block text-white-700 text-sm font-bold mb-2"
    >
      {{ label }}
      <span
        v-if="error"
        class="text-red-500 text-sm mt-1 ml-2"
      >
        {{ error }}
      </span>
    </label>
    <input
      :type="type"
      :id="id"
      v-model="value"
      :placeholder="placeholder"
      required
      class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
      :class="{ 'border-red-500 dark:border-red-500': error }"
    />
  </div>
</template>
