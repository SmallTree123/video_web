<style lang="stylus" rel="stylesheet/stylus">
  .login
    position fixed
    display flex
    top 0
    right 0
    bottom 0
    left 0
    background-color #0099C3
    /*background url("../../assets/img/login-bg.jpg") no-repeat 100% 100%*/
    canvas
      position fixed
    .login-box
      margin auto
      width 420px
      height 300px
      border-radius 10px
      background-color #ffffff
      padding 30px
      .login-box-title
        margin-bottom 30px
        font-size 23px
        font-weight 500
        text-align center
      .el-form
        .el-input__inner
          border-radius 0
        .captcha
          width 100%
          height 36px
    .login-box-button
      margin-top 15px
      width 100%
</style>

<template>
  <div class="login">
    <canvas id="canvas"></canvas>
    <div class="login-box">
      <h2 class="login-box-title">CMS系统</h2>
      <el-form :model="login" :rules="rules" ref="login">
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-form-item prop="username">
              <el-input v-model="login.username" size="large" placeholder="用户名/手机/邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-form-item prop="password">
              <el-input v-model="login.password" size="large" placeholder="密码" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-form-item prop="captcha">
              <el-input v-model="login.captcha" placeholder="验证码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
              <img class="captcha" src="" alt="验证码不见了">
          </el-col>
        </el-row>
      </el-form>
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-button class="login-box-button" type="primary" :loading="loading" @click="loginSubmit">
            登录
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import doCanvas from '../../assets/js/canvas'
  import util from '../../assets/js/util'
  export default{
    data(){
      return {
        login: {
          username: '',
          password: '',
          captcha: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名/邮箱', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          captcha:[
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {len:4, message: '长度为 4 个字符', trigger: 'blur'}
          ]
        },
        loading: false
      }
    },
    methods: {
      loginSubmit(){
        this.loading = true
//        util.api.post()
        setTimeout(()=>{
          util.authcode='123456'
          util.setSession('authcode',util.authcode)
          this.$router.push('/layout/index')
          this.loading = true
        },1500)
      }
    },
    mounted(){
      doCanvas()
      window.onresize=function () {
        doCanvas()
      }
    }
  }
</script>

