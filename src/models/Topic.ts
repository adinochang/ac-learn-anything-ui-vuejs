export enum TopicStatus {
  Inactive = 0,
  Active = 1,
}

export enum TopicLevel {
  Beginner = 10,
  Intermediate = 20,
  Advanced = 30,
}

export interface Topic {
  topicId: number;
  userId: number;
  topic: string;
  description: string;
  status: TopicStatus;
  level: TopicLevel;
}

export const getTopicLevelText = (level: number): string => {
  switch (level) {
    case TopicLevel.Beginner:
      return 'Beginner';
    case TopicLevel.Intermediate:
      return 'Intermediate';
    case TopicLevel.Advanced:
      return 'Advanced';
    default:
      return '';
  }
};
