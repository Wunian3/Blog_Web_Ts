<template>
  <div class="blog_home_welcome">

    <div class="title">
      {{store.userInfo.nick_name}}你好,欢迎来到雾念的小世界
    </div>
    <blog_weather class="weather"></blog_weather>
    <div class="statistics">
      <span>
        <span class="icon">
          <IconSwap></IconSwap>
        </span>
        在线流量:{{statisticsData.flow_count}}
      </span>
      <span>
        <span class="icon">
          <IconUserGroup></IconUserGroup>
        </span>
        用户数量:{{statisticsData.user_count}}
      </span>
      <span>
        <span class="icon">
          <IconBook></IconBook>
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
          <IconBulb></IconBulb>
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
</template>
<script setup lang="ts">

import {IconMessage,IconSwap,IconUserGroup,IconBook,IconBulb} from "@arco-design/web-vue/es/icon";
import {reactive} from "vue";
import {statisticsApi} from "@/api/data_api.ts";
import type {statisticsType} from "@/api/data_api.ts";
import {useStore} from "@/stores";
import Blog_weather from "@/components/admin/blog_weather.vue";
const store = useStore();

//快捷入口

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
<style  lang="scss">
.blog_home_welcome{
  width: 100%;
  background-image: url("https://img.hongyoubizhi.com/picture/pages/regular/2025/02/07/14/127680843_p0_master1200.jpg?x-oss-process=image/resize,m_fill,w_1000");
  background-repeat: no-repeat;
  background-position-x: right;

  background-size: auto 150%;
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


</style>