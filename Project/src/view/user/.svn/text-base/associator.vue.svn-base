<template>
  <div class="associator">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item>{{msg}}</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="tab-title">
        <span class="title-item" @click="changeToBlack">
            <router-link to='./vipList'>
                会员列表
            </router-link>
        </span>
        <span class="title-item" @click="changeToVip">
            <router-link to='./blackList'>
                黑名单列表
            </router-link>
        </span>
      </div>
      <div class="container">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'associator',
  data () {
    return {
      msg: '会员列表'
    }
  },
  mounted () {
    // console.log(this.$route)
  },
  methods: {
    changeToBlack () {
      this.msg = '会员列表'
    },
    changeToVip () {
      this.msg = '黑名单列表'
    }
  }
}
</script>

<style lang="less" scoped>
  .associator{
    width: 100%;
    height: auto;
    .tab-title {
      width: 100%;
      height: 44px;
      line-height: 44px;
      font-size: 0;
      background: #eef1f6;
      border-bottom: 1px solid #eaeefb;
      .title-item {
        display: inline-block;
        width: auto;
        height: 40px;
        font-size: 14px;
        text-align: center;
        color: #48576a;
        // margin: 0 18px;
        cursor: pointer;
        a{
          display: block;
          padding: 0 18px;
        }
      }
    }
    .container{
      margin: 0 2px;
    }
    .router-link-exact-active{
      display: inline-block;
      height: 44px;
      border: 1px solid transparent;
      border-top: 0;
      margin-right: -1px;
      margin-left: -1px;
      transition: color .3s cubic-bezier(.645,.045,.355,1);
    }
    .v-link-active{
      color: #20a0ff;
      background: #fff;
      border-left: 1px solid #d1dbe5;
      border-right: 1px solid #d1dbe5;
      border-bottom: 1px solid #fff;
    }
  }
</style>
