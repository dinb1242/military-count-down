import { axiosInstance } from '../interceptors/axios.interceptor';

export default {
  checkEmail(data: { email: string }) {
    return axiosInstance.post('/user/check', data);
  },

  signIn(data: { email: string, password: string }) {
    return axiosInstance.post('/auth/sign-in', data);
  },

  signOut() {
    return axiosInstance.post('/auth/sign-out');
  },

  checkToken() {
    return axiosInstance.post('/auth/check', null);
  }
};