<template>
  <div class="userNumTable">
      <h4 class="time-range">（日期范围：{{startDay}}--{{endDay}}）</h4>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        tooltip-effect="light">
          <el-table-column
            prop="os_day"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="os_allnum"
            label="普通用户">
          </el-table-column>
          <el-table-column
            prop="os_vipnum"
            label="会员用户">
          </el-table-column>
      </el-table>
      <div class="total-number" v-if="totalNum">
        <span>会员用户总计： </span>{{totalNum}}
      </div>
      <div class="block" v-if="total>10">
          <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total">
          </el-pagination>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'userNumTable',
  data () {
    return {
      // tableData: []
    }
  },
  computed: {
    ...mapState({
      tableData: ({statistic}) => statistic.userNumData.list,
      startDay: ({statistic}) => statistic.userNumData.startDay,
      endDay: ({statistic}) => statistic.userNumData.endDay,
      loading: ({statistic}) => statistic.loading,
      total: ({statistic}) => statistic.userNumData.count,
      totalNum: ({statistic}) => statistic.userNumData.all_num
    })
  },
  methods: {
    ...mapActions([
      'getPagenationList'
    ]),
    handleCurrentChange (page) {
      let data = {
        page: page,
        type: 'userNum'
      }
      this.getPagenationList(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.userNumTable{
  width: 100%;
  height: 100%;
  position: relative;
  .time-range{
    position: absolute;
    top: -30px;
    right: 0;
    font-size: 12px;
    font-weight: bold;
  }
  .total-number{
    margin-top: 16px;
    text-align: right;
    font-weight: bold;
    font-size: 18px;
    color: #333;
    span{
      margin-left: 12px;
      font-size: 12px;
      font-weight: 100;
      color: #666;
    }
  }
}
</style>
