<template>
  <div class="user_info">
    <div class="left">
      <blog_cropper ref="clipperRef"
                   :type="clipperData.type"
                   :allow-type-list="clipperData.allowTypeList"
                   :limit-size="clipperData.limitSize"
                   :fixed-number="clipperData.fixedNumber"
                   :fixed-number-aider="clipperData.fixedNumberAider"
                   :preview-width="clipperData.previewWidth"
                   @confirm="onConfirm" >

      </blog_cropper>

      <blog_title title="用户信息"></blog_title>
      <a-form ref="formRef" :model="form" :label-col-props="{span:isLaptops1?5:3}"  :wrapper-col-props="{span:isLaptops1?19:21}">
        <a-form-item label="用户名">
          <span>{{form.user_name}}</span>
        </a-form-item>
        <a-form-item label="头像">
          <a-avatar @click="showCropper" :image-url="form.avatar"></a-avatar>
        </a-form-item>
        <a-form-item field="nick_name" label="昵称" :rules="[{required:true,message:'请输入昵称'}]"
                     :validate-trigger="['blur']">
          <a-input @change="userInfoUpdate" v-model="form.nick_name" placeholder="昵称"></a-input>
        </a-form-item>
        <a-form-item label="我的签名">
          <a-textarea @change="userInfoUpdate" :image-url="form.sign" placeholder="我的签名" :auto-size="{minRows:3,maxRows:3}"></a-textarea>
        </a-form-item>
        <a-form-item label="我的博客">
          <a-input @change="userInfoUpdate" :image-url="form.link" placeholder="我的博客" auto-size></a-input>
        </a-form-item>
        <a-form-item label="邮箱">
          <span>{{form.email}}</span>
        </a-form-item>
        <a-form-item label="当前角色">
          <span>{{form.role}}</span>
        </a-form-item>
        <a-form-item label="注册来源">
          <span>{{form.sign_status}}</span>
        </a-form-item>
        <a-form-item label="用户积分">
          <span>{{form.integral}}</span>
        </a-form-item>
      </a-form>
      <blog_title title="操作"></blog_title>

      <blog_update_password v-model:visible="updatePasswordVisible"></blog_update_password>

      <blog_bind_email v-model:visible="bindEmailVisible"></blog_bind_email>

      <div class="action_group">
        <a-button type="primary" @click="bindEmailVisible = true">绑定邮箱</a-button>
        <a-button type="primary" @click="updatePasswordVisible = true">修改密码</a-button>
        <a-button type="primary" status="danger">注销退出</a-button>
      </div>
    </div>
    <div class="right">
      <blog_title title="预览"></blog_title>
      <div class="user_info_preview" style="width: 300px ;margin-top:20px" >
        <blog_user_info_preview :data="{
          avatar:form.avatar,
          nick_name:form.nick_name,
          sign:form.sign,
          link:form.link,
          collects_count:Random.integer(1,200),
          comment_count:Random.integer(1,200),
          digg_count:Random.integer(1,200),
          look_count:Random.integer(1,200),
        }"></blog_user_info_preview>
      </div>
    </div>



  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import {type userInfoType, userInfoUpdateApi, type userInfoUpdateType} from "@/api/user_api.ts";
import {userInfoApi} from "@/api/user_api.ts";
import Blog_title from "@/components/common/blog_title.vue";
import {Message} from "@arco-design/web-vue";
import Blog_update_password from "@/components/common/blog_update_password.vue";
import Blog_bind_email from "@/components/common/blog_bind_email.vue";
import Blog_cropper from "@/components/common/blog_cropper.vue";
import Blog_user_info_preview from "@/components/common/blog_user_info_preview.vue";
import {Random} from "mockjs";

const isLaptops1 = isLaptops

const formRef =ref()

interface IClipper{
  type: string
  allowTypeList: string[]
  limitSize: number
  fixedNumber: number[]
  fixedNumberAider?: number[]
  previewWidth:number
  previewWidthAider?:number
}
const clipperData = ref<IClipper>({
  type: '',
  allowTypeList: [],
  limitSize: 1,
  fixedNumber: [],
  previewWidth: 0
})
const clipperRef = ref()
function showCropper(){
  clipperData.value = {
    type: 'browserLogo', // 该参数可根据实际要求修改类型
    allowTypeList: ['png', 'jpg', 'jpeg',], // 允许上传的图片格式
    limitSize: 1, // 限制的大小
    fixedNumber: [1, 1],  // 截图比例，可根据实际情况进行修改
    previewWidth: 100 // 预览宽度
  }
  // 打开裁剪组件
  clipperRef.value.uploadFile()
}

function onConfirm(val: string) {
  form.avatar = val
  userInfoUpdate()
}

const form = reactive<userInfoType>({
  id:0,
  created_at:"",
  nick_name:"",
  user_name:"",
  avatar:"",
  email:"",
  tel:"",
  addr:"",
  token:"",
  ip:"",
  role:"",
  role_id:0,
  sign_status:"",
  integral:0,
  sign:"",
  link:"",
})


async function getData(){
  let res = await userInfoApi()
  Object.assign(form,res.data)
}

async function userInfoUpdate(){
  let val = await formRef.value.validate()
  if(val)return

  let data:userInfoUpdateType = {
    link: form.link,
    nick_name: form.nick_name,
    sign: form.sign,
    avatar:form.avatar
  }
  let res = await userInfoUpdateApi(data)
  if(res.code){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)


}

getData()

const updatePasswordVisible = ref(false);
const bindEmailVisible = ref(false);






</script>

<style lang="scss" >
.user_info{
  display: flex;
  background-color: var(--color-bg-1);
  padding: 20px;
  border-radius: 5px;
  height: calc(100vh - 130px);

  .left{

    width: 40%;
    .arco-form{
      margin-top: 10px;
    }
    .action_group{
      margin-top: 10px;
      >button{
        margin-right: 10px;
      }
    }
  }

  .right{
    margin-left: 20px;
    width: calc(60% - 20px);
  }


}
</style>