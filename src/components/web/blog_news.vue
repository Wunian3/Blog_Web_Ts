<template>
<div class="blog_news">
  <span class="index">{{data.index}}</span>
  <a :href="data.url" target="_blank"  class="title">{{data.title}}</a>
  <span class="hot">{{data.hot}}</span>
</div>
</template>
<script setup lang="ts">
import type {newsType} from "@/api/news_api.ts";
import {reactive} from "vue";

const data = reactive<newsType>({
  hot:"121231",
  index:"12313213",
  url:"1231231",
  title:"12313",
})

</script>

<style  lang="scss">
.blog_news{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title{
    color:var(--active);
    text-decoration: none;
    width: 80%;
  }

}
</style>