<template>
  <div class="blog_article_drawer">
    <blog_article_update v-model:visible="updateVisible" :data="data" title="文章信息" type="add"
                        @ok="okHandler"></blog_article_update>

    <a-drawer class="blog_article_drawer_inner" width="86%" :visible="props.visible"
              unmountOnClose title="发布文章"
              @cancel="emits('update:visible', false)">
      <div>
        <MdEditor v-model="data.content" :on-upload-img="onUploadImg" :theme="store.themeString"/>
      </div>
      <template #footer>
        <a-button @click="emits('update:visible', false)">取消</a-button>
        <a-button type="primary" status="success" @click="updateVisible=true">完善信息</a-button>
        <a-button type="primary" @click="createArticle">发布</a-button>
      </template>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import {MdEditor} from "md-editor-v3";
import {reactive, ref} from "vue";
import 'md-editor-v3/lib/style.css';
import {uploadImageApi} from "@/api/image_api";
import type {baseResponse} from "@/api";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import blog_article_update from "@/components/common/blog_article_update.vue";
import type {articleUpdateType} from "@/api/article_api";
import {articleCreateApi} from "@/api/article_api";
import Blog_article_update from "@/components/common/blog_article_update.vue";


const store = useStore()
const updateVisible = ref(false)

interface Props {
  visible: boolean
}

const data = reactive<articleUpdateType>({})

const props = defineProps<Props>()
const emits = defineEmits(["update:visible", "ok"])

async function onUploadImg(files: Array<File>, callback: (urls: Array<string>) => void): Promise<void> {
  let resList: baseResponse<string>[] = []

  try {
    resList = await Promise.all(files.map(file => uploadImageApi(file)))
  } catch (e) {
    // Message.error(e.message)
    return
  }

  const urlList: string[] = []
  resList.forEach(res => {
    if (res.code) {
      Message.error(res.msg)
      return
    }
    urlList.push(res.data)
  })
  callback(urlList)
}

function okHandler(record: articleUpdateType) {
  Object.assign(data, record)
}

interface articleSaveStoreType {
  category?: string
  tags?: string[]
  date: Date
}

async function createArticle() {
  if (data.title === "") {
    Message.warning("文章标题不能为空")
    return false
  }
  if (data.content === "") {
    Message.warning("文章内容不能为空")
    return false
  }
  let res = await articleCreateApi(data)
  if (res.code) {
    Message.error(res.msg)
    return false
  }
  Message.success(res.msg)
  emits("update:visible", false)
  // 除了分类和标签不清除，其他都要清除  一个小时内     写入到store
  data.title = ""
  data.content = ""
  data.abstract = ""
  data.banner_id = undefined
  data.banner_url = ""

  const saveStore: articleSaveStoreType = {
    category: data.category,
    tags: data.tags,
    date: new Date()
  }

  sessionStorage.setItem("saveStore", JSON.stringify(saveStore))

  emits("ok")
}

function getData() {
  let item = sessionStorage.getItem("saveStore")
  if (item === null) return
  try {
    const obj: articleSaveStoreType = JSON.parse(item)
    data.category = obj.category
    data.tags = obj.tags
  } catch (e) {
    return;
  }
}


getData()


</script>
<style lang="scss">
.blog_article_drawer_inner {
  .md-editor {
    height: calc(100vh - 137px);
  }
}
</style>