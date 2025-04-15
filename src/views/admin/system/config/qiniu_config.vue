<template>
  <blog_config
      title="七牛云配置"
      name="qiniu"
      :left-width="isLaptops1 ? 55:45"
      :right-with="isLaptops1 ?45:55"
      :label-span="isLaptops1 ?5:4"
      :wrapper-span="isLaptops1 ?19:20"
      :column="column" :help-data="helpList">
    <template #alert>
      <a-alert style="margin-top: 20px">启用七牛云存储之后，图片上传将上传到七牛云上</a-alert>
    </template>
  </blog_config>
</template>
<script setup lang="ts">
import Blog_config from "@/components/admin/blog_config.vue";
import type {configColumnType} from "@/types";
import type {qiniuType, qqType} from "@/api/settings_api.ts";

const isLaptops1 = isLaptops

const column: configColumnType<qiniuType>[] = [
  {label: "access_key", field: "access_key", rules: [{required: true, message: '请输入access_key'}]},
  {label: "secret_key", field: "secret_key",iptType:"password", rules: [{required: true, message: '请输入secret_key'}]},
  {label: "存储桶", field: "bucket", rules: [{required: true, message: '请输入access_key'}]},
  {label: "域名", field: "cdn", rules: [{required: true, message: '请输入域名'}]},
  {label: "地区", field: "zone", rules: [{required: true, message: '请输入地区'}]},
  {label: "图片前缀", field: "prefix"},
  {label: "大小限制", field: "size",type:"number"},
  {label: "是否启用", field: "enable",type:"boolean"},
]

const helpList = [
  {
    title:"access_key，secret_key",
    abs:"个人中心->秘钥管理",
    content:'',
  },
  {
    title:'bucket',
    abs:'存储桶 对象存储->空间管理',
    content:'',
  },
  {
    title:'域名',
    abs:'七牛云的对象存储域名',
    content:'',
  },
  {
    title:'地区',
    abs:'填写地区对应的代码',
    content:`
    华南-广东  z2
    <br/>
    华东      z0
    <br/>
    华东-浙江  cn-east-2
    <br/>
    华北      z1
    <br/>
    南美洲    na0
    <br/>
    新加坡    as0
    <br/>
    东北      ap-northeast-1
`
  },
  {
    title:'图片前缀',
    abs:'可以理解为图片上传到哪一个目录',
    content:'',
  },
  {
    title:'大小限制',
    abs:'限制图片上传的大小，单位为MB',
    content:'',
  },
]


</script>
