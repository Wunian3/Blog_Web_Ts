<template>
  <div class="user_info">
    <div class="left">
      <blog_title title="用户信息"></blog_title>
      <a-form ref="formRef" :model="form" :label-col-props="{span:3}"  :wrapper-col-props="{span:21}">
        <a-form-item label="用户名">
          <span>{{form.user_name}}</span>
        </a-form-item>
        <a-form-item label="头像">
          <a-avatar :image-url="form.avatar"></a-avatar>
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

const formRef =ref()

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



}
</style>