<template>
  <div class="userNum">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>统计管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户统计</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="form-serach">
      <Search :searchShop="false" :type="userNum"></Search>
    </div>
    <div class="result"></div>
    <div class="table-list">
        <TurnoverTable></TurnoverTable>
    </div>
  </div>
</template>
<script>
import TurnoverTable from '../../components/StatisticTable/userNumTable'
import Search from '../../components/SearchOptions'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'userNum',
  data () {
    return {
      userNum: 'userNum'
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      searchTime: ({statistic}) => statistic.searchTime
    })
  },
  methods: {
  },
  components: {
    Search,
    TurnoverTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .userNum{
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
          margin: 0 1px;
          border-bottom: 1px solid #d1dbe5;
        }
    }
</style>
