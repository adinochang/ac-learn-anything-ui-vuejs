<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { getTopicSummaryService } from '@/services/topicServices';
  import { getErrorMessage } from '@utils/axios-error-handler';
  import type { GetTopicInfoParams } from '@/types/request';
  import { TopicLevel, getTopicLevelText } from '@/models/Topic';
  import FormInput from '@/components/common/FormInput.vue';
  import FormSelect from '@/components/common/FormSelect.vue';
  import ConfirmYesNoModal from '@/components/modals/ConfirmYesNoModal.vue';
  import InformationModal from '@/components/modals/InformationModal.vue';

  definePage({
    meta: {
      requiresAuth: true,
    },
  });

  const newTopic = ref('Jazz Music');
  const newTopicLevel = ref('');
  const isLoading = ref(false);

  const error = ref('');

  const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

  const confirmModalVisible = ref(false);
  const confirmModalMessage = ref('');
  const infoModalVisible = ref(false);
  const infoModalMessage = ref('');
  let resolvePromise:
    | ((value: boolean | PromiseLike<boolean>) => void)
    | undefined;

  const router = useRouter();

  const validateForm = () => {
    if (newTopic.value.length < 5) {
      error.value = 'Subject must have at least 5 characters.';

      return false;
    }

    return true;
  };

  const createTopic = async () => {
    if (!validateForm()) {
      return;
    }

    isLoading.value = true;
    error.value = '';

    try {
      // confirm user wants to learn about topic
      const topicConfirmation = await promptConfirmation(
        `Are you sure you want to learn ${newTopic.value} at ${newTopicLevel.value} level?`
      );

      // if confirmed, get a topic summary from AI
      if (topicConfirmation) {
        const params: GetTopicInfoParams = {
          topic: newTopic.value,
        };
        // call topic summary service
        const topicSummary = await getTopicSummaryService(params);

        // ask for confirmation again
        const summaryConfirmation = await promptConfirmation(
          `Here's what I found about ${newTopic.value}. Is this what you were looking for?\n\n${topicSummary}`
        );

        // if confirmed again, proceed to create topic
        if (summaryConfirmation) {
          // call create topic service

          // prompt an information message
          await promptInfo(
            'Subject has been created. Click on the Subject card in your dashboard to view deatailed lesson plans and important terms.'
          );

          // redirect to dashboard
          router.push('/dashboard');
        }
      }
    } catch (err: unknown) {
      error.value = getErrorMessage(err);
    } finally {
      isLoading.value = false;
    }
  };

  const promptConfirmation = (message: string): Promise<boolean> => {
    confirmModalMessage.value = message;
    confirmModalVisible.value = true;

    // Return a new Promise that will be resolved later
    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  // This function is the event handler for the modal's response
  const confirmationResponse = (result: boolean) => {
    confirmModalVisible.value = false;

    if (resolvePromise) {
      resolvePromise(result);
    }
  };

  const promptInfo = (message: string): Promise<boolean> => {
    infoModalMessage.value = message;
    infoModalVisible.value = true;

    // Return a new Promise that will be resolved later
    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  };

  const infoResponse = (result: boolean) => {
    infoModalVisible.value = false;

    if (resolvePromise) {
      resolvePromise(result);
    }
  };
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div
      id="new-topic-view"
      class="flex items-center justify-center min-h-[calc(100vh-100px)]"
    >
      <div
        class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8"
      >
        <h2
          class="text-3xl font-bold text-center mb-6 text-blue-600 dark:text-blue-400"
        >
          New Subject
        </h2>
        <form
          id="sign-up-form"
          @submit.prevent="createTopic"
          class="space-y-4"
        >
          <FormInput
            id="topic"
            label=""
            type="text"
            placeholder="What do you want to learn?"
            v-model="newTopic"
            :disabled="isLoading"
          />

          <FormSelect
            id="level"
            label="My knowledge in this subject is"
            :options="levelOptions"
            placeholder="Select a level"
            v-model="newTopicLevel"
            :disabled="isLoading"
          />

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full p-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors duration-200 mt-4"
          >
            {{ isLoading ? 'AI is thinking...' : 'Submit' }}
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

    <ConfirmYesNoModal
      id="confirmation-modal"
      :message="confirmModalMessage"
      :isVisible="confirmModalVisible"
      @response="confirmationResponse"
    ></ConfirmYesNoModal>

    <InformationModal
      id="information-modal"
      :message="infoModalMessage"
      :isVisible="infoModalVisible"
      @response="infoResponse"
    ></InformationModal>
  </main>
</template>
