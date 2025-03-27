<template>
  <div class="wunian_admin">
    <aside>
      <div class="wunian_logo">
        <img src="/image/blog_logo.png" alt="">
        <div class="logo_head">
          <div>雾念BLOG</div>
          <div>wunianblog</div>
        </div>
      </div>
      <div class="blog_menu">
        <a-menu
            :default-open-keys="['0']"
            :default-selected-keys="['0_2']"
        >
          <a-sub-menu key="0">
            <template #icon><icon-apps></icon-apps></template>
            <template #title>Navigation 1</template>
            <a-menu-item key="0_0">Menu 1</a-menu-item>
            <a-menu-item key="0_1">Menu 2</a-menu-item>
            <a-menu-item key="0_2">Menu 3</a-menu-item>
            <a-menu-item key="0_3">Menu 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="1">
            <template #icon><icon-bug></icon-bug></template>
            <template #title>Navigation 2</template>
            <a-menu-item key="1_0">Menu 1</a-menu-item>
            <a-menu-item key="1_1">Menu 2</a-menu-item>
            <a-menu-item key="1_2">Menu 3</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="2">
            <template #icon><icon-bulb></icon-bulb></template>
            <template #title>Navigation 3</template>
            <a-menu-item key="2_0">Menu 1</a-menu-item>
            <a-menu-item key="2_1">Menu 2</a-menu-item>
            <a-sub-menu key="2_2" title="Navigation 4">
              <a-menu-item key="2_2_0">Menu 1</a-menu-item>
              <a-menu-item key="2_2_1">Menu 2</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
        </a-menu>
      </div>
    </aside>
    <main>
      <div class="blog_head">
        <div class="blog_bread_crumbs">
          <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>Channel</a-breadcrumb-item>
            <a-breadcrumb-item>News</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="blog_function_area">
          <IconMenu class="action_icon"></IconMenu>
          <div class="blog_theme">
            <IconSun class="action_icon"></IconSun>
          </div>
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
      <div class="blog_tabs">
        <div class="blog_tab">
          <span class="blog_tab active">首页</span>
          <span class="blog_tab">用户列表</span>
          <span class="blog_tab">文章列表</span>
        </div>
      </div>
      <router-view/>
    </main>


  </div>
</template>

<script setup lang="ts">
import {
  IconMenu,
  IconSun,
  IconApps,
  IconBug,
  IconBulb,
  IconDown,
} from '@arco-design/web-vue/es/icon';

</script>

<style lang="scss">
.wunian_admin {
  display: flex;
  color: var(--color-text-1);
  aside {
    width: 240px;
    border-right: 1px solid var(--bg);
    height: 100vh;
    .wunian_logo{
      height: 90px;
      display: flex;
      padding: 20px;
      align-items: center;
      border-bottom: 1px solid var(--bg);

      img{
        width: 60px;
        height: 60px;
      }
      .logo_head{
        margin-left: 20px;
        >div:nth-child(1){
        font-size: 22px;
        }
        >div:nth-child(2){
          font-size: 12px;
        }
      }

    }
  }


  main {
    width: calc(100% - 240px);

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
    .blog_tabs{
      height: 30px ;
      width: 100%;
      border-bottom: 1px solid var(--bg);
      padding: 0 20px;
      display: flex;
      align-items: center;

      。blog_tab{
        border-radius: 5px;
        border:1px solid var(--bg);
        padding: 2px 6px;
        margin-right: 10px;
        cursor: pointer;

        &active{

        }
      }
    }

  }
}

</style>