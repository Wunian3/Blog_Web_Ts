
<template>
  <div class="menu_list_view">
    <a-modal title="添加标签" v-model:visible="visible" :on-before-ok="ok">
      <a-form ref="formRef" :model="form">
        <a-form-item field="title" label="标签名称" :rules="[{required:true,message:'请输入标签名称'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.title" placeholder="标签名称"></a-input>
        </a-form-item>
        <a-form-item field="color" label="标签颜色" :rules="[{required:true,message:'请输入标签颜色'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.color" placeholder="标签颜色"></a-input>
          <input style="margin-left: 10px" type="color" v-model="form.color">
        </a-form-item>
      </a-form>
    </a-modal>
    <blog_table
        :url="bigModelRoleTagListApi"
        :columns="columns"
        default-delete
        add-label="创建标签"
        no-confirm
        ref="blogTable"
        no-page
        no-check
        no-action-group
        search-placeholder="搜索标签名称"
        @add="add"
        @edit="edit">
    </blog_table>
  </div>
</template>
<script setup lang="ts">
import blog_table from "@/components/admin/blog_table.vue";
import {
  bigModelRoleTagListApi,
  type bigModelRoleTagType, bigModelRoleTagUpdateApi
} from "@/api/big_model_api.ts";
import {h, reactive, ref} from "vue";
import {Message, Tag} from "@arco-design/web-vue";


const form = reactive<bigModelRoleTagType>({
  id:0,
  title:"",
  color:"",
  roleCount:0,
})



const blogTable = ref()
const columns = [
  {title: '标签名称', dataIndex: 'title'},
  {title: '标签颜色', dataIndex: 'color',render: (data:any) => {
      const record = data.record as bigModelRoleTagType
      return h(Tag, {color:record.color},{default:() => record.title})
    }
  },
  {title: '角色数量', dataIndex: 'roleCount'},
  {title: '添加时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const visible = ref(false)

function edit(record: bigModelRoleTagType){
  form.id = record.id
  form.title = record.title
  form.color = record.color
  visible.value = true
}

function add(){
  visible.value=true
}

const formRef = ref()

async function ok(){
  let val = await formRef.value.validate()
  if(val) return false
  let res = await bigModelRoleTagUpdateApi(form)
  if (res.code ){
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  visible.value=false
  blogTable.value.getList()
}

</script>
<style  lang="scss">

</style>