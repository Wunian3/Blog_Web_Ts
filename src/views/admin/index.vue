<template>
  <div class="wunian_admin">
    <aside :class="{collapsed: store.collapsed}">
      <Blog_logo></Blog_logo>
      <Blog_menu></Blog_menu>
    </aside>
    <main>
      <div class="blog_head">
        <Blog_bread_crumb></Blog_bread_crumb>
        <div class="blog_function_area">
          <IconHome class="action_icon" @click ="goIndex"></IconHome>
          <Blog_theme></Blog_theme>
          <Blog_user_inf_menu></Blog_user_inf_menu>
        </div>
      </div>
      <Blog_tabs></Blog_tabs>

      <div class="blog_container">
        <router-view  v-slot="{Component}">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </main>


  </div>
</template>

<script setup lang="ts">
import Blog_menu from '@/components/admin/blog_menu.vue';
import {
  IconHome,
  IconDown,
} from '@arco-design/web-vue/es/icon';
import {type Component, ref} from "vue";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import Blog_bread_crumb from "@/components/admin/blog_bread_crumb.vue";
import Blog_logo from "@/components/admin/blog_logo.vue";
import Blog_tabs from "@/components/admin/blog_tabs.vue";
import Blog_theme from "@/components/common/blog_theme.vue";
import {useStore} from "@/stores";
import Blog_user_inf_menu from "@/components/common/blog_user_inf_menu.vue";

const store = useStore()
const route = useRoute()
const router = useRouter()

function goIndex(){
  router.push({
    name:"index"
  })
}

</script>
<style lang="scss">
.wunian_admin {
  display: flex;
  color: var(--color-text-1);
  height: 100vh;

  aside {
    width: 240px;
    border-right: 1px solid var(--bg);
    height: 100vh;
    background-color: var(--color-bg-1);
    transition: all .3s;
    position: relative;
  }
  aside.collapsed {
    width: 48px;

    & ~ main {
      width: calc(100% - 48px);
    }
  }

  main {
    width: calc(100% - 240px);
    overflow-x: hidden;
    overflow-y: auto;
    transition: all .3s;

    .blog_head{
      width: 100%;
      height: 60px;
      border-bottom: 1px solid var(--bg);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;
      background-color: var(--color-bg-1);

      .blog_function_area{
        display: flex;
        align-items: center;

        .action_icon{
          margin-right: 10px;
          cursor: pointer;
          font-size: 16px;
          transition: color .3s;

          &:hover{
            color: var(--active);
          }
        }

        .blog_user_info_menu{
          img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
          .blog_user_info_menu_dropdown{
            display: flex;
            align-items: center;
            cursor: pointer;
            .blog_user_info_menu_dropdown_span{
              margin : 0 5px;
            }
          }
        }
      }
    }

    .blog_container {
      background-color: var(--bg);
      min-height: calc(100vh - 90px);
      padding:20px;
    }
  }
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-enter-active {
  transform: translateX(-30px);
  opacity: 0;
}
.fade-enter-to {

  transform: translateX(0px);
  opacity: 1;
}

.fade-leave-active ,.fade-enter-active{
  transition: all 0.3s ease-out;
}


</style>