import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface userInfType{
    avatar: string
    nick_name: string
    user_id: number
    role: number
    token:string
}

const theme:boolean = true // true light
const collapsed :boolean =false
const userInf: userInfType={
    avatar:"/image/默认头像.jpg",
    nick_name:"雾念",
    user_id:0,
    role:0,
    token:"",
}

export const useStore = defineStore('counter', {
    state() {
        return {
            theme: theme,
            collapsed: collapsed,
            userInf: userInf,
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
        }
    },
    getters: {
        themeString(): string {
            return this.theme ? "light" : "dark"
        }
    }
})

