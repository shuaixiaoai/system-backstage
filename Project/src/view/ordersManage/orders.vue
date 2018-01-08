<template>
  <div class="orders">
      <router-view></router-view>
  </div>
</template>
<script>
// import tableData from '../../data/untreatedOrders.js'

export default {
  name: 'orders',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .orders{
        width: 100%;
        height: auto;
    }
    .el-table__empty-text{
      position: absolute;
      left: 410px!important;
      top: 50%;
      -ms-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
      color: #5e7382;
    }
    .block{
      margin-bottom: 40px;
    }
</style>
