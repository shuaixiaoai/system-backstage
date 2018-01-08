<template>
  <div class="goodsManage">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>店铺模块</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="operate">
            <el-button type="primary" icon="plus" @click="toAddBanner">新建商品</el-button>
        </div>
        <GoodsMTable></GoodsMTable>
    </div>
  </div>
</template>
<script>
// import tableData from '../../data/untreatedOrders.js'
import GoodsMTable from '../../components/ShopMdTable/goodsMTable'
export default {
  name: 'goodsManage',
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    toAddBanner () {
      this.$router.push({path: '/shopmodule/addGood'})
    }
  },
  components: {
    GoodsMTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goodsManage{
    width: 100%;
    height: auto;
    .container{
      padding: 0 2px;
      .operate {
        margin: 30px auto 30px 2px;
      }
    }
}
</style>
