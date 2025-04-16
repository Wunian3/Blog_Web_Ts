<template>
  <div class="blog_comment_components">
    <div class="add_comment">
      <a-textarea ref="textareaRef" placeholder="输入评论内容" @keydown.enter.ctrl="createComment"
                  v-model="addCommentForm.content" :auto-size="{minRows: 6, maxRows: 6}"></a-textarea>
      <a-button @click="createComment" type="primary">发布评论</a-button>
    </div>
    <blog_comment_list class="blog_comment_list" :data="data.list" @list="getData"></blog_comment_list>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import type {listDataType} from "@/api";
import type {commentType} from "@/api/comment_api.ts";
import {commentListApi} from "@/api/comment_api.ts";
import type {paramsType} from "@/api";
import {useStore} from "@/stores";
import {Message} from "@arco-design/web-vue";
import type {commentAddType} from "@/api/comment_api.ts";
import {commentCreateApi} from "@/api/comment_api.ts";
import Blog_comment_list from "@/components/common/blog_comment_list.vue";



const store = useStore();

interface Props {
  articleId: string
}

const props = defineProps<Props>()
const data = reactive<listDataType<commentType>>({
  list: [],
  count: 0
})

const params = reactive<paramsType>({})

async function getData() {
  let res = await commentListApi(props.articleId, params)
  data.list = res.data.list
  data.count = res.data.count
}
//发布
const addCommentForm = reactive<commentAddType>({
  article_id: "",
  content: "",
  parent_comment_id: undefined,
})

async function createComment() {
  if (!store.isLogin) {
    Message.warning("请登录")
    return
  }
  if (addCommentForm.article_id === "") {
    Message.warning("请选择文章")
    return
  }
  if (addCommentForm.content.trim() === "") {
    Message.warning("评论内容不能为空")
    return
  }
  let res = await commentCreateApi(addCommentForm)
  if (res.code) Message.error(res.msg)
  Message.success(res.msg)
  addCommentForm.content = ""
  getData()
}


watch(()=>props.articleId,()=>{
  if(props.articleId){
    addCommentForm.article_id = props.articleId;
    getData()
  }
},{immediate:true})


const textareaRef = ref()
function focus(){
  textareaRef.value.focus()
}

defineExpose({
  focus
})

</script>



<style  lang="scss">
.blog_comment_components {
  background-color: var(--color-bg-1);
  border-radius: 5px;
  width: 100%;
  padding: 20px;

  .add_comment {
    position: relative;

    button{
      position: absolute;
      right: 10px;
      bottom: 15px;
      z-index: 10;
    }
  }

  .blog_comment_list {
    margin-top: 10px;
  }


}
</style>