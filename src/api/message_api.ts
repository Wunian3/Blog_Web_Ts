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
    content:string
    created_at:string
    message_count:number
    rev_user_avatar:string
    rev_user_id:number
    rev_user_nick_name:string
    send_user_avatar:string
    send_user_id:number
    send_user_nick_name:string
    isMe?:boolean
}

export function messageUserListApi(params?:messageParams):Promise<baseResponse<listDataType<messageType>>>{
    return useAxios.get("/api/message_users",{params:params})
}
export function messageUserListByUserApi(userID:number):Promise<baseResponse<listDataType<messageType>>>{
    return useAxios.get("/api/message_users/user",{params:{userID}})
}
export function messageUserRecordApi(userID1:number,userID2:number):Promise<baseResponse<listDataType<messageRecordType>>>{
    return useAxios.get("/api/message_users/record",{params:{userID1,userID2}})
}