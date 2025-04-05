<template>
<div>首页
  <blog_login v-model:visible="visible"></blog_login>
  <a-button @click="visible = true">登录</a-button>
  <blog_theme></blog_theme>
  <router-link to="/login" >登录</router-link>
  <router-link to="/admin" >后台</router-link>
</div>
</template>
<script setup lang="ts">

import {ref} from "vue";

const visible = ref(false);
import Blog_login from "@/components/common/blog_login.vue";
import Blog_theme from "@/components/common/blog_theme.vue";

console.log(import.meta.env.VITE_SERVER_URL)

</script>
<style lang="scss">

</style>