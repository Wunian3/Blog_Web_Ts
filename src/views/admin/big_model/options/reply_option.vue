<template>
  <div class="menu_list_view">
    <a-modal title="添加自动回复" v-model:visible="visible" :on-before-ok="ok">
      <a-form ref="formRef" :model="form">
        <a-form-item field="name" label="规则名称" :rules="[{required:true,message:'请输入规则名称'}]"
                     :validate-trigger="['blur']">
          <a-input v-model="form.name" placeholder="规则名称"></a-input>
        </a-form-item>
        <a-form-item field="mode" label="匹配模式" :rules="[{required:true,message:'请选择匹配模式'}]"
                     :validate-trigger="['blur']">
          <a-select v-model="form.mode" placeholder="匹配模式" :options="modeOptions"></a-select>
        </a-form-item>
        <a-form-item field="rule" label="规则" :rules="[{required:true,message:'请输入规则'}]"
                     :validate-trigger="['blur']">
          <a-textarea v-model="form.rule" placeholder="规则" :auto-size="{minRows: 3, maxRows: 5}"></a-textarea>
        </a-form-item>
        <a-form-item field="replyContent" label="回复内容" :rules="[{required:true,message:'请输入回复内容'}]"
                     :validate-trigger="['blur']">
          <a-textarea v-model="form.replyContent" placeholder="回复内容"
                      :auto-size="{minRows: 4, maxRows: 5}"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <blog_table
        :url="autoReplyListApi"
        :columns="columns"
        default-delete
        add-label="创建自动回复"
        no-confirm
        ref="blogTable"
        no-check
        no-action-group
        search-placeholder="搜索规则名称"
        @add="add"
        @edit="edit">
    </blog_table>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from "vue";
import blog_table from "@/components/admin/blog_table.vue";
import {autoReplyListApi, type autoReplyType, autoReplyUpdateApi} from "@/api/big_model_api.ts";
import {h} from "vue";
import {Message} from "@arco-design/web-vue";

const form = reactive<autoReplyType>({
  id:0,
  name:"",
  mode:1,
  rule:"",
  replyContent:"",
})


const modeDict = {
  1: "精确匹配",
  2: "模糊匹配",
  3: "前缀匹配",
  4: "正则匹配",
};
const modeOptions = [
  {label:"精确匹配",value:1},
  {label:"模糊匹配",value:2},
  {label:"前缀匹配",value:3},
  {label:"正则匹配",value:4},
]
const blogTable = ref()
const columns = [
  {title: '规则名称', dataIndex: 'name'},
  {title: '匹配模式', dataIndex: 'mode',render: (data:any) => {
      const record = data.record as autoReplyType
      return h("span",null,{default:() => modeDict[record.mode]})
    }
  },
  {title: '规则', dataIndex: 'rule'},
  {title: '回复内容', dataIndex: 'replyContent'},
  {title: '添加时间', slotName: 'created_at'},
  {title: '操作', slotName: 'action'},
]

const visible = ref(false)

function edit(record: autoReplyType){
  form.id = record.id
  form.name = record.name
  form.mode = record.mode
  form.rule = record.rule
  form.replyContent = record.replyContent
  visible.value = true
}

function add(){
  visible.value=true
}

const formRef = ref()

async function ok(){
  let val = await formRef.value.validate()
  if(val) return false
  let res = await autoReplyUpdateApi(form)
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