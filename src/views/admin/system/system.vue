<template>
  <div class="system_view">
    <div class="system_menu">
      <router-link :to="{name:'site_config'}">网站设置</router-link>
      <router-link :to="{name: 'email_config'}">邮箱设置</router-link>
      <router-link :to="{name: 'qiniu_config'}">七牛云设置</router-link>
      <router-link :to="{name: 'qq_config'}">QQ设置</router-link>
      <router-link :to="{name: 'jwt_config'}">jwt设置</router-link>
      <router-link :to="{name: 'gaode_config'}">高德设置</router-link>

    </div>
    <div class="system_container">
      <router-view/>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
.system_view {
  display: flex;

  .system_menu {
    width: 160px;
    height: calc(100vh - 130px);
    background-color: var(--color-bg-1);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 20px;

    a {
      color: var(--color-text-2);
      text-decoration: none;
      display: flex;
      border-radius: 5px;
      background-color: var(--color-fill-2);
      height: 50px;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;

      &.router-link-exact-active {
        background-color: var(--active);
        color: white;
      }
    }
  }

  .system_container {
    width: calc(100% - 180px);
    min-height: calc(100vh - 130px);
    background-color: var(--color-bg-1);
    border-radius: 5px;
    margin-left: 20px;
    padding: 20px;
  }
}
</style>
