import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';
import { useTopicStore } from '@/stores/useTopicStore';
import type { GetTopicInfoParams } from '@/types/request';
import { createLanguageService } from 'typescript';

const userStore = useUserStore();
const topicStore = useTopicStore();

export const getUserTopicsService = async () => {
  try {
    topicStore.resetTopics();

    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}topic`, {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    });

    // persist created user
    topicStore.setTopics(data);
  } catch (err: unknown) {
    throw err;
  }

  return true;
};

export const getTopicSummaryService = async (
  params: GetTopicInfoParams
): Promise<string> => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}topic/summary`,
      params,
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      }
    );

    return data.message;
  } catch (err: unknown) {
    throw err;
  }
};
