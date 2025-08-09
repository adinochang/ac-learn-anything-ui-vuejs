import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';
import type { LoginRequestParams } from '../types/request';

const userStore = useUserStore();

export const loginService = async (params: LoginRequestParams) => {
  try {
    // create user using API
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
