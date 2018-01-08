<template>
  <div class="set-menu-sales">
    <div class="form-serach">
        <Search :type="type"></Search>
    </div>
    <div class="result"></div>
    <div class="table-list">
        <SetMenuSalesTable :type="type"></SetMenuSalesTable>
    </div>
  </div>
</template>
<script>
import Search from '../../components/SetMenuSearchOptions'
import SetMenuSalesTable from '../../components/StatisticTable/setMenuSalesTable'
import { mapState, mapActions } from 'vuex'
// import Search from '../../components/SearchOptions'
export default {
  name: 'setMenuSales',
  data () {
    return {
      type: 'setMenuSales'
    }
  },
  components: {
    Search,
    SetMenuSalesTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.set-menu-sales{
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
