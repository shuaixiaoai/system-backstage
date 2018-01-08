<template>
  <div class="turnoverTable">
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
        prop="os_goods_totals"
        label="商品总额(元)">
      </el-table-column>
      <el-table-column
        prop="os_discount_totals"
        label="优惠总额(元)">
      </el-table-column>
      <el-table-column
        prop="os_order_totals"
        label="总营业额(元)">
      </el-table-column>
  </el-table>

      <h4 class="time-range">（日期范围：{{startDay}}--{{endDay}}）</h4>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        tooltip-effect="light">
          <el-table-column
            prop="os_day"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="shop_name"
            label="店铺">
          </el-table-column>
          <el-table-column
            prop="os_goods_totals"
            label="商品总额(元)">
          </el-table-column>
          <el-table-column
            prop="os_discount_totals"
            label="优惠总额(元)">
          </el-table-column>
          <el-table-column
            prop="os_order_totals"
            label="总营业额(元)">
          </el-table-column>
      </el-table>
      <div class="total-number" v-if="sumOrderTotals">
        <span>总营业额(元)：</span>{{sumOrderTotals}};
        <span>优惠总额(元)：</span>{{sumDiscountTotals}};
        <span>商品总额(元)：</span>{{sumCompleteOrderNum}};
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
  name: 'turnoverTable',
  data () {
    return {
      // tableData: []
    }
  },
  computed: {
    ...mapState({
      todayData: ({statistic}) => statistic.turnoverData.todayStatis,
      tableData: ({statistic}) => statistic.turnoverData.list,
      loading: ({statistic}) => statistic.loading,
      startDay: ({statistic}) => statistic.turnoverData.startDay,
      endDay: ({statistic}) => statistic.turnoverData.endDay,
      total: ({statistic}) => statistic.turnoverData.count,
      sumCompleteOrderNum: ({statistic}) => statistic.turnoverData.sum_goods_totals,
      sumDiscountTotals: ({statistic}) => statistic.turnoverData.sum_discount_totals,
      sumOrderTotals: ({statistic}) => statistic.turnoverData.sum_order_totals
    })
  },
  methods: {
    ...mapActions([
      'getPagenationList'
    ]),
    handleCurrentChange (page) {
      let data = {
        page: page,
        type: 'turnover'
      }
      // console.log(data)
      this.getPagenationList(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.turnoverTable{
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
