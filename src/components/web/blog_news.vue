<template>
<div class="blog_news">
  <span class="index">{{data.index}}</span>
  <a :href="data.url" target="_blank"  class="title">{{data.title}}</a>
  <span class="hot">{{data.hot}}</span>
</div>
</template>
<script setup lang="ts">
import {newsListApi, type newsType} from "@/api/news_api.ts";
import {reactive} from "vue";

const data = reactive<newsType>({
  hot:"",
  index:"",
  url:"",
  title:"",
})

async function getData() {
    let res = await newsListApi(
        {
          source: "bilibili", // 默认新闻源
          size: 3,
        }
    );
  if (res.code ) {
    return
  }
    Object.assign(data,res.data[0]);
}

getData()

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