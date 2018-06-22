<template>
  <section class="side-bar">
    <!-- {{defaultActive}} -->
    <el-menu :default-active="defaultActive" class="el-menu-vertical-demo">
      <el-submenu v-for="(item, index) in baseRouter" :key="index" :index="index+1+''">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(subItem, subIndex) in item.children" :key="subIndex" :index="index+1+'-'+(subIndex+1)">
            <div class="meau-item-link" @click="goPage(subItem)">{{subItem.title}}</div>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </section>
</template>

<script>
import baseRouter from '../config/nav.config';

import {mapState} from 'vuex';

const setDefaultActive = (currentPath) => {
      let res;
      baseRouter.forEach(((item, idx) => {
        item.children.forEach((item, index) => {
          if(item.name.indexOf(currentPath) > -1){
            res = (idx+1) + '-' + (index+1);
          }
        })
      }))
      return res;
    }

export default {
  data () {
    return {
      baseRouter
    }
  },
  computed: {
    isAdmin () {
      // console.log(this.$store.state);
      return this.$store.state.authInfo.role === 'admin'
    },
    ...mapState({
      defaultActive: state => setDefaultActive(state.currentPath)
    })
  },
  methods: {
    goPage (opts) {
      let params = opts.params ? opts.params : {}
      let query = opts.query ? opts.query : {}
      this.$router.push({ name: opts.name, params, query})
    }
  }
}
</script>

<style lang="less" scoped>
.meau-item-link{
  color: #409EFF;
}
.el-menu-item.is-active{
  background-color: #ecf5ff;
}
.icon-style{
  margin-right: 10px;
  color: #b2cde4;
  font-size: 17px;
  vertical-align: sub;
  +span{
    font-weight: 600;
    color: #626f79;
    font-size: 15px;
  }
}
</style>
