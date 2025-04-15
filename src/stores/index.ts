
import { defineStore } from 'pinia';
import { Message } from '@arco-design/web-vue';
import {parseToken} from "@/utils/jwt.ts";
import {logoutApi} from "@/api/user_api.ts";
import {userInfoApi} from "@/api/user_api.ts";
import type {Themes} from "md-editor-v3";
import {siteInfoApi, type siteInfoType} from "@/api/settings_api.ts";


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

const siteInfo: siteInfoType={
    addr:"福建宁德",
    bei_an:"闽ICP备2025095031号",
    bilibili_url:"https://space.bilibili.com/457254347",
    created_at:"2025-03-15",
    email:"eogod124@gmail.com",
    gitee_url:"https://gitee.com/eo_wunian",
    github_url:"https://github.com/Wunian3",
    job:"学生啦",
    name:"雾念",
    qq_image:" ",
    slogan:"雾念的知识空间",
    slogan_en:"WuNianBLOG",
    title:" ",
    version:"1.0.0",
    web:" ",
    wechat_image:" ",
}


export const useStore = defineStore('counter', {
    state() {
        return {
            theme: theme,
            collapsed: collapsed,  //侧边栏状态
            userInfo: userInfo,
            siteInfo: siteInfo,
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
        },
        async loadSiteInfo() {
            const val = sessionStorage.getItem("siteInfo")
            if(val !== null){
                try{
                    this.siteInfo = JSON.parse(val)
                    return
                }catch (e){
                }
            }

            let res = await siteInfoApi()
            this.siteInfo = res.data

            sessionStorage.setItem("siteInfo", JSON.stringify(this.siteInfo))
        }

    },
    getters: {
        themeString(): Themes {
            return this.theme ? "light" : "dark"
        },
        isLogin(): boolean {
            return this.userInfo.role !== 0
        },
        isAdmin(): boolean {
            return this.userInfo.role == 1
        },
        isGeneral(): boolean {
            return this.userInfo.role == 2
        },
        isTourist(): boolean {
            return this.userInfo.role == 3
        }
    }
})

