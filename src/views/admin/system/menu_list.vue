<template>
  <div class="menu_list">
  <menu_create v-model:visible="visible" @ok="blogTable.getList()" :record="recordData"></menu_create>
  <blog_table
      :url="menuListApi"
      :columns="columns"
      default-delete
      add-label="创建菜单"
      no-confirm
      ref="blogTable"
      no-page
      no-check
      no-action-group
      search-placeholder="搜索菜单名称"
      @add="add"
      @edit="edit">
    <template #banners="{record}:{record: menuType}">
      <div class="menu_column_image">
        <a-image
            v-for="item in record.banners"
            height="40px"
            :key="item.id" :src="item.path"></a-image>
      </div>
    </template>
  </blog_table>
</div>
</template>

<script setup lang="ts">
import {type bannerType, defaultMenuForm, type menuCreateRequest, menuListApi} from "@/api/menu_api.ts";
import {reactive, ref} from "vue";
import type {menuType} from "@/api/menu_api.ts";
import Menu_create from "@/components/admin/menu_create.vue";
import Blog_table from "@/components/admin/blog_table.vue";
import defaultForm from "@/components/admin/menu_create.vue";


const blogTable = ref();
const recordData = reactive<menuCreateRequest &{banners:bannerType[],id?:number}>({
  abstract: [],
  abstract_time: 7,
  banner_time: 7,
  image_sort_list: [],
  path: "",
  slogan: "",
  sort: 1,
  title: "",
  banners:[],
})

const columns = [
  {title: '序号', dataIndex: 'sort'},
  {title: '菜单标题', dataIndex: 'title'},
  {title: '路径', dataIndex: 'path'},
  {title: 'slogan', dataIndex: 'slogan'},
  {title: '简介', dataIndex: 'abstract'},
  {title: 'slogan切换时间', dataIndex: 'banner_time'},
  {title: '简介切换时间', dataIndex: 'abstract_time'},
  {title: 'banner', slotName: 'banners'},
  {title: '更新时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const visible = ref(false)

function edit(record: menuType){
   Object.assign(recordData,record)
  visible.value = true
}

function add(){
  Object.assign(recordData,defaultMenuForm)
  recordData.id = undefined
  recordData.banners=[]
  visible.value = true
}


</script>
<style lang="scss" >
.menu_list{
  .menu_column_image{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-row-gap: 5px;
    .arco-image-img{
      border-radius: 5px;
    }
  }
}


</style>
