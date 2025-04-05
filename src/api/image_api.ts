import {type baseResponse, useAxios} from "@/api/index.ts";

export interface imageIdType{
    id: number;
    name: string;
    path: string;
}

export function imageIdListApi():Promise<baseResponse<imageIdType[]>>{
    return useAxios.get("/api/images_name")
}