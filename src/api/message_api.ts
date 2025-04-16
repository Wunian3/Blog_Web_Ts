import {type baseResponse, type listDataType, type paramsType, useAxios} from "@/api/index.ts";

export interface messageParams extends paramsType{
    nickName?: string;
}


export interface messageType{
    userName:string
    nickName:string
    userID:number
    avatar:string
    count:number
}
export interface messageRecordType{
    id:number,
    content:string
    created_at:string
    message_count:number
    rev_user_avatar:string
    rev_user_id:number
    rev_user_nick_name:string
    send_user_avatar:string
    send_user_id:number
    send_user_nick_name:string
    isMe:boolean
    // isMe?:boolean
}

export function messageUserListApi(params?:messageParams):Promise<baseResponse<listDataType<messageType>>>{
    return useAxios.get("/api/message_users",{params:params})
}
export function messageUserListByUserApi(userID:number):Promise<baseResponse<listDataType<messageType>>>{
    return useAxios.get("/api/message_users/user",{params:{userID}})
}
export function messageUserRecordApi(sendUserID:number,revUserID:number):Promise<baseResponse<listDataType<messageRecordType>>>{
    return useAxios.get("/api/message_users/record",{params:{sendUserID,revUserID}})
}

//我的消息列表
export function messageUserListByMeApi():Promise<baseResponse<listDataType<messageType>>>{
    return useAxios.get("/api/message_users/me")
}

export interface userRecordRequestType extends paramsType{
    userID:number

}

//聊天列表
export function messageUserMeRecordApi(params:userRecordRequestType):Promise<baseResponse<listDataType<messageRecordType>>>{
    return useAxios.get("/api/message_users/record/me",{params})
}

export interface messagePublishType {
    content:string
    rev_user_id:number
}

export function messagePublishApi(data:messagePublishType):Promise<baseResponse<string>>{
    return useAxios.post("/api/msgs",data)
}
export function messageRemoveApi(id_list:number[]):Promise<baseResponse<string>>{
    return useAxios.delete('/api/message_users', {data:{id_list}})
}