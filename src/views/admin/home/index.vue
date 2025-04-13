<template>
<div class="home_view">
  <div class="welcome">
    <div class="title">
      你好，{{store.userInfo.nick_name}}},欢迎来到雾念的小世界
    </div>
    <div class="weather">
      天气不太好
    </div>
    <div class="statistics">
      <span>
        <span class="icon">
          <IconMessage></IconMessage>
        </span>
        在线流量:{{statisticsData.flow_count}}
      </span>
      <span>
        <span class="icon">
          <IconMessage></IconMessage>
        </span>
        用户数量:{{statisticsData.user_count}}
      </span>
      <span>
        <span class="icon">
          <IconMessage></IconMessage>
        </span>
        文章总数:{{statisticsData.article_count}}
      </span>
      <span>
        <span class="icon">
          <IconMessage></IconMessage>
        </span>
        群聊消息:{{statisticsData.chat_group_count}}
      </span>
      <span>
        <span class="icon">
          <IconMessage></IconMessage>
        </span>
        今日登录:{{statisticsData.now_login_count}}
      </span>
    </div>
    <div class="link">
      <div>
        <span>雾念的代码仓库:<a href="https://github.com/Wunian3">https://github.com/Wunian3</a></span>
      </div>
    </div>
  </div>
  <div class="main">
    <div class="left">
      <blog_card title="快捷入口" class="quick_entry">
        <div class="item" v-for="item in quickEntryList">
          <div class="icon" @click="goLink(item)">
            <component :is="item.font"></component>
          </div>
          <div class="text">{{ item.text }}</div>
        </div>
      </blog_card>
      <blog_card class="statistics" title="数据统计" >
        <login_data_charts></login_data_charts>
      </blog_card>
    </div>
    <div class="right">
      <blog_card title="更新日志" class="update_log">
        <div class="item" v-for="(item, index) in updateLogList">
          <div class="line1">
           <span>
             <span class="index">{{ index + 1 }}.</span>
             <span class="content"><a-typography-paragraph :ellipsis="{
                  rows: 1,
                  showTooltip: true,
                  css: true
                }">{{ item.title }}</a-typography-paragraph></span>
           </span>
            <span class="date" :title="dataFormat(item.created_at)">{{ relativeCurrentTime(item.created_at) }}</span>
            </div>
            <ul class="line2" v-if="item.items">
              <li v-for="li in item.items">{{ li }}</li>
            </ul>
        </div>
      </blog_card>
    </div>
  </div>

</div>




</template>
<script setup lang="ts">
import {relativeCurrentTime} from "@/utils/date.ts";
import {dataFormat} from "@/utils/date.ts";
import blog_card from "@/components/common/blog_card.vue";
import {type Component, onMounted, reactive} from "vue";
import {IconSettings, IconUser, IconMessage, IconBook, IconUserGroup} from "@arco-design/web-vue/es/icon";
import {h} from "vue";
import {defineComponent} from "vue";
import router from "@/router";
import Login_data_charts from "@/components/charts/login_data_charts.vue";
import {statisticsApi} from "@/api/data_api.ts";
import type {statisticsType} from "@/api/data_api.ts";
import {useStore} from "@/stores";

const store = useStore();

//快捷入口
interface quickEntryType {
  font: Component
  text: string // 文字
  name?: string // 路由
  link?: string
}

let quickEntryList: quickEntryType[] = [
  {
    font: IconUser,
    text: "个人信息",
    name: "user_info"
  },
  {
    font: IconMessage,
    text: "群聊管理",
    name: "chat_list"
  },
  {
    font: IconSettings,
    text: "系统日志",
    name: "log_list"
  },
  {
    font: defineComponent({
      render: () => {
        return h("i", {class: "fa fa-comments"})
      }
    }),
    text: "评论列表",
    name: "comment_list"
  },
  {
    font: IconBook,
    text: "文章列表",
    name: "article_list"
  },
  {
    font: IconUserGroup,
    text: "用户列表",
    name: "user_list"
  },
]

if(store.isGeneral){
   quickEntryList= [
    {
      font: IconUser,
      text: "个人信息",
      name: "user_info"
    }
  ]

}


function goLink(item:quickEntryType){
  if(item.name){
    router.push({
      name:item.name,
    })
    return
  }
  if(item.link){
    window.open(item.link, "_blank")
  }
}

interface updateLogType{
  id?:number
  title: string
  created_at: string
  items?:string[]
}

const updateLogList :updateLogType[]=[
  {
    title:"雾念的学习空间V-0.0.1发布",
    created_at:"2025-3-23",
    items:[
        "技术栈:vue3 gin TypeScript ArcoDesign",
        "前后端分离",
    ]
  },
  {
    title:"雾念的学习空间V-0.1.0升级",
    created_at:"2025-4-13",
    items:[
      "技术栈:vue3 gin TypeScript ArcoDesign",
      "前后端分离",
    ]
  },
]

const statisticsData = reactive<statisticsType>({
  user_count:0,
  article_count:0,
  message_count:0,
  chat_group_count:0,
  now_login_count:0,
  now_sign_count:0,
  flow_count:0,
})

async function getData(){
  let res = await statisticsApi()
  Object.assign(statisticsData,res.data)

}
getData()



</script>

<style lang="scss">
.home_view {
  .welcome{
    width: 100%;
    background-image: url("http://su2l8211x.hn-bkt.clouddn.com/wunianblog/20250409202100__img1.jpg");
    background-repeat: no-repeat;
    background-position: right;
    background-color: var(--color-bg-1);
    padding: 20px;
    border-radius: 5px;
    color: var(--color-text-2);


    .title{
      font-size: 22px;
      margin-top: 10px;
      font-weight: 600;
      color: var(--color-text-1);
    }

    .weather{
      margin: 20px 0 10px 0;
    }
    .statistics{
      margin: 20px 0 10px 0;
      font-size: 16px;
      >span{
        margin-right: 20px;
      }
    }
    .link{
      margin: 30px 0 20px 0;

      >div{
        margin-bottom: 20px;
        &:last-child{
          margin-bottom: 0;
        }
      }
      a{
        text-decoration: none;
        color: var(--active);
      }
    }

  }


  .main{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .left{
      width: 70%;

      .quick_entry{
        .body{
          display: flex;
        }

        .item{
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 30px;

          &:last-child{
            margin-right: 0;
          }

          .icon{
            background-color: var(--icon_bg);
            color: var(--icon_color);
            border-radius: 10px;
            width: 60px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            transition: all .3s;
            cursor: pointer;
            svg{
              transition: all .3s;
            }

            &:hover{
              transform: scale(1.05);
              svg{
                transform: scale(1.20);
              }
            }
          }
          .text{
            margin-top: 5px;
            color: var(--color-text-2);
          }
        }


      }

      .statistics{
        margin-top: 20px;
      }

    }

    .right {
      width: calc(30% - 20px);

      .update_log{
        .item{
          .line1{
            display: flex;
            justify-content: space-between;
            color: var(--color-text-2);
            align-items: center;
            height: 40px;

            >span{
              display:flex;
              align-items: center;
              white-space: nowrap;

              .index{
                margin-right: 10px;
              }
            }
            .content{
              display: flex;

              .arco-typography{
                margin-bottom: 0;
                display: inline-block;
              }
            }
          }

          .line2{
            margin:5px 0;
            line-height: 1.5rem;
          }
        }
      }
    }

  }
}
</style>
