import {type baseResponse, cacheRequest, type listDataType} from "@/api/index.ts";
import type {optionType} from "@/types";
import {useAxios} from "@/api/index.ts";

//
// export function tagOptionsApi():Promise<baseResponse<optionType[]>>{
//     return useAxios.get("/api/tag_names")
// }
export  const tagOptionsApi:()=>Promise<baseResponse<optionType[]>> = cacheRequest(()=>useAxios.get("/api/tag_names"))

export interface tagType{
    tag: string;
    count: number;
}

export function tagArticleListApi():Promise<baseResponse<listDataType<tagType>>>{
    return useAxios.get("/api/articles/tags")
}