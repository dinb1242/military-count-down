import { axiosInstance } from "../interceptors/axios.interceptor";
import { WikiType } from "../enums/wiki-type.enum";

export default {
    update(data: {
        bbsId?: number,
        wikiContent: string,
        wikiType: WikiType
    }) {
        return axiosInstance.post(`/wiki`, data);
    },

    findOneWiki(bbsType: WikiType, bbsId: number) {
        return axiosInstance.get(`/wiki/${bbsType}/${bbsId}`);
    },

    findAllWikiRevisions(wikiId: number) {
        return axiosInstance.get(`/wiki/revision/many/${wikiId}`);
    },

    findOneWikiRevision(wikiRevisionId: number) {
        return axiosInstance.get(`/wiki/revision/one/${wikiRevisionId}`);
    },

    /**
     * 사건/사고 위키
     */

    createAccidentWiki(data: {
        wikiContent: string
    }) {
        return axiosInstance.post('/wiki/accident', {
            ...data
        })
    },

    updateAccidentWiki(data: {
        wikiContent: string
    }) {
      return axiosInstance.patch('/wiki/accident', data);
    },

    findOneAccidentWiki() {
      return axiosInstance.get('/accident/wiki');
    }
}