<template>
  <div class="login-page">
    <el-form :model="loginForm" ref="loginForm">
      <el-input v-model="loginForm.phone" placeholder="手机号"></el-input>
      <el-input v-model="loginForm.pass" placeholder="密码"></el-input>
      <el-button @click="login">登录</el-button>
    </el-form>
  </div>
</template>


<script>
import {mapMutations} from 'vuex';

export default {
  data(){
    return {
      loginForm: {
        phone: '',
        pass: ''
      }
    }
  },
  methods: {
    login(){
      
    },
    ...mapMutations({
      setAuthInfo: 'setAuthInfo'
    })
  }
}
</script>

<style lang="less" scoped>
.login-page {  
  width: 1000px;
  margin: 0 auto;
}
</style>
