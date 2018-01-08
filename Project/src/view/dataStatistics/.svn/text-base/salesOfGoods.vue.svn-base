<template>
  <div class="sales-goods">
    <div class="container">
        <div class="form-serach">
            <Search :searchTime="false" :type="totalOrder" :goods="goods"></Search>
        </div>
        <div class="result"></div>
        <div class="table-list">
            <TOrdersTable></TOrdersTable>
        </div>
    </div>
  </div>
</template>
<script>
import Search from '../../components/SearchOptions'
import TOrdersTable from '../../components/StatisticTable/goodsSalesTable'
import { mapState, mapActions } from 'vuex'
// import Search from '../../components/SearchOptions'
export default {
  name: 'goodsSales',
  data () {
    return {
      totalOrder: 'goodsSales',
      goods: 'goods'
    }
  },
  mounted () {
  },
  computed: {
    tableData () {
      return this.$store.state.statistic.goodsSalesData
    },
    ...mapState({
      // searchTime: ({statistic}) => statistic.searchTime,
      // statistic: ({statistic}) => statistic.goodsSalesData
    })
  },
  methods: {
    ...mapActions([
      'getGoodsSalesStatistic'
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
.sales-goods{
    width: 100%;
    height: auto;
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
