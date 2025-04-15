<template>
  <blog_config
      title="高德配置"
      name="gaode"
      :left-width="30"
      :right-with="70"
      :label-span="isLaptops1?4:3"
      :wrapper-span="isLaptops1?20:21"
      :column="column" :help-data="helpList">
    <template #alert>
      <a-alert style="margin-top: 20px">获取用户所在城市天气数据</a-alert>
    </template>
  </blog_config>

</template>

<script setup lang="ts">
import Blog_config from "@/components/admin/blog_config.vue";
import type {configColumnType} from "@/types";
import type {gaodeType} from "@/api/settings_api.ts";

const isLaptops1 = isLaptops

const column: configColumnType<gaodeType>[] = [
  {label: "Key", field: "key",iptType:"password",rules: [{required: true, message: '请输入key'}],placeholder:"key"},
  {label: "启用", field: "enable",type:"boolean"},
]

const helpList = [
  {

    title:"开启高德天气功能",
    abs:"获取每天的天气情况~",
    content:``,
  },
]


</script>