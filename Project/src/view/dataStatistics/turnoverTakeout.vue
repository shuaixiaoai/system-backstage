<template>
  <div class="turnover">
    <div class="form-serach">
        <Search :searchTime="searchTime" :type="turnover"></Search>
    </div>
    <div class="result"></div>
    <div class="table-list">
        <TurnoverTable></TurnoverTable>
    </div>
  </div>
</template>
<script>
import Search from '../../components/SearchOptions'
import TurnoverTable from '../../components/StatisticTable/turnoverTable'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'turnover',
  data () {
    return {
      turnover: 'turnover'
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      searchTime: ({statistic}) => statistic.searchTime,
      turnoverData: ({statistic}) => statistic.turnoverData
    })
  },
  methods: {
    ...mapActions([
      'getTurnoverStatistic'
    ])
  },
  components: {
    Search,
    TurnoverTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.turnover{
    width: 100%;
    height: auto;
    .form-serach{
      margin: 0 1px;
      border-bottom: 1px solid #d1dbe5;
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
      height: auto;
      margin: 70px 52px 0 52px;
    }
}
</style>
