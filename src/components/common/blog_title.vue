
<template>
  <div class="blog_title">
    {{props.title}}
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {type: String}
})
</script>
<style scoped lang="scss">
.blog_title{
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;

  &::before{
    width: 4px;
    height: 1.2rem;
    margin-right: 2px;
    content:"";
    display: inline-block;
    background-color: var(--active);


  }

}
</style>