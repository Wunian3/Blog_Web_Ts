<template>
  <blog_config
      title="jwt配置"
      name="jwt"
      :left-width="30"
      :right-with="70"
      :column="column" :help-data="helpList">
  </blog_config>

</template>

<script setup lang="ts">
import Blog_config from "@/components/admin/blog_config.vue";
import type {configColumnType} from "@/types";
import type {jwtType, qqType} from "@/api/settings_api.ts";

const column: configColumnType<jwtType>[] = [
  {label: "秘钥", field: "secret",iptType:"password", rules: [{required: true, message: '请输入秘钥'}]},
  {label: "颁发人", field: "issuer",rules: [{required: true, message: '请输入颁发人'}]},
  {label: "过期时间", field: "expires",rules: [{required: true, message: '请输入过期时间'}]},
]

const helpList = [
  {

    title:"秘钥",
    abs:"用于jwt的加解密，请妥善保管",
    content:``,
  },
  {
    title:'过期时间',
    abs:'单位小时',
    content:'',
  },
]


</script>