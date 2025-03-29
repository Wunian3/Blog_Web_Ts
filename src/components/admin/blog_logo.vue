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
  transition: all .3s;
  img{
    width: 60px;
    height: 60px;
    transition: all .3s;
  }
  .logo_head{
    margin-left: 20px;
    transition: all .3s;
    transform: scale(1);
    transform-origin: left;

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

.collapsed{
  .wunian_logo{
    padding: 2px;

    img{
      width:42px;
      height:42px;
    }

    .logo_head{
      transform: scale(0);

    }
  }
}

</style>