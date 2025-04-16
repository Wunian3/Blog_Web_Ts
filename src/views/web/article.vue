<template>
  <div class="article_view">
    <blog_nav></blog_nav>
    <blog_banner :data="{
      abstract: data.abstract,
      banners: '/'+data.banner_url,
      slogan: data.title
    }"></blog_banner>
    <main>
      <div class="container">
        <div class="article_container">
          <div class="head">
            <div class="title">{{ data.title }}</div>
            <div class="date">
              发布时间：{{ dataFormat(data.created_at) }} （{{ relativeCurrentTime(data.created_at) }}）
            </div>
            <div class="tag">
              <a-tag v-for="(item, index) in data.tags" :color="articleTagColorList[index]">{{ item }}</a-tag>
            </div>
          </div>
          <article>
            <MdPreview :editor-id="mdID" v-model="data.content" :theme="store.themeString"></MdPreview>
          </article>
          <div class="next_prev">
            <div class="prev">
              上一篇:
              <template v-if="data.prev">
                <a :href="`/article/${data.prev.id}`">{{data.prev.title}}</a>
              </template>
              <template v-else>已经是第一篇了</template>
            </div>
            <div class="next">
              下一篇:
              <template v-if="data.next">
                <a :href="`/article/${data.next.id}`">{{data.next.title}}</a>
              </template>
              <template v-else>已经是最后一篇了</template>
            </div>
          </div>

          <blog_comment
              ref="blogCommentRef"
              :article-id="id"
          ></blog_comment>

        </div>
        <aside>
          <blog_user_info_preview :data="{
            avatar: data.user_avatar,
            nick_name: data.user_nick_name,
            sign: '欢迎来到我的主页',
            link: '',
            collects_count: data.collects_count,
            comment_count: data.comment_count,
            digg_count:data.digg_count,
            look_count: data.look_count,
          }"></blog_user_info_preview>
          <div :class="{article_actions:true,isFixed:isFixed}">
            <blog_card title="文章目录" class="blog_article_dict">
              <MdCatalog
                  v-if="isCatalogShow"
                  :scroll-element="scorllElement"
                  :offset-top="80"
                  :theme="store.themeString"
                  :scroll-element-offset-top="80"
                  :editor-id="mdID" ></MdCatalog>
            </blog_card>
              <div class="blog_article_action">
                <IconThumbUpFill :class="{active:data.is_digg}" @click="articleDigg"></IconThumbUpFill>
                <IconStarFill :class="{active:data.is_collect}" @click="articleColl"></IconStarFill>
                <IconDoubleUp @click="goTop"></IconDoubleUp>
                <IconMessage @click="goComment"></IconMessage>
              </div>
          </div>
        </aside>
      </div>
    </main>
    <blog_footer></blog_footer>
  </div>
</template>
<script setup lang="ts">
import {dataFormat} from "@/utils/date.ts";
import {relativeCurrentTime} from "@/utils/date.ts";
import Blog_nav from "@/components/web/blog_nav.vue";
import Blog_banner from "@/components/web/blog_banner.vue";
import {MdCatalog, MdPreview} from "md-editor-v3";
import Blog_comment from "@/components/common/blog_comment.vue";
import Blog_user_info_preview from "@/components/common/blog_user_info_preview.vue";
import Blog_card from "@/components/common/blog_card.vue";
import Blog_footer from "@/components/web/blog_footer.vue";
import {useRoute, useRouter} from "vue-router";
import {articleCollectsPostApi, articleDetailApi, articleDiggApi, type articleType} from "@/api/article_api.ts";
import {onErrorCaptured, onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {useStore} from "@/stores";
import "md-editor-v3/lib/preview.css"
import {articleTagColorList} from "@/global/global.ts";
import {IconMessage,IconThumbUpFill,IconStarFill,IconDoubleUp} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import Blog_login from "@/components/common/blog_login.vue";
import {showLogin} from "@/components/common/blog_login.ts";

const mdID= "articleID_1007";


//文章结构区
const top = ref(974 - 70)

const isFixed = ref(false)

const scorllElement = document.documentElement

const route = useRoute()
const router  = useRouter()
const store = useStore()
const id = ref<string>(route.params.id as string)
const data = reactive<articleType>({
  abstract: "",
  banner_id: 0,
  banner_url: "",
  category:"",
  collects_count:0,
  comment_count: 0,
  created_at: "",
  digg_count:0,
  id: "",
  link:"",
  look_count: 0,
  source: "",
  tags: [],
  title: "",
  updated_at: "",
  user_avatar: "",
  user_id:0,
  user_nick_name: "",
})
const isCatalogShow=ref(false);

// async function getData(){
//   isCatalogShow.value = false
//   let res = await articleDetailApi(id.value)
//   Object.assign(data,res.data)
//   isCatalogShow.value = true
// }
async function getData() {
  isCatalogShow.value = false
  let res = await articleDetailApi(id.value)
  if (res.code) {
    // 文章不存在
    Message.warning("文章不存在")
    router.push({
      name: "article_notfound"
    })
    return
  }
  Object.assign(data, res.data)
  isCatalogShow.value = true
}

window.addEventListener("scroll", scroll)

function scroll() {
  if (document.documentElement.scrollTop >= top.value) {
    isFixed.value = true
  } else {
    isFixed.value = false
  }
}

onUnmounted(() => {
  window.removeEventListener("scroll", scroll)
})


onMounted(() => {
  let hash = route.hash
  if (hash !== "") {

    setTimeout(() => {
      let dom = document.querySelector(hash)
      if (dom) {
        let top = dom.getBoundingClientRect().top
        document.documentElement.scrollTo({
          top: top - 60,
          behavior: "smooth"
        })
      }
    }, 150)


  }
})

//文章功能区
function goTop() {
  document.documentElement.scrollTo({
    top: 700 - 60,
    behavior: "smooth"
  })
}

const blogCommentRef = ref()

function goComment() {
  let box = document.querySelector(".add_comment") as HTMLElement
  if (!box) {
    return
  }

  let top = box.offsetTop
  document.documentElement.scrollTo({
    top: top - 60,
    behavior: "smooth"
  })
  setTimeout(() => {
    blogCommentRef.value.focus()
  }, 500)

}

async function articleDigg() {
  let res = await articleDiggApi(id.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  data.digg_count++
  data.is_digg = true
  setTimeout(() => {
    data.is_digg = false
  }, 2000)
}


async function articleColl() {
  if (!store.isLogin) {
    Message.warning("请登录")
    showLogin()
    return
  }
  let res = await articleCollectsPostApi(id.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  data.is_collect = !data.is_collect
  if (data.is_collect) {
    data.collects_count++
  } else {
    data.collects_count--
  }
  Message.success(res.msg)
}

watch(()=>route.params,()=>{
  id.value = route.params.id as string
  getData()
},{immediate:true,deep:true})

</script>
<style  lang="scss">
.article_view{
  main{
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: var(--bg);
    padding-top: 20px;
    padding-bottom: 20px;

    .container{
      width: var(--container_width);
      display: flex;
      justify-content: space-between;

      aside{
        width: 300px;

        .blog_user_info_preview_component{
          margin-bottom: 20px;
        }

        .blog_article_dict{
          .body{
            max-height: calc(100vh - 400px);
            overflow: auto;
          }
        }

        .article_actions {
          position: relative;

          &.isFixed {
            position: fixed;
            top: 80px;
            width: 300px;
          }
        }

        .blog_article_action{
          margin-top: 20px;
          background-color: var(--color-bg-1);
          border-radius: 5px;
          height: 50px;
          display: flex;
          align-items: center;

          >svg{
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: var(--color-text-1);
            cursor: pointer;

            &:hover{
              color: var(--active);
            }

            &.active{
              color: var(--active);
            }
          }
        }
      }

      .article_container {
        width: calc(100% - 320px);

        .head{
          border-radius: 5px 5px 0 0;
          margin-bottom: 1px;
          background-color: var(--md-bk-color);
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;

          .title{
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .date{
            margin-bottom: 10px;
            color: var(--color-text-2);
          }

          .tag{
            .arco-tag{
              margin-right: 10px;

              &:last-child{
                margin-right: 0;
              }
            }
          }
        }

        .md-editor{
          background-color: var(--color-bg-1);
        }

        .next_prev{
          background-color: var(--md-bk-color);
          border-radius: 0 0 5px 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          margin-top: 1px;
          margin-bottom: 20px;
          a{
            color: var(--color-text-2);
          }

        }
      }

      .md-editor-catalog-link span:hover{
        color: var(--active);
      }
      .md-editor-catalog-active>span{
        color: var(--active);
      }

    }
  }

}


</style>