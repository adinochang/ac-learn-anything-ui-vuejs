<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    id: string;
    label: string;
    placeholder: string;
    disabled: boolean;
    options: string[];
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
    <select
      :id="id"
      v-model="value"
      :disabled="disabled"
      required
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :class="{ 'border-red-500 dark:border-red-500': error }"
    >
      <option disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>
