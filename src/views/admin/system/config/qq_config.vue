<template>
  <blog_config
      title="QQ配置"
      name="qq"
      :left-width="45"
      :right-with="55"
      :label-span="isLaptops1 ? 6:4"
      :wrapper-span="isLaptops1 ? 18:20"
      :column="column" :help-data="helpList">
    <template #alert>
      <a-alert style="margin-top: 20px">配置qq代登录之后，登录页面点击qq才会有反应</a-alert>
    </template>
  </blog_config>
</template>

<script setup lang="ts">

import Blog_config from "@/components/admin/blog_config.vue";
import type {configColumnType} from "@/types";
import type {qqType} from "@/api/settings_api.ts";

const isLaptops1 = isLaptops
const column: configColumnType<qqType>[] = [
  {label: "appID", field: "app_id", rules: [{required: true, message: '请输入appID'}], placeholder: "appID"},
  {
    label: "appKey",
    iptType: "password",
    field: "key",
    rules: [{required: true, message: '请输入appKey'}],
    placeholder: "appKey"
  },
  {label: "回调地址", field: "redirect", rules: [{required: true, message: '请输入回调地址'}], placeholder: "回调地址"},
]


const helpList = [
  {

    title:"appID，appKey",
    abs:"qq互联去申请",
    content:`
    <p>去QQ互联中心申请认证( <a href= "https://connect.qq.com/" target="_blank">https://connect.qq.com</a>)<p>
    <p>然后创建应用等待审核<p>
    <p>审核成功后就有appID，appKey<p>
    `,
  },
  {
    title:'回调地址',
    abs:'qq登录成功之后，回调的地址',
    content:'',
  },
]


</script>

<style  lang="scss">

.qq_config {
  display: flex;
  .arco-form{
    margin-top: 20px;
  }

  .left{
    width:45%;
    .config_update{
      margin-top: 10px;
      button{
        margin-right: 10px;
      }
    }
  }
  .arco-form{
    margin-top: 20px;
  }

  .right{
    width:55%;
    margin-left: 20px;
  }

}

</style>