<template>
  <div class="turnover-setmenu-table">
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
        label="主题">
      </el-table-column>
      <el-table-column
        prop="price"
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
            prop="days"
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="category_title"
            label="主题">
          </el-table-column>
          <el-table-column
            prop="price"
            label="总营业额(元)">
          </el-table-column>
      </el-table>
      <div class="total-number" v-if="totalPrice">
        <span>总营业额(元)：</span>{{totalPrice}};
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
      todayData: ({statistic}) => statistic.setMenuTurnoverData.todayStatis,
      tableData: ({statistic}) => statistic.setMenuTurnoverData.list,
      loading: ({statistic}) => statistic.loading,
      startDay: ({statistic}) => statistic.setMenuTurnoverData.startDay,
      endDay: ({statistic}) => statistic.setMenuTurnoverData.endDay,
      total: ({statistic}) => statistic.setMenuTurnoverData.count,
      totalPrice: ({statistic}) => statistic.setMenuTurnoverData.total_price
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
        type: 'setMenu'
      }
      this.getPagenationList(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.turnover-setmenu-table{
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
