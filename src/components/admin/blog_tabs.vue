<template>
  <div class="blog_tabs">
    <swiper
          :slides-per-view="12"
          class="mySwiper"
      >
        <swiper-slide v-for="(item, index) in tabList" :key="item.name">
     <span
         :class="{blog_tab: true, active: route.name === item.name}"
         @click="clickTab(item)"
         @click.middle="closeTab(item)">
    {{ item.title }}
    <IconClose @click.stop="closeTab(item)" v-if="item.name !== 'home'"></IconClose>
     </span>
        </swiper-slide>
    </swiper>

    <span @click="closeAllTab" class="blog_tab close_all_tabs">全部关闭</span>
  </div>
</template>

<script setup lang="ts">
import {IconClose} from "@arco-design/web-vue/es/icon";
import {onMounted, ref, watch} from "vue";
import type {Ref} from "vue";
import {useRoute,useRouter} from "vue-router";
import {Swiper, SwiperSlide} from 'swiper/vue';

const slidesPerView = ref(12)

onMounted(() => {
  // 总宽度
  let mySwiperWith = document.querySelector(".mySwiper").clientWidth
  // 实际宽度
  let actualWidth = document.querySelector(".swiper-wrapper").scrollWidth
  if (actualWidth <= mySwiperWith) {
    return
  }
  let swiperSlideList = document.querySelectorAll(".swiper-wrapper .swiper-slide")

  let sum = 0
  let count = 0

  for (const slide of swiperSlideList) {
    sum += slide.clientWidth
    if (sum > mySwiperWith) {
      break
    }
    count++
  }
  slidesPerView.value = count
})

const route = useRoute();
const router= useRouter();

interface tabType {
  name: string;
  title: string;
}

const tabList: Ref<tabType[]> = ref([
  {name: "home", title: "首页"},
])

function clickTab(item: tabType) {
  router.push({name: item.name})
}

function persistence() {
  localStorage.setItem("tabList", JSON.stringify(tabList.value))
}

function loadTabs() {
  let val = localStorage.getItem("tabList")
  if (val === null) {
    return
  }
  let tabs = []
  try {
    tabs = JSON.parse(val)
  } catch (e) {
    return;
  }
  tabList.value = tabs
}

loadTabs()
watch(() => tabList.value.length, () => {
  persistence()
})

function closeTab(item: tabType) {
  //home的不需要
  if (item.name === "home") {
    return
  }
  // 找当前tab在列表里面的索引
  let index = tabList.value.findIndex((tab) => item.name === tab.name)
  tabList.value.splice(index, 1)
  if (route.name === item.name) {
    let beforeIndex = index - 1
    let beforeItem = tabList.value[beforeIndex]
    clickTab(beforeItem)
  }

}

function closeAllTab() {
  tabList.value = [
    {name: "home", title: "首页"},
  ]

  router.push({name: "home"})
}


watch(() => route.name, () => {
  if (!inList(route.name as string)) {
    // 该路由不在列表里，将当前路由加到列表里面
    tabList.value.push({
      name: route.name as string,
      title: route.meta.title as string,
    })
  }
}, {immediate: true})

function inList(name: string): boolean {
  for (const tab of tabList.value) {
    if (tab.name === name) {
      return true
    }
  }
  return false
}

</script>
<style  lang="scss">
.blog_tabs{
  height: 30px ;
  width: 100%;
  border-bottom: 1px solid var(--bg);
  padding: 0 20px;
  display: flex;
  align-items: center;
  position: relative;

  .mySwiper {
    width: calc(100% - 94px);
    overflow: hidden;
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;

    .swiper-wrapper {
      display: flex;
      justify-content: start;
      width: 100%;

      .swiper-slide {
        width: auto !important;
      }
    }
  }

  .blog_tab{
    border-radius: 5px;
    border:1px solid var(--bg);
    padding: 2px 8px;
    margin-right: 10px;
    cursor: pointer;


    &.active{
      background-color: var(--active);
      color:white;
      border:none;

      svg:hover{
        background-color: rgb(var(--arcoblue-4));
      }
    }
    svg{
      font-size: 12px;
      border-radius: 50%;
      &:hover{
        background-color: var(--bg);
      }
    }
  }

  .close_all_tabs{
    position: absolute;
    right: 20px;
    margin-right: 0;
  }
}
</style>