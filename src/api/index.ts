import axios from "axios";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue";
import type {optionType} from "@/types";

export const useAxios = axios.create({
    baseURL: ""
})

export interface baseResponse<T> {
    code: number
    data: T
    msg: string
}
export interface optionsResponse<T> {
    label:string
    value:T
}
export interface listDataType<T>{
    count: number
    list:T[]
}

export interface paramsType {
    page?: number
    limit?: number
    key?: string
    sort?: string

}

useAxios.interceptors.request.use((config) => {
    const store = useStore()
    config.headers["token"] = store.userInfo.token
    return config
})

useAxios.interceptors.response.use((response) => {
    if (response.status !== 200) {
        // 失败的
        console.log("服务失败", response.status)
        Message.error(response.statusText)
        return Promise.reject(response.statusText)
    }
    return response.data
}, (err) => {
    console.log("服务错误", err)
    Message.error(err.message)
    return Promise.reject(err.message)
})

export function defaultDeleteApi<T extends number|string>(url:string ,idList:T[]):Promise<baseResponse<string>> {
    return useAxios.delete(url,{
        data:{
            id_list: idList,
        },
    })
}

export function defaultOptionApi(url:string,params?:paramsType):Promise<baseResponse<optionType[]>> {
return useAxios.get(url,{params})
}

export function cacheRequest<T>(func:(...args: any)=>Promise<T>):() => Promise<T>{
    let lastRequestTime: number = 0; //存储时间
    let cacheData: T|null = null ;
    let currentRequest: Promise<T> | null= null;
    return function () {
        const currentTime:number = Date.now()
        const timeDiff:number = currentTime-lastRequestTime

        if (timeDiff<1000 && cacheData){
            return Promise.resolve(cacheData)
        }
        if(!currentRequest){
            currentRequest = func(...arguments).then((res:T)=>{
                //更新数据和时间
                lastRequestTime = currentTime
                cacheData = res
                currentRequest = null //重置
                return res
            })
        }
        return currentRequest
    }
}