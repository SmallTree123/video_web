<style lang="stylus" rel="stylesheet/stylus">
  .layout
    .left
      position fixed
      top 0
      bottom 0
      left 0
    .right
      position fixed
      top 0
      right 0
      bottom 0
      background-color #f5f7f9
      .layout-header
        position absolute
        width 100%
        height 60px
        background #fff
        box-shadow 0 2px 2px rgba(7, 17, 27, .1)
        .layout-header-title
          position absolute
          height 60px
          line-height 60px
          left 20px
          font-size 20px
          font-weight bold
        .el-dropdown
          position absolute
          right 50px
          .user-info
            cursor pointer
            .avatar
              float left
              margin-top 10px
              margin-right 5px
              display inline-block
              width 40px
              height 40px
              border-radius 50%
              background url("../../assets/img/avatar.jpg") no-repeat center
              background-size 100%
              border 1px solid #ccc
            .name
              display inline-block
              font-size 15px
              font-weight bold
              color #666
              line-height 60px
              height 60px
      .layout-content
        position fixed
        top 60px
        bottom 0
        width 87.5%
        border-radius 4px
        box-sizing border-box
        & > div:first-child
          height calc(100% - 27px)
          .el-breadcrumb
            padding 10px 15px 0
          .main
            margin 15px
            padding 0 10px 15px 10px
            max-height calc(100% - 75px)
            min-height 200px
            background #fff
            overflow auto
            box-shadow 0 2px 2px 0 rgba(7, 17, 27, .1)
            .header
              height 60px
              line-height 60px
            .page
              margin-top 10px
              text-align right
        .layout-copy
          position absolute
          top calc(100% - 27px)
          width 100%
          padding 0 0 15px
          text-align center
          color #9ea7b4
          font-size 12px
</style>

<template>
  <div class="layout">
    <el-row type="flex">
      <el-col :span="3" class="left">
        <my-menu></my-menu>
      </el-col>
      <el-col :span="21" class="right">
        <div class="layout-header">
          <div class="layout-header-title">XXXXXXX管理系统</div>
          <el-dropdown @command="handleCommand">
            <div class="user-info">
              <span class="avatar"></span>
              <span class="name">Dull<i class="el-icon-caret-bottom el-icon--right"></i></span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="layout-content">
          <router-view></router-view>
          <div class="layout-copy">
            2015-2017 &copy; Dull
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import myMenu from 'common/Menu'
  import util from '../../assets/js/util'
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    components: {
      myMenu
    },
    methods: {
      handleCommand(command) {
        if (command === 'exit') {
          util.authcode = null
          util.removeSession('authcode')
          this.$router.push('/login')
        }
      }
    }
  }
</script>
