import { axiosInstance } from "../interceptors/axios.interceptor";

export default {
  create(data: { name: string; devPart: string; projects: string[] }) {
    return axiosInstance.post("/coworker", data);
  },

  findAll() {
    return axiosInstance.get("/coworker");
  },

  findOne(id: number) {
    return axiosInstance.get(`/coworker/${id}`);
  },

  update(
    id: number,
    data: {
      name: string;
      devPart: string;
      projects: string[];
    }
  ) {
    return axiosInstance.patch(`/coworker/${id}`, data);
  },

  delete(id: number) {
    return axiosInstance.delete(`/coworker/${id}`);
  },

  upsertWiki(
    coworkerId: number,
    data: {
      wikiContent: string;
    }
  ) {
    return axiosInstance.post(`/coworker/wiki/${coworkerId}`, data);
  },

  findWiki(coworkerId: number) {
    return axiosInstance.get(`/coworker/wiki/${coworkerId}`);
  },

  findAllWikiRevision(coworkerWikiId: number) {
    return axiosInstance.get(`/coworker/wiki/revision/${coworkerWikiId}`);
  },
};