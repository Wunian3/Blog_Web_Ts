<template>
  <div class="article_list">
    <blog_article_update v-model:visible="updateVisible" :data="recordData" @ok="getList"></blog_article_update>
    <blog_article_drawer v-model:visible="createVisible" @ok="getList"></blog_article_drawer>
    <blog_article_content_drawer v-model:visible="articleContentVisible" :id="articleUpdateId"></blog_article_content_drawer>
    <blog_table
        :url="articleListApi"
        :columns="columns"
        default-delete
        add-label="发布文章"
        no-confirm
        :filter-group="filterGroup"
        ref="blogTable"
        :default-params="params"
        @edit="editArticleInfo"
        @add="createVisible = true"
        search-placeholder="搜索文章标题">
      <template #banner_url="{record}:{record: articleType}">
        <a-image :src="record.banner_url" height="50px" style="border-radius: 5px"></a-image>
      </template>
      <template #data="{record}:{record: articleType}">
        <div class="article_data_col">
        <span>
           <i class="fa fa-eye"></i>
        <span>{{ record.look_count }}</span>
        </span>
          <span>
                   <i class="fa fa-thumbs-o-up"></i>
        <span>{{ record.digg_count }}</span>
       </span>
          <span>
                   <i class="fa fa-comments"></i>
        <span>{{ record.comment_count }}</span>
        </span>
          <span>
          <i class="fa fa-star"></i>
        <span>{{ record.collects_count }}</span>
      </span>
        </div>
      </template>
      <template #tags="{record}:{record: articleType}">
        <div class="article_tags_col">
          <a-tag v-for="(item, index) in record.tags" :color="colorList[index]">{{ item }}</a-tag>
        </div>
      </template>
      <template #title="{record}:{record: articleType}">
        <div class="article_title_col" v-html="record.title"></div>
      </template>
      <template #action_middle="{record}:{record: articleType}">
        <a-button type="outline" @click="editArticleContent(record)" >编辑正文 </a-button>
      </template>
    </blog_table>
  </div>
</template>
<script setup lang="ts">
import Blog_table from "@/components/admin/blog_table.vue";
import type {RecordType} from "@/components/admin/blog_table.vue";
import {h, reactive, ref} from "vue";
import {articleListApi } from "@/api/article_api";
import type {articleType} from "@/api/article_api";
import type {articleUpdateType} from "@/api/article_api";
import type {filterOptionType} from "@/components/admin/blog_table.vue";
import {articleCategoryListApi} from "@/api/article_api";
import {tagOptionsApi} from "@/api/tag_api";
import Blog_article_update from "@/components/common/blog_article_update.vue";
import Blog_article_drawer from "@/components/common/blog_article_drawer.vue";
import Blog_article_content_drawer from "@/components/common/blog_article_content_drawer.vue";
import type {paramsType} from "@/api";

const blogTable = ref()


const colorList = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray'
]

const params = reactive<paramsType&{is_user:boolean}>({
  is_user:true
})

const filterGroup: filterOptionType[] = [
  {
    label: "文章分类",
    column: "category",
    source: articleCategoryListApi,
  },
  {
    label: "文章标签",
    column: "tag",
    source: tagOptionsApi,
  }
]
const columns = [
  {title: '标题', slotName: 'title'},
  {title: '分类', dataIndex: 'category'},
  {title: '封面', slotName: 'banner_url'},
  {title: '作者', dataIndex: 'user_nick_name'},
  {title: '标签', slotName: 'tags'},
  {title: '文章数据', slotName: 'data'},
  {title: '上传时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const updateVisible = ref(false)
const recordData = reactive<articleUpdateType>({
  id:""
})

function editArticleInfo(record: articleType) {
  updateVisible.value = true
  recordData.abstract=record.abstract
  recordData.banner_id=record.banner_id
  recordData.category=record.category
  recordData.id=record.id
  recordData.link=record.link
  recordData.source=record.source
  recordData.tags=record.tags
  recordData.title=record.title
  recordData.banner_url=record.banner_url

}

function getList(){
  blogTable.value.getList()
}

const createVisible = ref(false);
const articleContentVisible = ref(false);
const articleUpdateId = ref<string|undefined>(undefined)

function editArticleContent(record: articleType) {
  articleContentVisible.value = true
  articleUpdateId.value = record.id
}

</script>
