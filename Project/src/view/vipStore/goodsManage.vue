<template>
  <div class="goods-manage">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>会员商城</el-breadcrumb-item>
            <el-breadcrumb-item>兑换商品管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="operate">
            <el-button type="primary" @click="toAddMallGoods">新建商品</el-button>
        </div>
        <div class="table-data">
            <mallGoodsTable></mallGoodsTable>
        </div>
    </div>
  </div>
</template>

<script>
import mallGoodsTable from '../../components/vipMallTable/mallGoodsTable'
import utils from '../../utils/utils'
export default {
  name: 'goodsManage',
  data () {
    return {
    }
  },
  methods: {
    toAddMallGoods () {
      // 跳转存储goodsId防刷新
      utils.storage.setItem('mgoodsId', -1)
      this.$router.push({path: '/vipStore/editMallGoodsMainEntry?', query: {skipType: 'addNew'}})
    }
  },
  components: {
    mallGoodsTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goods-manage{
  width: 100%;
  height: 100%;
}
.container .operate{
  margin:50px;
}
</style>
