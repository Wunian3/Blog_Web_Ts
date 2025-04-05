import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import { Message } from '@arco-design/web-vue';
import {parseToken} from "@/utils/jwt.ts";
import {logoutApi} from "@/api/user_api.ts";
import {userInfoApi} from "@/api/user_api.ts";
import type {userInfoType} from "@/api/user_api.ts";

export interface userStoreInfoType{
    user_name:string
    avatar: string
    nick_name: string
    user_id: number
    role: number
    token:string
    exp:number
}

const theme:boolean = true // true light
const collapsed :boolean =false
const userInfo: userStoreInfoType={
    user_name:"",
    avatar:"",
    nick_name:"",
    user_id:0,
    role:0,
    token:"",
    exp: 0,
}

export const useStore = defineStore('counter', {
    state() {
        return {
            theme: theme,
            collapsed: collapsed,  //侧边栏状态
            userInfo: userInfo,
        }
    },
    actions: {
        setTheme(localTheme?: boolean){
            if (localTheme!==undefined){
                this.theme = localTheme
            }else {
                this.theme = !this.theme
            }
            document.documentElement.style.colorScheme = this.themeString
            document.body.setAttribute('arco-theme', this.themeString)

            localStorage.setItem("theme", JSON.stringify(this.theme))
        },
        loadTheme(){
            let val = localStorage.getItem("theme")
            if (val === null){
                return
            }
            try {
                this.theme = JSON.parse(val)
                this.setTheme(this.theme)
            }catch (e){
                return;
            }
        },
        setCollapsed(collapsed: boolean){
            this.collapsed = collapsed
        },
        async setToken(token: string) {
            this.userInfo.token = token
            let res = await userInfoApi()
            let info = parseToken(token)
            let data = res.data
            this.userInfo ={
                user_name:data.user_name,
                avatar:data.avatar,
                nick_name:data.nick_name,
                user_id:info.user_id,
                role:info.role,
                token:token,
                exp: info.exp,
            }

            localStorage.setItem("userInfo", JSON.stringify(this.userInfo))
        },
        loadToken() {
            let val = localStorage.getItem("userInfo")
            if (val === null) {
                return
            }
            try {
                this.userInfo = JSON.parse(val)
            } catch (e) {
                this.clearUserInfo()
                return;
            }
            // 判断token是不是过期了
            let exp = Number(this.userInfo.exp) * 1000
            let nowTime = new Date().getTime()
            if (exp - nowTime <= 0) {
                // 过期
                Message.warning("登录已过期")
                this.clearUserInfo()
                return;
            }
        },
        async logout() {
            await logoutApi()
            this.clearUserInfo()
        },
        clearUserInfo() {
            this.userInfo = userInfo
            localStorage.removeItem("userInfo")
        }

    },
    getters: {
        themeString(): string {
            return this.theme ? "light" : "dark"
        },
        isLogin(): boolean {
            return this.userInfo.role !== 0
        },
        isAdmin(): boolean {
            return this.userInfo.role == 1
        },
        isTourist(): boolean {
            return this.userInfo.role == 3
        }
    }
})

