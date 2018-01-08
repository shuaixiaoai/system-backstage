<template>
    <div class="setmenu">
        <div class="form-serach">
            <Search :type="type"></Search>
        </div>
        <div class="result"></div>
        <div class="table-list">
            <TurnoverSetMenuTable></TurnoverSetMenuTable>
        </div>
    </div>
</template>
<script>
import Search from '../../components/SetMenuSearchOptions'
import TurnoverSetMenuTable from '../../components/StatisticTable/turnoverSetMenuTable'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'setmenu',
  data () {
    return {
      type: 'setMenu'
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      // searchTime: ({statistic}) => statistic.searchTime,
      // turnoverData: ({statistic}) => statistic.turnoverData
    })
  },
  methods: {
    ...mapActions([
      // 'getTurnoverStatistic'
    ])
  },
  components: {
    Search,
    TurnoverSetMenuTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.setmenu{
  width: auto;
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
