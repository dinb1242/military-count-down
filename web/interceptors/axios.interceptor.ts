import axios from 'axios';
import { ENDPOINT } from '../constants/api.constant';

export const axiosInstance = axios.create({
  baseURL: ENDPOINT,
  timeout: 3000,
})

axiosInstance.interceptors.request.use(
  (config) => {
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
