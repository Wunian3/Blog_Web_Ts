<template>
  <div class="blog_feed_back">
    <a-form ref="formRef" :model="form" :label-col-props="{span:0}" :wrapper-col-props="{span:24}">
      <a-form-item
          field="email"
          :rules="[{required: true, message:'请输入邮箱', type:'string'}, {message:'请输入正确邮箱', type:'email'}]"
          validate-trigger="blur">
        <a-input v-model="form.email" placeholder="请输入邮箱"></a-input>
      </a-form-item>
      <a-form-item validate-trigger="blur" field="content"
                   :rules="[{required: true, message:'请输入反馈内容', type:'string'}]">
        <a-textarea  show-word-limit :max-length="160" v-model="form.content" :auto-size="{minRows: 4, maxRows:4}"
                     placeholder="请输入反馈内容"></a-textarea>
      </a-form-item>
      <a-form-item>
        <a-button @click="feedbackCreate" type="primary" style="width: 100%">发布</a-button>
      </a-form-item>
    </a-form>
    <div class="feed_back_list">
      <div class="title">反馈列表</div>
      <div class="list">
        <div class="item" v-for="item in list">
          <div class="content">
            <a-typography-paragraph :ellipsis="{  rows: 1,css: true,}">
              {{ item.content }}
            </a-typography-paragraph>
          </div>
          <div class="date">{{ dataFormat(item.created_at) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {feedbackCreateApi, type feedBackCreateType, feedbackListApi} from "@/api/feedback_api.ts";
import {dataFormat} from "@/utils/date.ts";
import {reactive, ref} from "vue";
import type {feedBackType} from "@/api/feedback_api.ts";
import {Message} from "@arco-design/web-vue";
const form = reactive<feedBackCreateType>({
  email:"",
  content:"",
})

const list =ref<feedBackType[]>([])

async function getData(){
  let res = await feedbackListApi()
  list.value = res.data.list
}

getData()

const formRef = ref()
async function feedbackCreate(){
  let val = await formRef.value.validate()
  if(val) return
  let res = await feedbackCreateApi(form)
  if(res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  getData()
  form.content=""
}




</script>
<style  lang="scss">
.blog_feed_back{

  .feed_back_list{
    color: var(--color-text-2);
  .title{
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &::before{
      display: inline-flex;
      width: 35%;
      height: 1px;
      content: "";
      background-color: var(--color-text-4);
    }

    &::after{
      display: inline-flex;
      width: 35%;
      height: 1px;
      content: "";
      background-color: var(--color-text-4);
    }
  }

  .list{
    margin-top: 20px;
    .item{
      margin-bottom: 10px;
      padding: 20px;
      border-radius: 5px;
      background-color: var(--color-fill-2);
      display: flex;
      justify-content: space-between;
      font-size: 12px;

      .arco-typography{
        margin-bottom: 0;
      }

      &:last-child{
        margin-bottom: 0;
      }

      .date{
        white-space: nowrap;
        display: flex;
        align-items: center;
      }

    }
  }
  }
}
</style>