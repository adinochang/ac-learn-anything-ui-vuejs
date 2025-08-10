import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';
import { useTopicStore } from '@/stores/useTopicStore';
import type {
  CreateTopicInfoParams,
  GetTopicInfoParams,
} from '@/types/request';
import { createLanguageService } from 'typescript';
import type { Topic } from '@/models/Topic';

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

    topicStore.setTopics(data);
  } catch (err: unknown) {
    throw err;
  }

  return true;
};

export const createUserTopicService = async (params: CreateTopicInfoParams) => {
  try {
    // call create topic endpoint
    const newTopic: Topic = await axios.post(
      `${import.meta.env.VITE_API_URL}topic/create`,
      params,
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      }
    );

    // add new topic to topic store
    topicStore.addTopic(newTopic);
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
