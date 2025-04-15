<template>
  <blog_config
      title="邮箱配置"
      name="email"
      :left-width="isLaptops1? 45:35"
      :right-with="isLaptops1? 55:65"
      :column="column" :help-data="helpList">
    <template #alert>
      <a-alert style="margin-top: 20px">配置邮箱之后，系统通知将会通知到你的邮箱，不配置则不通知</a-alert>
    </template>
  </blog_config>
</template>
<script setup lang="ts">
import Blog_config from "@/components/admin/blog_config.vue";
import type {configColumnType} from "@/types";
import type {emailType} from "@/api/settings_api.ts";

const isLaptops1 = isLaptops

const column: configColumnType<emailType>[] = [
  {label: "邮箱域名", field: "host", rules: [{required: true, message: '请输入邮箱域名'}]},
  {label: "邮箱端口", field: "port",rules: [{required: true, message: '请输入邮箱端口'}]},
  {label: "发信邮箱", field: "user",rules: [{required: true, message: '请输入发信邮箱'}]},
  {label: "密码", field: "password",iptType:"password",rules: [{required: true, message: '请输入密码'}]},
  {label: "发信名称", field: "default_from_email",rules: [{required: true, message: '请输入发信名称'}]},
  {label: "ssl", field: "use_ssl",type:"boolean"},
  {label: "tsl", field: "user_tls",type:"boolean"},
]

const helpList = [
  {
    title:"邮箱域名，邮箱端口",
    abs:"每个邮件服务的smtp域名和端口都不一样",
    content:'参考链接: <a href= \"https://blog.csdn.net/likui_/article/details/115079645" target="_blank">https://blog.csdn.net/likui_/article/details/115079645</a>',
  },
  {
    title:'发信邮箱与密码',
    abs:'密码不一定是你的邮箱登录密码',
    content:'<img src="https://p.sda1.dev/23/143f3abfc912d7d3bd13f9de0c21fb73/image.png" alt="">',
  },
  {
    title:'发信名称',
    abs:'发给用户的邮件上，对应显示的名称',
    content:'',
  },
  {
    title:'ssl',
    abs:'是否启用ssl传输',
    content:'启用ssl之后，对应的端口号可能需要对应的调整',
  }
]


</script>
