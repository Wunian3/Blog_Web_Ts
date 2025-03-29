<template>
  <div class="wunian_logo">
    <img src="/image/blog_logo.png" alt="">
    <div class="logo_head">
      <div>雾念BLOG</div>
      <div>wunianblog</div>
    </div>
  </div>
</template>

<style  lang="scss">
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

      font-weight:600;
      margin-bottom: 2px;
    }
    >div:nth-child(2){
      font-size: 12px;
    }
  }

}
</style>