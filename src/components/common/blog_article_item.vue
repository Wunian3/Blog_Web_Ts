<template>
  <div :class="{blog_article_item:true ,preview:props.preview}">
    <div class="cover">
      <a-image :src="props.data.banner_url"></a-image>
    </div>
    <div class="info">
      <div class="title">
        <template v-if="props.data.id ===''">
          {{props.data.title}}
        </template>
<!--        <router-link v-else :to="{name:'article',params:{id:props.data.id}}" v-html="props.data.title"></router-link>-->
        <a v-else :href="`/article/${props.data.id}`" v-html="props.data.title"></a>
      </div>
      <div class="abstract">
        <a-typography-paragraph :ellipsis="{
          rows:2,
          css:true,
        }">{{props.data.abstract}}</a-typography-paragraph>
      </div>
      <div class="data">
        <span class="category">
          <a-tag color="red">{{props.data.category}}</a-tag>
          </span>
        <span class="date">
          <IconClockCircle></IconClockCircle>
          {{dataFormat(props.data.created_at)}}</span>
        <span class="article_data_col">
                <span>
                   <i class="fa fa-eye"></i>
                  <span>{{ props.data.look_count }}</span>
                </span>
                <span>
                         <i class="fa fa-thumbs-o-up"></i>
              <span>{{ props.data.digg_count }}</span>
             </span>
                <span>
                         <i class="fa fa-comments"></i>
              <span>{{ props.data.comment_count }}</span>
              </span>
                <span>
                <i class="fa fa-star"></i>
              <span>{{ props.data.collects_count }}</span>
            </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {articleDataType, articleItemType, articleUpdateType} from "@/api/article_api.ts";
import {dataFormat} from "@/utils/date.ts";
import {IconClockCircle} from "@arco-design/web-vue/es/icon";

interface Props{
  data:articleUpdateType & articleDataType,
  preview?: boolean,
}

const props = defineProps<Props>();
</script>
<style  lang="scss">
.blog_article_item{
  padding: 20px;
  width: 100%;
  display: flex;
  background-color: var(--color-fill-2);
  border-radius: 5px;


  &.preview{
    transform: scale(0.7);
    width: 585px;
    transform-origin: left top;
  }

  .cover{
    width: 25%;
    border-radius: 5px;
    overflow: hidden;

    &:hover{
      img{
        transform: scale(1.05);
      }
    }

    .arco-image{
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .3s;
      }
    }
  }

  .info{
    width: 75%;
    color:var(--color-text-2);
    padding-left: 20px;

    .title{
      font-weight: 600;
      font-size: 16px;

      a{
        color: var(--color-text-1);
        text-decoration: none;
      }

      em{
        color: #004eff;
        margin-right: 2px;
      }

    }
    .abstract{
      .arco-typography{
        margin-bottom: 0;
      }
    }
    .data{
      margin-top: 5px;
      .category{
        margin-right: 10px;
      }
      .date{
        margin-right: 10px;
      }
      .article_data{
        >span{
          margin-right: 8px;
          i{
            margin-right: 3px;
          }
        }
      }
    }
  }


}
</style>