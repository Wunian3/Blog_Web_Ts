<template>
  <div class="image_list">
    <a-modal title="图片上传" @before-open="beforeOpen" v-model:visible="visible" @ok="getList">
      <a-upload
          list-type="picture-card"
          action="/api/images"
          name="images"
          :headers="{token: store.userInfo.token}"
          v-model:file-list="fileList"
          image-preview
          class="blog_image_upload"
          multiple
          @success="imageUploadSuccessEvent"
      ></a-upload>
    </a-modal>

    <blog_table
        :url="imageListApi"
        :columns="columns"
        default-delete
        add-label="上传图片"
        no-confirm
        no-edit
        ref="blogTable"
        search-placeholder="搜索图片名称"
        @add="visible=true">
      <template #path="{record}: {record: imageType}">
        <a-image :src="record.path" style="border-radius: 5px" height="50px"></a-image>
      </template>
      <template #action_left="{record}: {record: imageType}">
        <a style="margin-right: 10px" :href="record.path" :download="record.name">
          <a-button type="primary">
            <template #icon>
              <IconDownload></IconDownload>
            </template>
            图片下载
          </a-button>
        </a>
      </template>

    </blog_table>
  </div>
</template>
<script setup lang="ts">

import Blog_table from "@/components/admin/blog_table.vue";
import {imageListApi} from "@/api/image_api.ts";
import type {RecordType} from "@/components/admin/blog_table.vue";
import {useStore} from "@/stores";
import {FileItem} from "@arco-design/web-vue";
import type {baseResponse} from "@/api";
import {h, ref} from "vue";
import {Tag} from "@arco-design/web-vue";
import {IconDownload} from "@arco-design/web-vue/es/icon";
import {Message} from "@arco-design/web-vue";
import type {imageType, imagesUploadResponse} from "@/api/image_api";


const columns = [
  {title: '文件名', dataIndex: 'name'},
  {
    title: '上传类型', dataIndex: 'image_type', render: (data:any) => {
      const record = data.record as imageType
      let color = "red"
      if (record.image_type === "本地") {
        color = "blue"
      }
      return h(Tag, {color: color}, {default: () => record.image_type})
    }
  },
  {title: '预览', slotName: 'path'},
  {title: 'banner数', dataIndex: 'bannerCount'},
  {title: '文章数', dataIndex: 'articleCount'},
  {title: '上传时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const blogTable =ref()

const store = useStore()
const fileList = ref<FileItem[]>([])
function beforeOpen() {
  // 清空数据
  fileList.value = []
}

function getList() {
  blogTable.value.getList()
}

const visible = ref(false)
function imageUploadSuccessEvent(fileItem: FileItem) {
  const response = fileItem.response as baseResponse<imagesUploadResponse[]>
  if (response.data.length > 0) {
    // 找里面有没有 is_success 为false的
    response.data.forEach((item) => {
      if (!item.is_success) {
        Message.error(item.msg)
        return
      }
      Message.success(item.msg)
    })
  }
}

</script>

<style lang="scss">
    .blog_image_upload{
      .arco-upload-list-picture{
        width:inherit;
      }
    }

</style>
