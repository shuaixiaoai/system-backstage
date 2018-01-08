<template>
  <div id="main">
      <div class="top-logo">
        <span class="logo">陶味纷纷后台管理系统</span>
        <span class="el-icon-menu showSideMenu" @click="showSideMenu"></span>
        <span class="signout" @click="signOut">退出</span>
      </div>
      <div class="navbar" v-bind:class="{showNavbar: isShow}">
          <navbar></navbar>
      </div>
      <div class="main-content" v-bind:class="{moveToRight:isShow}">
          <keep-alive>
              <router-view></router-view>
          </keep-alive>
          <!-- <div class="copyright">1234</div> -->
      </div>

      <!-- <div class="login"></div> -->
  </div>
</template>

<script>
import navbar from '@/view/navbar'
import utils from '../utils/utils'
import api from '../api/axios'
export default {
  name: 'app',
  data () {
    return {
      isShow: true
    }
  },
  methods: {
    showSideMenu: function () {
      this.isShow = !this.isShow
    },
    signOut: function () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
      .then(() => {
        // 点击确认按钮触发
        api.userLoginout()
          .then(({data}) => {
            if (data.code === 0) {
              utils.storage.deleteItem('isLogin')
              utils.storage.deleteItem('token')
              utils.storage.setItem('currentIndex', '1')
              // this.$router.push('/login')
              this.$message({
                type: 'success',
                message: '退出登录成功!'
              })
              this.$router.push('/login')
            }
          })
        // utils.storage.deleteItem('isLogin')
        // utils.storage.deleteItem('token')
        // utils.storage.setItem('currentIndex', '1')
        // this.$router.push('/login')
        // this.$message({
        //   type: 'success',
        //   message: '退出登录成功!'
        // })
      })
      .catch(() => {
        // 点击取消按钮触发
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  components: {
    navbar
  }
}
</script>

<style lang="less">
@import '/static/common/css/normalize.css';
@import '/static/common/css/iconfont.css';
#app {
    .top-logo{
      width: 100%;
      height: 45px;
      line-height: 45px;
      background: #438eb9;
      color: #fff;
      .logo{
        display: inline-block;
        margin-left: 20px;
        font-size: 18px;
        color: #fff;
      }
      .showSideMenu{
        font-size: 24px;
        margin-left: 40px;
        vertical-align: middle;
        cursor: pointer;
      }
      .signout{
        float: right;
        margin-right: 20px;
        cursor: pointer;
      }
    }
    .navbar{
      position: absolute;
      top: 45px;
      left: 0;
      width: 200px;
      // bottom: 0;
      background: #f3f3f3;
    }
    .main-content{
        position: absolute;
        bottom: 0;
        left:0;
        top: 45px;
        right: 0;
        overflow: auto;
        background: #fff;
        border-left: 1px solid #ccc;
        transition: .5s all;
    }
    .main-content.moveToRight{
      left:200px;
      // z-index: 1;
    }
    .copyright{
      position: absolute;
      bottom: 0;
      left: 20%;
      text-align: center;
    }
}
</style>
