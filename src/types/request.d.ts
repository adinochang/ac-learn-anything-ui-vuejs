export interface LoginRequestParams {
  email: string;
  password: string;
}

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface CreateTopicInfoParams {
  topic: string;
  description: string;
}

export interface GetTopicInfoParams {
  topic: string;
}
