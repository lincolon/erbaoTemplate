<template>
  <div class="page-container">
    <top-header></top-header>
    <navbar></navbar>
    <section class="main-content">
      <nuxt-child/>
    </section>
  </div>
</template>

<script>
import nav from '../components/nav'
import topHeader from '../components/topHeader'

export default {
  components: {
    navbar: nav,
    topHeader: topHeader
  },
  asyncData({route, store}){
    if(process.server){
      store.state.currentPath = route.name
    }
  }
};
</script>

<style lang="less">
@HEAD_HEIGHT: 70px;
  .page-container{
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 1260px;
    overflow-x: scroll;
    >header{
      position: fixed;
      top:0;
      left: 0;
      width: 100%;
      height: @HEAD_HEIGHT;
      background-color: #fff;
      border-bottom: 1px solid #dcdcdc;
      z-index: 100;
    }
    .side-bar{
      position: fixed;
      top: @HEAD_HEIGHT;
      left: 0;
      width: 240px;
      height: ~'calc(100% - 70px)';
      background-color: #ffffff;
      border-right: 1px solid #dcdcdc;
      overflow-y: auto;
      z-index: 99;
    }
    .main-content{
      position: relative;
      z-index: 100;
      height: ~'calc(100% - 70px)';
      margin-top: @HEAD_HEIGHT;
      margin-left: 240px;
      padding: 20px;
      overflow-y: auto;
    }
  }
</style>
