import {type baseResponse, cacheRequest, type paramsType, useAxios} from "@/api/index.ts";
import type {listDataType} from "@/api/index.ts";
import type {optionType} from "@/types";
import {Message} from "@arco-design/web-vue";
export interface imageIdType{
    id: number;
    name: string;
    path: string;
}

// export function imageIdListApi():Promise<baseResponse<imageIdType[]>>{
//     return useAxios.get("/api/images_name")
// }

export  const imageIdListApi:()=>Promise<baseResponse<imageIdType[]>> = cacheRequest(()=>useAxios.get("/api/images_name"))

export interface imageType{
    id: number
    created_at: string
    path: string
    hash: string
    name: string
    image_type: "本地"|"七牛云"
    bannerCount : number
    articleCount : number
}

export function imageListApi(params:paramsType):Promise<baseResponse<listDataType<imageType>>>{
    return useAxios.get("/api/images",{params:params})
}

export interface imagesUploadResponse{
    file_name:string
    is_success:boolean
    msg:string
}

export function uploadImageApi(file: File): Promise<baseResponse<string>> {
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.set("image", file);
        useAxios.post("/api/image", form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res:any)=>resolve(res)).catch(err=>reject(err))
    });
}

export async function onUploadImg(files: Array<File>, callback: (urls: Array<string>) => void): Promise<void> {
    let resList: baseResponse<string>[] = []

    try {
        resList = await Promise.all(files.map(file => uploadImageApi(file)))
    } catch (e) {
        // Message.error(e.message)
        return
    }

    const urlList: string[] = []
    resList.forEach(res => {
        if (res.code) {
            Message.error(res.msg)
            return
        }
        urlList.push(res.data)
    })
    callback(urlList)
}