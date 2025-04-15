import type {listDataType,baseResponse,paramsType,} from "@/api/index.ts";
import  {useAxios} from "@/api/index.ts";

export interface promotionType{
    created_at:string
    href:string
    id:number
    images:string
    is_show:boolean
    title:string
}

export function promotionListApi(params?:paramsType):Promise<baseResponse<listDataType<promotionType>>>{

    return useAxios.get("/api/adts",{
        params:params,headers:{
        "Referer":location.pathname,
        }})
}

export interface promotionCreateType{
    href:string
    images:string
    is_show:boolean
    title:string
    id?:number
}

export const defaultPromotionForm={
    href: "",
    images: "",
    is_show: false,
    title: "",
}

export function promotionCreateApi(data:promotionCreateType):Promise<baseResponse<string>>{
    return useAxios.post("/api/adts",data)
}
export function promotionUpdateApi(id:number,data:promotionCreateType):Promise<baseResponse<string>>{
    return useAxios.put("/api/adts/"+id.toString(),data)
}