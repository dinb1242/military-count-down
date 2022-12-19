import axios from "axios";
import { NEXT_PUBLIC_ENDPOINT } from "../constants/api.constant";
import { ACCESS_TOKEN } from '../constants/token.constants';
import { Cookies } from 'next/dist/server/web/spec-extension/cookies';

export const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_ENDPOINT,
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authorization = localStorage.getItem(ACCESS_TOKEN);
    if (authorization) {
      config.headers = {
        'Authorization': 'Bearer ' + authorization
      };
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
)

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
)
