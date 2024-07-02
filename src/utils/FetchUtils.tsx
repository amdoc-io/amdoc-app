import { AxiosRequestConfig } from "axios";

export const createHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  } as AxiosRequestConfig;
};
