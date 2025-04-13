import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index.ts";

export interface chatType{
    addr?:string,
    avatar:string,
    content:string,
    created_at:string,
    id?:number
    ip?:string,
    is_group?:boolean,
    msg_type:number, //1是系统 2是文本 7离开
    nick_name:string,

    isMe:boolean,
}

export function chatRecordApi(params:paramsType):Promise<baseResponse<listDataType<chatType>>>{
    return useAxios.get('/api/chat_groups_records', {params})
}
export function chatDeleteApi(id_list:number[]):Promise<baseResponse<string>>{
    return useAxios.delete('/api/chat_groups_records', {data:{id_list}})
}

export interface chatGroupConfigType{
    isAnonymous:boolean,
    isShowTime:boolean,
    defaultLimit:number,
    contentLength:number,
    welcomeTitle:string,
    isOnlinePeople:boolean,
    isSendImage:boolean,
    isSendFile:boolean,
    isMd:boolean,
}

export interface chatMessageType{
    avatar:string
    content:string
    created_at:string
    msg_type:number
    nick_name:string
    online_count:number,
}