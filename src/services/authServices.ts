import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';
import type { CreateUserParams, LoginRequestParams } from '../types/request';

const userStore = useUserStore();

export const loginService = async (params: LoginRequestParams) => {
  try {
    // login using API
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}user/login`,
      params
    );

    // persist created user
    userStore.setUser({
      userId: data.userId,
      userName: data.userName,
      token: data.token,
    });
  } catch (err: unknown) {
    throw err;
  }

  return true;
};

export const createUserService = async (
  params: CreateUserParams
): Promise<boolean> => {
  try {
    // create user using API
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}user/create`,
      params
    );

    // if user creation is successful, trigger the login service
    if (data.userId) {
      await loginService({
        email: params.email,
        password: params.password,
      });
    }
  } catch (err: unknown) {
    throw err;
  }

  return true;
};
