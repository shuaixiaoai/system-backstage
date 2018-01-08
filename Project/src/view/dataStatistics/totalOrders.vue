<template>
  <div class="quantity">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>统计管理</el-breadcrumb-item>
              <el-breadcrumb-item>订单量统计</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="form-serach">
          <Search :searchTime="true" :type="totalOrder"></Search>
      </div>
      <div class="result"></div>
      <div class="table-list">
          <TOrdersTable></TOrdersTable>
      </div>
  </div>
</template>
<script>
import Search from '../../components/SearchOptions'
import TOrdersTable from '../../components/StatisticTable/totalOrdersTable'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ordersQuantity',
  data () {
    return {
      totalOrder: 'totalOrder'
    }
  },
  created () {
    // this.getTotalOrdersStatistic()
  },
  computed: {
    ...mapState({
      searchTime: ({statistic}) => statistic.searchTime,
      statistic: ({statistic}) => statistic.turnoverData
    })
  },
  methods: {
    ...mapActions([
      'getTotalOrdersStatistic'
    ])
  },
  components: {
    Search,
    TOrdersTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.quantity{
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
          .el-breadcrumb__item{
            color: red;
            .el-breadcrumb__item__inner{
              color: red!important;
            }
        }
      }
    }
    .result{
      width: 109px;
      font-size: 14px;
      text-align: right;
      margin-top: 30px;
      margin-bottom: 16px;
    }
    .table-list{
      width: auto;
      height: 400px;
      margin: 70px 52px 0 52px;
    }
    .form-serach{
      margin: 0 2px;
      border-bottom: 1px solid #d1dbe5;
    }
}
</style>
