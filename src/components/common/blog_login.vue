<template>
  <div>
    <a-modal width="400px" modal-class="blog_login_modal" :visible="props.visible" title="用户登录" :footer="false "
             @cancel="close">
      <blog_login_form  ref="blogLoginForm" @ok="close"></blog_login_form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import Blog_login_form from "@/components/common/blog_login_form.vue";
import {ref} from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
  }
})
const emits = defineEmits(["update:visible"])
const blogLoginForm = ref()

function close() {
  emits("update:visible", false)
  blogLoginForm.value.formReset()
}

</script>

<style>
.blog_login_modal{
  .arco-modal-header {
    display: none;
  }

}


</style>