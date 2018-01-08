<template>
  <div class="goodsSalesTable">
    <el-table
        :data="todayData"
        border
        style="margin-bottom: 30px;">
        <el-table-column
        prop=""
        label="今日统计">
      </el-table-column>
      <el-table-column
        prop="category_title"
        label="主题名称">
      </el-table-column>
      <el-table-column
        prop="num"
        label="销量">
      </el-table-column>
    </el-table>


      <h4 class="time-range">（日期范围：{{startDay}}--{{endDay}}）</h4>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        tooltip-effect="light">
          <el-table-column
            prop="days"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="category_title"
            label="主题名称">
          </el-table-column>
          <el-table-column
            prop="num"
            label="销量">
          </el-table-column>
      </el-table>
      <div class="total-number" v-if="totalNum">
        <span>销量总计：</span>{{totalNum}}
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
  name: 'goodsSalesTable',
  data () {
    return {
        // tableData: []
    }
  },
  computed: {
    ...mapState({
      todayData: ({statistic}) => statistic.goodsSalesData.todayStatis,
      tableData: ({statistic}) => statistic.setMenuSalesData.list,
      loading: ({statistic}) => statistic.loading,
      startDay: ({statistic}) => statistic.setMenuSalesData.startDay,
      endDay: ({statistic}) => statistic.setMenuSalesData.endDay,
      total: ({statistic}) => statistic.setMenuSalesData.count,
      totalNum: ({statistic}) => statistic.setMenuSalesData.total_num
    })
  },
  methods: {
    ...mapActions([
      'getPagenationList'
    ]),
    handleCurrentChange (page) {
      // console.log(page)
      let data = {
        page: page,
        type: 'setMenuSales'
      }
      this.getPagenationList(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goodsSalesTable{
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
