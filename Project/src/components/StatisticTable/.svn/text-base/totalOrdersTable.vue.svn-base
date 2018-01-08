<template>
  <div class="totalOrdersTable">
      <el-table
          :data="todayData"
          border
          style="margin-bottom: 30px;">
          <el-table-column
          prop=""
          label="今日统计">
        </el-table-column>
        <el-table-column
          prop="shop_name"
          label="店铺">
        </el-table-column>
        <el-table-column
          prop="os_cancel_order_num"
          label="失败订单(单)">
        </el-table-column>
        <el-table-column
          prop="os_complete_order_num"
          label="成功订单(单)">
        </el-table-column>
        <el-table-column
          prop="os_total_order_num"
          label="总订单(单)">
        </el-table-column>
      </el-table>


      <h4 class="time-range">（日期范围：{{startDay}}--{{endDay}}）（时段：{{startHour}}--{{endHour}}）</h4>
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
            prop="shop_name"
            label="店铺">
          </el-table-column>
          <el-table-column
            prop="os_cancel_order_num"
            label="失败订单(单)">
          </el-table-column>
          <el-table-column
            prop="os_complete_order_num"
            label="成功订单(单)">
          </el-table-column>
          <el-table-column
            prop="os_total_order_num"
            label="总订单(单)">
          </el-table-column>
      </el-table>
      <div class="total-number" v-if="sumCompleteOrderNum">
        <span>总订单(单)：</span>{{sumOrderTotals}};
        <span>成功订单(单)：</span>{{sumCompleteOrderNum}};
        <span>失败订单(单)：</span>{{sumCancelOrderNum}};
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
  name: 'totalOrdersTable',
  data () {
    return {
      // tableData: []
    }
  },
  mounted () {
    // console.log(this.$store.state.statistic.totalOrdersData)
  },
  computed: {
    ...mapState({
      todayData: ({statistic}) => statistic.totalOrdersData.todayStatis,
      tableData: ({statistic}) => statistic.totalOrdersData.list,
      startDay: ({statistic}) => statistic.totalOrdersData.startDay,
      endDay: ({statistic}) => statistic.totalOrdersData.endDay,
      startHour: ({statistic}) => statistic.totalOrdersData.startHour,
      endHour: ({statistic}) => statistic.totalOrdersData.endHour,
      loading: ({statistic}) => statistic.loading,
      total: ({statistic}) => statistic.totalOrdersData.count,
      // sumOrderTotals: ({statistic}) => statistic.totalOrdersData.sum_complete_order_num + statistic.totalOrdersData.sum_cancel_order_num,
      sumCompleteOrderNum: ({statistic}) => statistic.totalOrdersData.sum_complete_order_num,
      sumCancelOrderNum: ({statistic}) => statistic.totalOrdersData.sum_cancel_order_num
    }),
    sumOrderTotals () {
      return parseInt(this.sumCompleteOrderNum) + parseInt(this.sumCancelOrderNum)
    }
  },
  methods: {
    ...mapActions([
      'getPagenationList'
    ]),
    handleCurrentChange (page) {
      let data = {
        page: page,
        type: 'totalOrder'
      }
      this.getPagenationList(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.totalOrdersTable{
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
