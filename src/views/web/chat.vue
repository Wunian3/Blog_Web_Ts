<template>
  <div class="chat_view">
    <blog_nav no-scroll></blog_nav>
    <main>
      <div class="container">
        <blog_chat_group></blog_chat_group>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">


import Blog_nav from "@/components/web/blog_nav.vue";
import Blog_chat_group from "@/components/common/blog_chat_group.vue";
</script>
<style lang="scss">
.chat_view{
  height: 100vh;

  main{
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top:80px;

    .container{
      width: var(--container_width);
    }
  }
}
</style>