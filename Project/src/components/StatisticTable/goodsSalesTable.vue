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
        prop="shop_name"
        label="店铺">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="category_name"
        label="类别">
      </el-table-column>
      <el-table-column
        prop="os_goods_salenum"
        label="销量"
        width="180">
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
            label="时间"
            width="180">
          </el-table-column>
          <el-table-column
            prop="shop_name"
            label="店铺">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="类别">
          </el-table-column>
          <el-table-column
            prop="os_goods_salenum"
            label="销量"
            width="180">
          </el-table-column>
      </el-table>
      <div class="total-number" v-if="sumGoodsSalenum">
        <span>销量总计：</span>{{sumGoodsSalenum}}
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
      tableData: ({statistic}) => statistic.goodsSalesData.list,
      startDay: ({statistic}) => statistic.goodsSalesData.startDay,
      endDay: ({statistic}) => statistic.goodsSalesData.endDay,
      loading: ({statistic}) => statistic.loading,
      total: ({statistic}) => statistic.goodsSalesData.count,
      sumGoodsSalenum: ({statistic}) => statistic.goodsSalesData.sum_goods_salenum
    })
  },
  methods: {
    ...mapActions([
      'getPagenationList'
    ]),
    handleCurrentChange (page) {
      let data = {
        page: page,
        type: 'goodsSales'
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
