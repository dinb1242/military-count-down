import { axiosInstance } from "../interceptors/axios.interceptor";

export default {
  create(data: { title: string; content: string }) {
    return axiosInstance.post("/project", data);
  },

  findAll() {
    return axiosInstance("/project");
  },

  findOne(id: number) {
    return axiosInstance(`/project/${id}`);
  },

  update(id: number, data: { title: string; content: string }) {
    return axiosInstance.patch(`/project/${id}`, data);
  },

  delete(id: number) {
    return axiosInstance.delete(`/project/${id}`);
  },

  upsertWiki(projectId: number, data: { wikiContent: string }) {
    return axiosInstance.post(`/project/wiki/${projectId}`, data);
  },

  findWiki(projectId: number) {
    return axiosInstance.get(`/project/wiki/${projectId}`);
  },

  findAllWikiRevision(projectWikiId: number) {
    return axiosInstance.get(`/project/wiki/revision/${projectWikiId}`);
  },
};