<template>
  <div class="blog_login">

    <div class="blog_login_mask">
      <blog_login_form @ok="ok" :qq-redirect-path="back"></blog_login_form>
    </div>

  </div>
</template>
<script setup lang="ts">
import Blog_login_form from "@/components/common/blog_login_form.vue";
import router from "@/router";
import {useRoute} from "vue-router";
import {qqLoginApi} from "@/api/user_api.ts";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores";


interface routeQuery{
  flag?:string
  code?:string
}

interface historyState{
   back:string
}

const back = (window.history.state as historyState).back;

const store = useStore();
const route = useRoute();

function ok(){
  let back = window.history.state.back //拿不到就回去
  if (back===null){
    router.push({name: "/index"});
    return
  }
  router.push(back);
}

// console.log(route.query)

async function init(query:routeQuery){
  // console.log(query.code,query.flag);
  if(!query.code||!query.flag){
    return
  }
  let res = await qqLoginApi(query.code)
  if(res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  store.setToken(res.data)

  //back的逻辑
  // console.log(res.data)
  let path = localStorage.getItem("redirectPath")
  if(path===null){
    path = "/"

  }
  router.push(path)

}

init(route.query)

</script>
<style lang="scss">
.blog_login {
  background: url("https://p.sda1.dev/23/35e1ed63a3900920f320bc39ba0c4f54/elden-ring-2023-g5.jpg") 50%/cover no-repeat;
  width: 100%;
  height: 100vh;

  .blog_login_mask {
    position: absolute;
    right: 0;
    width: 400px;
    height: 100%;
    background-color: var(--login_bg);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 40px;

  }
}

</style>