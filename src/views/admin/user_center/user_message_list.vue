<template>
  <div class="user_message_list">
    <div class="user_menu">
      <blog_message_list @check="messageUserCheck" :data="messageData.list"></blog_message_list>
    </div>
    <blog_message_record is-head :userID="userID" :nick-name="nickName"></blog_message_record>
  </div>
</template>
<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import Blog_message_list from "@/components/common/blog_message_list.vue";
import {
  type messageType,
} from "@/api/message_api.ts";
import type {listDataType} from "@/api";
import Blog_message_record from "@/components/common/blog_message_record.vue";
import { messageUserListByMeApi } from "@/api/message_api.ts";
import router from "@/router";
import {useRoute} from "vue-router";

const route= useRoute();
const messageData = reactive<listDataType<messageType>>({
  list: [],
  count: 0,
})

async function getMessageData() {
  let res = await messageUserListByMeApi()
  messageData.list = res.data.list
  messageData.count = res.data.count


  if(isNaN(userID.value)){
    return
  }
  const item =  messageData.list.find((item)=>item.userID === userID.value)
  if(item){
    nickName.value = item.nickName
  }
}



const userID = ref<number>(Number(route.query.user_id ))
const nickName = ref<string>("")


async function messageUserCheck(data: messageType) {
  userID.value  =  data.userID
  nickName.value = data.nickName
  router.push({
    query: {
      user_id: userID.value,
    }
  })
}

getMessageData()


</script>
<style  lang="scss">

.user_message_list {
  display: flex;

  >div{
    background-color: var(--color-bg-1);
    height: calc(100vh - 130px);
    border-radius: 5px;
    color: var(--color-text-2);
    overflow-x: hidden;
    overflow-y: auto;

  }

  .user_menu {
    width: 280px;
    margin-left: 20px;
    padding: 20px;
  }

  .blog_message_record_component {
    width: calc(100% - 320px);
    margin-left: 20px;
  }

}

</style>