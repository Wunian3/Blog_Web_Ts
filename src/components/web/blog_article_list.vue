<template>
    <div class="blog_article_list">
      <template v-if="data.list.length">
        <div class="source">
          <blog_article_item v-for="item in data.list" :data="item"></blog_article_item>
        </div>
        <div class="page">
          <a-pagination :total="data.count" v-model:current="params.page" @change="pageChange" show-total></a-pagination>
        </div>
      </template>
      <template v-else>
        <a-empty class="nodata"></a-empty>
      </template>
    </div>
</template>

<script setup lang="ts">

  import blog_article_item from "@/components/common/blog_article_item.vue";
  import {articleListApi} from "@/api/article_api";
  import type {articleParamsType} from "@/api/article_api";
  import type {articleType} from "@/api/article_api";
  import {reactive, watch} from "vue";
  import type {listDataType, paramsType} from "@/api";
  import {useRoute} from "vue-router";


  const route = useRoute()
  const data = reactive<listDataType<articleType>>({
    list: [],
    count: 0
  })

  const params = reactive<articleParamsType>({})

  async function getData(p?: paramsType) {
    if (p) {
      Object.assign(params, p)
    }
    let res = await articleListApi(params)
    data.list = res.data.list
    data.count = res.data.count
  }


  defineExpose({
    getData,
  })

  watch(() => route.query, () => {
    if (route.query.date !== "") {
      params.date = route.query.date  as string
    }
    if (route.query.tag !== "") {
      params.tag = route.query.tag as string
    }
    getData()
  }, {deep: true, immediate: true})

  function pageChange() {
  getData()
  }
</script>

<style  lang="scss">
.blog_article_list{
  .blog_article_item{
    background-color: var(--color-bg-1);
    margin-bottom: 20px;

    &:first-child{
      border-radius: 0 0 5px 5px;
    }

    .info{
      .title{
        font-size: 20px;
      }
      .abstract{
        margin-top: 10px;
        height: 4rem;
      }
    }

    .article_data_col{
      i{
        padding: 0 5px;
      }
    }
  }

  .page{
    display: flex;
    justify-content: center;
  }

}


</style>