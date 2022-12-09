import {axiosInstance} from "../interceptors/axios.interceptor";
import {WikiType} from "../enums/wiki-type.enum";

export default {
    update(data: {
        bbsId: number,
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
    }
}