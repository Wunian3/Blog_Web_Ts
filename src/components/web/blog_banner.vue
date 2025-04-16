<template>
  <div class="blog_banner">
    <div class="head">
      <div class="slogan">{{ data.slogan }}</div>
      <div class="abstract">
        <template v-if="typeof data.abstract ==='object'">
          <VueTyped :strings="data.abstract" loop >
            <span class="typing"></span>
          </VueTyped>
        </template>
        <template v-else>
          {{ data.abstract }}
        </template>

      </div>
    </div>
    <a-carousel
        :auto-play="{interval: data.banner_time as number * 1000}"
        indicator-type="dot"
        show-arrow="hover"
    >
      <a-carousel-item v-for="item in (data.banners as bannerType[])">
        <img class="banner_image" alt="" :src="item.path"/>
      </a-carousel-item>
    </a-carousel>
  </div>
</template>
<script setup lang="ts">
import VueTyped from 'vue3typed/libs/typed/index.vue';
import type {bannerType, menuType} from "@/api/menu_api.ts";
import {menuDetailApi} from "@/api/menu_api.ts";
import {reactive, watch} from "vue";

interface BannerType{
  abstract: string | string[]
  banner_time?:number
  banners:string | bannerType[]
  slogan:string
}

interface Props{
  data?:BannerType;
}

const props = defineProps<Props>()

const data = reactive<BannerType>({
  abstract:[],
  banner_time:7,
  banners:[],
  slogan:"",
})

async function getData() {
  if(props.data){
    if(typeof props.data.banners === 'string'){
      data.banners = [{id:1,path : props.data.banners}]
    }

    data.abstract = props.data.abstract
    data.banner_time = props.data.banner_time
    data.slogan = props.data.slogan
    return
  }

  const key = `menus__${location.pathname}`

  const val = sessionStorage.getItem(key)
  if (val !== null) {
    try {
      const jsonData = JSON.parse(val) as BannerType
      data.abstract = jsonData.abstract
      data.banner_time = jsonData.banner_time
      data.banners = jsonData.banners
      data.slogan = jsonData.slogan
      return
    } catch (e) {
    }
  }

  let res = await menuDetailApi(location.pathname)
  data.abstract = res.data.abstract
  data.banner_time = res.data.banner_time
  data.banners = res.data.banners
  data.slogan = res.data.slogan
  sessionStorage.setItem(key, JSON.stringify(data))

}

watch(()=>props.data,()=>{
  getData()

},{immediate:true})
</script>
<style  lang="scss">
.blog_banner{
  width: 100%;
  height: 700px;
  position: relative;
  background-color: var(--color-fill-2);

  .head{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    z-index: 2;
    color: white;

    .slogan{
      font-size: 30px;
      font-weight: 400;
      text-align: center;
      margin-bottom: 10px;
    }

    .abstract{
      font-size: 18px;
      text-align: center;
    }
  }

  .arco-carousel{
    height: 100%;

    .banner_image{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>