import { AxiosError } from 'axios';

export const getErrorMessage = (err: unknown): string => {
  if (err instanceof AxiosError) {
    if (err.response) {
      // The server responded with a status code outside the 2xx range
      const { data } = err.response;
      if (data && data.errors) {
        return `${JSON.stringify(data.errors)}`;
      }
      if (data && data.message) {
        return `${data.message}`;
      }
    } else {
      // The request was made but no response was received
      return `${err.message}`;
    }
  }

  // For other types of errors
  return 'Something went wrong. Please try again.';
};
