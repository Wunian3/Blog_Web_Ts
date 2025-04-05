<template>
  <div>
    <user_create v-model:visible="visible" @ok="createOk"></user_create>
    <a-modal title="编辑用户" v-model:visible="updateVisible" :on-before-ok="updateUserOk">
      <a-form ref="formRef" :model="updateUserForm">
        <a-form-item field="nick_name" label="昵称"
                     :rules="[{required:true,message:'请输入昵称'}]"
                     :validate-trigger="['blur']"
        >
          <a-input v-model="updateUserForm.nick_name" placeholder="昵称"></a-input>
        </a-form-item>
        <a-form-item field="role" label="权限">
          <a-select v-model="updateUserForm.role" :options="roleOptions" placeholder="选择角色"></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <blog_table :url="userListApi"
                :columns="columns"
                default-delete
                add-label="创建用户"
                no-confirm
                ref="blogTable"
                :filter-group="filterGroup"
                search-placeholder="搜索用户名、昵称"
                @add="visible=true"
                @edit="edit">
      <template #avatar="{record}:{record: userInfoType}">
        <a-avatar :imageUrl="record.avatar"></a-avatar>
      </template>
      <template #ip="{record}:{record: userInfoType}">
        <span>{{record.ip}} ({{ record.addr}})</span>
      </template>
    </blog_table>
  </div>
</template>
<script setup lang="ts">

import Blog_table from "@/components/admin/blog_table.vue";
import {userListApi} from "@/api/user_api.ts";
import type {userInfoType} from "@/api/user_api.ts";
import type {filterOptionType} from "@/components/admin/blog_table.vue";
import {roleIdListApi} from "@/api/role_api.ts";
import type {RecordType} from "@/components/admin/blog_table.vue";
import {reactive, ref} from "vue";
import User_create from "@/components/admin/user_create.vue";
import {userUpdateApi} from "@/api/user_api.ts";
import type {userUpdateRequest} from "@/api/user_api.ts";
import {roleOptions} from "@/global/global.ts";
import {Message} from "@arco-design/web-vue";
const columns = [
  {title: '昵称', dataIndex: 'nick_name'},
  {title: '头像', slotName: 'avatar'},
  {title: '邮箱', dataIndex: 'email'},
  {title: '角色', dataIndex: 'role'},
  {title: 'ip/地址', slotName: 'ip'},
  {title: '注册时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const filterGroup :filterOptionType[]= [
  {label: "角色过滤",
    column:"role",
    source:roleIdListApi,
  }
]

const visible = ref(false)

const blogTable =ref()

function createOk(){
  blogTable.value.getList()
}

//编辑
const updateVisible = ref(false)
const updateUserForm = reactive<userUpdateRequest>({
  nick_name: "",
  role: 0,
  user_id: 0
})

function edit(record: RecordType<userInfoType>): void {
  updateUserForm.user_id = record.id
  updateUserForm.role = record.role_id
  updateUserForm.nick_name = record.nick_name
  updateVisible.value = true
}

const formRef = ref()

async function updateUserOk() {
  let val = await formRef.value.validate()
  if (val) return false

  let res = await userUpdateApi(updateUserForm)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  blogTable.value.getList()
  return true
}


</script>

