import {axiosInstance} from "../interceptors/axios.interceptor";
import {WikiType} from "../enums/wiki-type.enum";

export default {
    upsert(bbsId: number, data: {
        wikiContent: string,
        wikiType: WikiType
    }) {
        return axiosInstance.post(`/wiki/${bbsId}`, data);
    }
}