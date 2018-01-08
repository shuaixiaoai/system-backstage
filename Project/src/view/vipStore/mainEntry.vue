<template>
  <div id="vipStore">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'vipStore',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.crumb{
    width: 100%;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #d1dbe5;
    .el-breadcrumb{
      line-height: 45px;
      padding-left:15px;
  }
}
</style>
