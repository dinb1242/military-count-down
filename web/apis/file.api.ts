import { axiosInstance } from "../interceptors/axios.interceptor";
import { BbsType } from "../enums/bbstype.enum";

export default {
  upload(bbsType: BbsType, bbsId: number, formData: FormData) {
    return axiosInstance.post(`/file/upload/${bbsType}/${bbsId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  markdownUpload(formData: FormData) {
    return axiosInstance.post('/file/markdown/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }
};
