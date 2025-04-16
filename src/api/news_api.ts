import {type baseResponse, useAxios} from "@/api/index.ts";

export interface newsType{
    hot:string
    index:string|number
    url:string
    title:string
    mobil_url?:string
}

export interface newsParamsType{
    source:string
    size:number
}

export function newsListApi(params:newsParamsType):Promise<baseResponse<newsType[]>>{
    return useAxios.get("/api/news",{params})
}