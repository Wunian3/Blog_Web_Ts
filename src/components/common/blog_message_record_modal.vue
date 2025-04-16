<template>
  <div>
    <Modal :title="`与${props.nickName}的聊天`" width="40%" :visible="props.visible" :footer="false" body-class="blog_message_record_modal_body" @cancel="close">
      <blog_message_record  ref="messageRecordRef" :userID="props.userID" ></blog_message_record>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import blog_message_record from "@/components/common/blog_message_record.vue";
import {Modal} from "@arco-design/web-vue";
import {nextTick, ref} from "vue";

interface Props {
  visible: boolean
  userID: number
  nickName: string
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible","close"])

function close() {
  emits("update:visible", false)
  emits("close")
}

const messageRecordRef = ref()

function getData(){
  nextTick(()=>{
    messageRecordRef.value.getRecordData()
  })
}

defineExpose({
  getData
})

</script>

<style lang="scss">
.blog_message_record_modal_body{
  padding: 0;
}
</style>