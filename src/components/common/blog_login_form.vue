<template>
  <a-form class="blog_login_form" ref="formRef" :model="form" :label-col-props="{span: 0}"
          :wrapper-col-props="{span: 24}">
    <div class="title">用户登录</div>
    <a-form-item field="user_name" label="用户名"
                 :rules="[{required:true,message:'请输入用户名'}]"
                 :validate-trigger="['blur']"
    >
      <a-input v-model="form.user_name" placeholder="用户名">
        <template #prefix>
          <icon-user/>
        </template>
      </a-input>
    </a-form-item>
    <a-form-item field="password" label="密码"
                 :rules="[{required:true,message:'请输入密码'}]"
                 :validate-trigger="['blur']"
    >
      <a-input type="password" v-model="form.password" placeholder="密码">
        <template #prefix>
          <icon-lock/>
        </template>
      </a-input>
    </a-form-item>
    <a-button type="primary" @click="loginEmail">登录</a-button>
    <div class="other-login">
      <div class="label">第三方登录</div>
      <div class="icons">
        <a href="javascript:void(0)" @click ="qqLogin">
          <img src="/image/icon/qq.png" alt="">
        </a>
      </div>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import "@/assets/font.css"
import {IconLock, IconUser} from "@arco-design/web-vue/es/icon";
import {reactive, ref} from "vue";
import {loginEmailApi, loginQQPathApi} from "@/api/user_api";
import type {loginEmailType} from "@/api/user_api";
import {Message} from "@arco-design/web-vue";
import {useStore} from "@/stores";
import {useRoute} from "vue-router";

const props = defineProps({
  qqRedirectPath:{
    type:String,
  }
})

const route = useRoute();
const store = useStore();
const emits = defineEmits(["ok"])

const form = reactive<loginEmailType>({
  user_name: "",
  password: "",
})

const formRef = ref()

function  formReset(){
  formRef.value.resetFields(Object.keys(form))
  formRef.value.clearValidate(Object.keys(form))
}

defineExpose({
  formReset
})

async function loginEmail() {
  let val = await formRef.value.validate()
  if (val) {
    return
  }

  let res = await loginEmailApi(form)
  if (res.code) {

    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  store.setToken(res.data)
  emits("ok")
}

async function qqLogin() {
  let res = await loginQQPathApi()
  if (res.code) {
    Message.error(res.msg)
    return
  }
  if (res.data === "") {
    Message.warning("未配置qq登录")
    return
  }
  // 存一下当前路径?login页面来的
  let path = route.path
  if (props.qqRedirectPath){
    path = props.qqRedirectPath
  }
  localStorage.setItem("redirectPath", path)

  window.open(res.data, "_self")

}

</script>

<style lang="scss">
.blog_login_form{
  .title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
    color: var(--active);
    font-family: likejianjianti;
  }

  .other-login {

    margin-top: 20px;

    .label {
      display: flex;
      align-items: center;
      color: var(--color-text-2);
      justify-content: space-between;

      &::before {
        display: inline-flex;
        width: 35%;
        height: 1px;
        content: "";
        background-color: var(--color-text-4);
      }

      &::after {
        display: inline-flex;
        width: 35%;
        height: 1px;
        content: "";
        background-color: var(--color-text-4);
      }
    }

    .icons {
      display: flex;
      justify-content: center;
      margin-top: 10px;

      > a {
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }

      img {
        width: 40px;
        height: 40px;
      }
    }

  }
}

</style>