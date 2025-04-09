import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index.ts";

export interface logRequest extends paramsType{
    level?:number
    type?:number
    ip?:string
    userID?:number
    addr?:string
    date?:string
    status?: boolean | ""
    userName?:string

}

export interface logType{
    readonly id:number
    created_at:string
    updated_at:string
    ip:string
    addr:string
    level:string
    title:string
    content:string
    userID:string
    userName:string
    serviceName:string
    status:boolean
    type:string
    readStatus:boolean
}

export function logListApi(params:logRequest): Promise<baseResponse<listDataType<logType>>>{
    return useAxios.get("/api/logs/v2", {params:params})
}
export function logReadApi(id:number): Promise<baseResponse<string>>{
    return useAxios.get("/api/logs/v2/read", {params:{id:id}})
}