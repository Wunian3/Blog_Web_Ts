<template>
  <div class="index_view">
  <blog_nav></blog_nav>
  <blog_banner></blog_banner>
    <main>
      <div class="container">
        <div class="left">
          <blog_card title="今日热搜">
            <template #head-right>
              <router-link to="{name:'news'}">更多<IconDoubleRight></IconDoubleRight></router-link>
            </template>
            <blog_news></blog_news>
          </blog_card>
          <blog_card title="文章日历">
            <article_calendar></article_calendar>
          </blog_card>
          <blog_card title="文章列表" class="article_card">
            <template #head-right>
              <a-input-search v-model="key"  @search="search" @keydown.enter="search" placeholder="搜索文章标题" ></a-input-search>
            </template>
            <blog_article_list ref="blogArticleList"></blog_article_list>
          </blog_card>

        </div>
        <div class="right">
          <blog_card title="宝贝推广">
            <blog_promotion></blog_promotion>
          </blog_card>
          <blog_card title="标签云">
          <blog_tags></blog_tags>
          </blog_card>
          <blog_card title="个人名片">
            <blog_user_card></blog_user_card>
          </blog_card>
          <blog_card title="意见反馈">
            <blog_feed_back></blog_feed_back>
          </blog_card>
        </div>
      </div>
    </main>
    <blog_footer></blog_footer>
  </div>
</template>
<script setup lang="ts">


import Blog_nav from "@/components/web/blog_nav.vue";
import Blog_banner from "@/components/web/blog_banner.vue";
import Blog_card from "@/components/common/blog_card.vue";
import {IconDoubleRight} from "@arco-design/web-vue/es/icon";
import Blog_footer from "@/components/web/blog_footer.vue";
import Blog_news from "@/components/web/blog_news.vue";
import Blog_promotion from "@/components/web/blog_promotion.vue";
import Blog_user_card from "@/components/web/blog_user_card.vue";
import Blog_feed_back from "@/components/web/blog_feed_back.vue";
import Article_calendar from "@/components/charts/article_calendar.vue";
import Blog_article_list from "@/components/web/blog_article_list.vue";
import {ref} from "vue";
import Blog_tags from "@/components/web/blog_tags.vue";

const blogArticleList=ref()

const key = ref("")
function search(){
  blogArticleList.value.getData({key:key.value})
}

</script>
<style lang="scss">
.index_view {
  main{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .container{
      width: var(--container_width);
      display: flex;
      justify-content: space-between;

      > .right{
        width: 380px;
      }
      > .left{
        width: calc(100% - 400px);

        .article_card{
          background: none;

          .head{
            background-color: var(--color-bg-1);
          }

          .body{
            padding: 0;
          }
        }

      }

      .blog_card{
        margin-bottom: 20px;
      }
    }
  }

}
</style>