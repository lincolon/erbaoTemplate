<template>
  <header>
    <div class="logo">
      <h3>网站title</h3>
    </div>
    <div class="top-side-wrap">
      退出
    </div>
  </header>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
@import (reference) '../assets/styles/class.less';
header{
  .flex();
  .logo{
    padding-left: 20px;
    .flex-item();
    .box-vertical(center, unset);
  }
  .top-side-wrap {
    width: 120px;
    background-color: #f0f0f0;
    .box-vertical(center, center);
  }
}
</style>


