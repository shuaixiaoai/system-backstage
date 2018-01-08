<template>
  <div class="ordersManage-wrapper">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>订单管理</el-breadcrumb-item>
              <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="content-wrapper">
          <div class="el-tabs">
            <router-link to='/ordersManage/Manage/unPaid'>
              <span class="tab-item">未付款订单</span>
            </router-link>
            <router-link to='/ordersManage/Manage/paid'>
              <span class="tab-item">已付款订单</span>
            </router-link>
            <router-link to='/ordersManage/Manage/checked'>
              <span class="tab-item">已确认订单</span>
            </router-link>
            <router-link to='/ordersManage/Manage/sending'>
              <span class="tab-item">配送中订单</span>
            </router-link>
            <router-link to='/ordersManage/Manage/succeed'>
              <span class="tab-item">成功订单</span>
            </router-link>
            <router-link to='/ordersManage/Manage/failed'>
              <span class="tab-item">失败订单</span>
            </router-link>
            <router-link to='/ordersManage/Manage/refund'>
              <span class="tab-item">退款中订单</span>
            </router-link>
          </div>

          <div class="panel-content">
              <router-view></router-view>
          </div>
      </div>
      <!-- <div class="content-wrapper">
            <div class="el-tab">
                  <span v-for="(item, index) in tabs">{{item}}</span>
            </div>
      </div> -->
  </div>
</template>

<script>
const currentTitle = ['未处理订单', '已确认订单', '配送中订单', '成功订单', '失败订单', '退款中订单']
import api from '../../api/axios'
export default {
  name: 'ordersManage',
  data () {
    return {
      title: '订单管理',
      tabs: currentTitle
    }
  },
  mounted () {
  },
  methods: {
    // alertMsg: function () {
    //   this.$message({
    //     message: '恭喜你，这是一条成功消息',
    //     type: 'success'
    //   })
    // }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .ordersManage-wrapper{
        width: 100%;
        height: auto;
        .crumb{
            width: 100%;
            height: 45px;
            line-height: 45px;
            .el-breadcrumb{
              line-height: 45px;
              padding-left:15px;
              .el-breadcrumb__item{
                color: red;
                .el-breadcrumb__item__inner{
                  color: red!important;
                }
            }
          }
        }
        .el-tabs{
          width: 100%;
          height: 45px;
          padding: 0 2px;
          line-height: 45px;
          color: #333;
          background: #eef1f6;
          border-bottom: 1px solid #d1dbe5;
          margin-bottom: 20px;
          .tab-item {
            display: inline-block;
            padding: 0 12px;
          }
        }
    }
    .el-pagination{
      text-align: right;
      margin-top: 30px;
    }
    .router-link-exact-active{
      display: inline-block;
      height: 45px;
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
      border-top: 1px solid #d1dbe5;
      border-bottom: 1px solid #fff;
    }
</style>
