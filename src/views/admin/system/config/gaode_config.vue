<template>
  <blog_config
      title="高德配置"
      name="gaode"
      :left-width="30"
      :right-with="70"
      :column="column" :help-data="helpList">
  </blog_config>

</template>

<script setup lang="ts">
import Blog_config from "@/components/admin/blog_config.vue";
import type {configColumnType} from "@/types";
import type {gaodeType} from "@/api/settings_api.ts";

const column: configColumnType<gaodeType>[] = [
  {label: "Key", field: "key", rules: [{required: true, message: '请输入Key'}]},
  {label: "是否启用", field: "enable",type:"boolean"},
]

const helpList = [
  {

    title:"开启高德天气功能",
    abs:"获取每天的天气情况~",
    content:``,
  },
]


</script>