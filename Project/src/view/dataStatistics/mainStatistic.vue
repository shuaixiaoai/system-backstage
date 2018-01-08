<template>
  <div class="statistic">
      <router-view></router-view>
  </div>
</template>
<script>
// import tableData from '../../data/untreatedOrders.js'

export default {
  name: 'statistic',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.statistic{
    width: 100%;
    height: auto;
}
</style>
