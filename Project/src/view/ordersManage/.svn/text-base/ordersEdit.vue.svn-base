<template>
  <div class="ordersManage-wrapper">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>订单管理</el-breadcrumb-item>
              <el-breadcrumb-item>修改订单</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="order-detail">
          <div class="table-header">
              <h3>修改订单</h3>
          </div>
          <div class="table-panel">
              <div class="panel-item">
                  <div class="item-name"></div>
                  <div class="iktem-detail"></div>
              </div>
              <div class="panel-item">
                  <div class="item-name"></div>
                  <div class="iktem-detail"></div>
              </div>
              <div class="panel-item">
                  <div class="item-name"></div>
                  <div class="iktem-detail"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Dtable from '../../components/Dtable/searchTable'
import api from '../../api/axios'
export default {
  name: 'ordersEdit',
  data () {
    return {
    }
  },
  methods: {

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
        .order-detail {
          border-top: 1px solid #d1dbe5;
          padding: 16px;
          .table-header{
            h3 {
              font-size: 24px;
              margin-bottom: 16px;
            }
          }
          .panel-item{
            width: 70%;
            height: 50px;
            border: 1px solid #d1dbe5;
            border-bottom: 0;
            &:last-child {
              border-bottom: 1px solid #d1dbe5;
            }
            .item-name{
              width: 40%;
              height: 50px;
              border-right: 1px solid #d1dbe5;
            }
          }
        }
    }
    .el-pagination{
      text-align: right;
      margin-top: 30px;
    }
</style>
