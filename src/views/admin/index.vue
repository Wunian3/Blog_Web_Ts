<template>
  <div class="wunian_admin">
    <aside>
      <Blog_logo></Blog_logo>
      <Blog_menu></Blog_menu>
    </aside>
    <main>
      <div class="blog_head">
        <Blog_bread_crumb></Blog_bread_crumb>
        <div class="blog_function_area">
          <IconMenu class="action_icon"></IconMenu>
          <Blog_theme></Blog_theme>
          <div class="blog_user_info_menu">
            <a-dropdown  >
              <div class="blog_user_info_menu_dropdown">
                <img src="/image/默认头像.jpg" alt="">
                <span class="blog_user_info_menu_dropdown_span">wunian</span>
                <IconDown></IconDown>
              </div>
              <template #content>
                <a-doption>Option 1</a-doption>
                <a-doption>Option 3</a-doption>
                <a-doption>Option 4</a-doption>
                <a-doption>Option 5</a-doption>
              </template>
            </a-dropdown>
          </div>
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
  IconMenu,
  IconSun,
  IconApps,
  IconBug,
  IconBulb,
  IconUser,
  IconDown,
} from '@arco-design/web-vue/es/icon';
import {type Component, ref} from "vue";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import Blog_bread_crumb from "@/components/admin/blog_bread_crumb.vue";
import Blog_logo from "@/components/admin/blog_logo.vue";
import Blog_tabs from "@/components/admin/blog_tabs.vue";
import Blog_theme from "@/components/common/blog_theme.vue";

const route = useRoute()
const router = useRouter()


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
  }


  main {
    width: calc(100% - 240px);
    overflow-x: hidden;
    overflow-y: auto;

    .blog_head{
      width: 100%;
      height: 60px;
      border-bottom: 1px solid var(--bg);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      align-items: center;

      .blog_function_area{
        display: flex;
        align-items: center;
        .action_icon{
          margin-right: 10px;
          cursor: pointer;
          font-size: 16px;
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