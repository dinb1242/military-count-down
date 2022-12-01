import { axiosInstance } from '../interceptors/axios.interceptor';

export default {
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
