<template>
  <div>
    <a-modal title="聊天" width="40%" :visible="props.visible" :footer="false" body-class="blog_message_record_modal_body" @cancel="close">
      <blog_message_record :userID="props.userID"></blog_message_record>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import blog_message_record from "@/components/common/blog_message_record.vue";

interface Props {
  visible: boolean
  userID: number
}

const props = defineProps<Props>()
const emits = defineEmits(["update:visible"])

function close() {
  emits("update:visible", false)
}
</script>

<style lang="scss">
.blog_message_record_modal_body{
  padding: 0;
}
</style>