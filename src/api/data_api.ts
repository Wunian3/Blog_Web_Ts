import type {baseResponse, paramsType} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";

export interface LoginDataType{
    date_list:  string[]
    login_data: number[]
    sign_data:  number[]
}


export interface loginDataRequest{
    date:number
}


export function dataLoginApi(params:loginDataRequest):Promise<baseResponse<LoginDataType>>{
return useAxios.get("/api/data_login", {params})
}

export interface statisticsType{
    user_count:number
    article_count:number
    message_count:number
    chat_group_count:number
    now_login_count:number
    now_sign_count:number
    flow_count:number
}

export function statisticsApi():Promise<baseResponse<statisticsType>>{
    return useAxios.get("/api/data_sum")
}

export interface weatherType{
    province:string,
    city:string,
    adcode?:string,
    weather:string,
    temperature:string,
    winddirection:string,
    windpower?:string,
    humidity?:string,
    reporttime?:string,
    temperature_float?:string,
    humidity_float?:string,
}

export function  weatherApi():Promise<baseResponse<weatherType>>{
    return useAxios.get("/api/gaode/weather")
}