import type {baseResponse, listDataType, paramsType} from "@/api/index.ts";
import {useAxios} from "@/api/index.ts";

export interface feedBackCreateType{
    email: string;
    content: string;
}

export interface feedBackType{
    id?:number;
    content:string;
    created_at:string;
    email?:string;
}

export function feedbackCreateApi(data:feedBackCreateType):Promise<baseResponse<string>>{
    return useAxios.post("/api/feedback",data);
}

export function feedbackListApi(params?:paramsType):Promise<baseResponse<listDataType<feedBackType>>>{
    return useAxios.get("/api/feedback", {params});
}