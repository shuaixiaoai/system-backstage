<template>
  <div class="login">
      <div class="main">
          <h2>陶味纷纷</h2>
          <h3>欢迎登入陶味纷纷后台管理系统</h3>
          <div class="form-group">
              <label>用户名</label>
              <!-- <input type="text" class="username" name="" value="" placeholder="请输入用户名" v-model="username"> -->
              <el-tooltip :manual="true" :value="userTipStat" :content="userTip" placement="top">
                <input type="text" class="username" name="" value="" placeholder="请输入用户名" v-model="username">
              </el-tooltip>
          </div>
          <div class="form-group">
              <label>密码</label>
              <el-tooltip :manual="true" :value="pwdTipStat" :content="pwdTip" placement="top">
                <input type="password" name="" class="password" value="" placeholder="请输入密码" v-model="password">
              </el-tooltip>
          </div>
          <div class="state-option">
             <el-checkbox @change="change" v-model="checked">{{ !checked ? "记住密码" : "取消记住密码" }}</el-checkbox>
             <!-- <router-link to='/forgetpsw'>忘记密码</router-link> -->
          </div>
          <h5 class="register">
              <router-link to='/register'>
                  <!-- 立即注册 -->
              </router-link>
          </h5>
          <el-button type="primary" class="btn-login" @click="login">登录</el-button>

      </div>
  </div>
</template>

<script>
import api from '../../api/axios'
import utils from '../../utils/utils'
export default {
  name: 'login',
  data () {
    return {
      checked: false,
      username: '',
      password: '',
      userTip: '',
      pwdTip: '',
      userTipStat: false,
      pwdTipStat: false
    }
  },
  mounted () {
    // 记住账号拿用户信息
    let userInfo = JSON.parse(utils.storage.getItem('TovofUserInfo'))
    if (userInfo) {
      this.checked = true
      this.password = userInfo.password
      this.username = userInfo.username
    }
  },
  methods: {
    change: function () {
    },
    login: function () {
      // 登录逻辑
      this.userTipStat = false
      this.pwdTipStat = false
      if (this.username !== '') {
        if (this.password !== '') {
          console.log('去登陆')
          this.toLogin()
        } else {
          this.pwdTip = '请输入密码'
          this.pwdTipStat = true
        }
      } else {
        this.userTip = '请输入用户名'
        this.userTipStat = true
      }
    },
    toLogin: function () {
      let that = this
      let paramsdata = {
        username: that.username,
        password: that.password
      }
      let params = JSON.stringify(paramsdata)
      api.userLogin(params)
        .then(({ data }) => {
          console.log(data)
          // console.log(data, that.checked)
          if (data.code === 0) {
            utils.storage.setItem('token', data.data.token)
            // 设置一段时间不操作页面，删除token, 改变isLogin状态
            // 未完成
            this.$store.dispatch('UserLogin', true)
            this.$router.push('/index')
            // 判断是否记住密码进行信息缓存
            if (that.checked === true) {
              utils.storage.setItem('TovofUserInfo', params)
            } else {
              utils.storage.deleteItem('TovofUserInfo', params)
            }
          } else {
            // 登录失败显示错误信息
            if (data.message === '用户不存在') {
              that.userTipStat = true
              that.userTip = '用户不存在'
            } else if (data.message === '密码错误') {
              that.pwdTipStat = true
              that.pwdTip = '密码错误'
            }
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url(./bg.jpg) no-repeat center;
  background-size: 100% 100%;
  z-index: 1000;
  .main{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 568px;
    height: 568px;
    padding: 0 88px;
    margin-top: -300px;
    margin-left: -284px;
    font-size: 0;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #ccc;
    background: #4184b2;
    z-index: 12;
    h2 {
      margin: 16px 0 4px 0;
      font-weight: bold;
      font-size: 72px;
      color: #feffff;
    }
    h3 {
      font-size: 24px;
      color: #feffff;
      margin-bottom: 65px;
    }
    .form-group{
      position: relative;
       width: 392px;
       padding: 20px 0 0 0;
       input{
         width: 100%;
         height: 42px;
         font-size: 18px;
         color: #fff;
         border: 2px solid rgb(89, 149, 200);
         padding: 4px 0 4px 70px;
         border-radius: 3px;
         &.username{
           background: url(user.png) no-repeat 8px center #7ba1c0;
           background-size: 40px 33px;
         }
         &.password{
           background: url(psw.png) no-repeat 8px center #7ba1c0;
           background-size: 40px 33px;
         }
       }
       label{
         display: inline-block;
         width: 50px;
         text-align: right;
         margin-right: 10px;
       }
       .falseTip{
         position: absolute;
         top: 62px;
         left: 48px;
         font-size: 12px;
         color: #ff0000;
       }
    }
    .state-option{
      .el-checkbox{
        padding: 0;
        margin: 10px 0 0 -369px;
        color: #fff;
        .el-checkbox__label{
          position: absolute!important;
        }
      }
      a{
        margin: 10px 0 0 30px;
        color: #fff;
        font-size: 14px;
        text-decoration: underline;
        float: right;
        transition: all .5s;
        &:hover{
          color: #20a0ff;
        }
      }
    }
    .register{
      width: 390px;
      font-size: 12px;
      text-align: right;
      margin-top: 45px;
      a{
        color: #fff;
        &:hover{
          color: #20a0ff;
        }
      }
    }
    .btn-login{
      display: block;
      font-family: '微软雅黑';
      margin: 10px auto;
      width: 390px;
      font-size: 22px;
      text-align: center;
      letter-spacing: 16px;
      background: #a1b6ca;
      border: 1px solid #a1b6ca;
      transition: background .5s;
      &:hover{
        background: #94b3d0;
      }
    }
  }
}
</style>
