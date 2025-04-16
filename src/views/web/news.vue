<template>
  <div class="news_view">
    <blog_nav></blog_nav>
    <blog_banner></blog_banner>
    <main>
      <div class="container">
        <div class="news_detail">
          <aside>
            <div @click="checkAside(item)" :class="{item: true, active: params.source === item.id}"
                 v-for="item in newsAside">
              <img :src="item.font" alt="">
              <span>{{ item.name }}</span>
            </div>
          </aside>
          <div class="content">
            <div class="head">
              <img :src="activeFont" alt="">
              <span>{{ activeName }} · 热搜榜</span>
            </div>
            <div class="body">
              <div class="item" v-for="item in newsList">
                <span class="index">{{ item.index }}</span>
                <span class="title">
                  <a href="">{{ item.title }}</a>
                </span>
                <span class="hot">{{ item.hot }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="link">
          <a href="https://github.com/Wunian3" target="_blank">八方学习！</a>
        </div>
      </div>
    </main>
    <blog_footer></blog_footer>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import Blog_nav from "@/components/web/blog_nav.vue";
import Blog_banner from "@/components/web/blog_banner.vue";
import Blog_footer from "@/components/web/blog_footer.vue";
import {newsListApi, type newsType} from "@/api/news_api.ts";





//侧边

interface newsAsideType {
  id: string;
  name: string;
  font: string;
}


const newsAside: newsAsideType[] = [
  {
    id: "weibo", // 与后端 API 的 source 一致
    name: "微博",
    font: "/image/icon/weibo.png",
  },
  {
    id: "zhihu",
    name: "知乎",
    font: "/image/icon/zhihu.png",
  },
  {
    id: "bilibili",
    name: "哔哩",
    font: "/image/icon/bill.png",
  },
  {
    id: "toutiao",
    name: "头条",
    font: "/image/icon/toutiao.png",
  },
  {
    id: "baidu",
    name: "百度",
    font: "/image/icon/baidu.png",
  },
];

const params = reactive({
  source: "weibo", // 默认新闻源
  size: 50,
});


function checkAside(item: newsAsideType) {
  params.source = item.id;
  getData();
}


const activeFont = computed(() => {
  // const item = newsAside.find((item) => params.source === item.id);
  // return item ? item.font : "";
  return (newsAside.find((item) => params.source === item.id) as newsAsideType).font
})

const activeName = computed(() => {
  // const item = newsAside.find((item) => params.source === item.id);
  // return item ? item.name : "";
  return (newsAside.find((item) => params.source === item.id) as newsAsideType).name
})

const newsList = ref<newsType[]>([])

async function getData() {
  try {
    let res = await newsListApi(params);
    newsList.value = res.data;
  } catch (error) {
    console.error("获取新闻数据失败:", error);
    newsList.value = [];
  }
}
onMounted(() => {
  getData();
});

</script>
<style lang="scss">
.news_view {
  main {
    display: flex;
    margin-top: 20px;
    justify-content: center;
    margin-bottom: 20px;

    .container {
      width: var(--container_width);
      display: flex;
      flex-direction: column;
      align-items: center;

      .news_detail {
        width: 100%;
        background-color: var(--color-bg-1);
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;

        aside {
          width: 240px;
          border-right: 1px solid var(--bg);
          padding: 20px 0;

          .item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            color: var(--color-text-2);
            cursor: pointer;
            transition: all .3s;

            &:hover {
              color: var(--active);
            }

            &.active {
              background-color: var(--active);
              color: white;
            }

            img {
              width: 30px;
              height: 30px;
              border-radius: 5px;
            }

            span {
              margin-left: 10px;
            }
          }
        }

        .content {
          width: calc(100% - 240px);

          .head {
            height: 60px;
            border-bottom: 1px solid var(--bg);
            display: flex;
            align-items: center;
            padding: 0 20px;

            img {
              width: 35px;
              height: 35px;
              border-radius: 50%;
              display: block;
            }

            span {
              font-size: 18px;
              margin-left: 10px;
            }
          }

          .body {
            padding: 20px;

            .item {
              display: flex;
              justify-content: space-between;
              color: var(--color-text-2);
              margin-bottom: 10px;
              align-items: center;

              .index {
                background-color: var(--color-fill-2);
                width: 20px;
                height: 20px;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 5px;
              }

              a {
                color: var(--color-text-2);
              }

              .title {
                width: 90%;
              }

              .hot {
                white-space: nowrap;
              }

              &:nth-child(1) {
                .index {
                  background-color: #fe2d46;
                  color: white;
                }
              }

              &:nth-child(2) {
                .index {
                  background-color: #ff6600;
                  color: white;
                }
              }

              &:nth-child(3) {
                .index {
                  background-color: #faa90e;
                  color: white;
                }
              }
            }
          }
        }
      }

      .link a {
        color: var(--color-text-2);
        &:hover{
          color: var(--active);
        }
      }

    }
  }
}
</style>