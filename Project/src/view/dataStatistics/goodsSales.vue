<template>
  <div class="goodsSales">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>统计管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品销量统计</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="tab-title">
      <span class="title-item">
          <router-link to='./goods'>
              商品销量统计
          </router-link>
      </span>
      <span class="title-item">
          <router-link to='./setMenu'>
              套餐卡销量统计
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
  name: 'goodsSales'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goodsSales{
    width: 100%;
    height: auto;
    .crumb{
        width: 100%;
        height: 45px;
        line-height: 45px;
        border-bottom: 1px solid #d1dbe5;
        .el-breadcrumb{
          line-height: 45px;
          padding-left:15px;
      }
    }
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
