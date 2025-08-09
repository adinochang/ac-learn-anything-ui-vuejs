import { defineStore } from 'pinia';
import type { Topic } from '@models/Topic';

export const useTopicStore = defineStore('topic', {
  // return an object to store state data
  state: () => ({
    topics: [] as Topic[] | null,
  }),
  getters: {
    topicCount: (state) => (state.topics ? state.topics.length : 0),
  },
  // functions to manipulate the state
  actions: {
    setTopics(data: Topic[]) {
      this.topics = data;
    },

    resetTopics() {
      this.topics = null;
    },
  },
  // persists data across page reloads
  persist: true,
});
