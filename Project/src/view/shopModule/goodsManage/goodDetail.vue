<template>
  <div class="goodDetail">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>店铺模块</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/shopmodule/goodsManage' }">商品管理</el-breadcrumb-item>
              <el-breadcrumb-item>商品详情</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="wrapper">
          <div class="container">
              <GoodDetail></GoodDetail>
          </div>
      </div>
  </div>
</template>
<script>
import GoodDetail from '../../../components/ShopMdTable/goodDetailTable'
export default {
  name: 'goodDetail',
  data () {
    return {
      type: 'add'
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
    GoodDetail
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goodDetail{
    width: 100%;
    height: auto;
    .wrapper{
      width: 100%;
      height: 100%;
      .container{
        width: 700px;
        margin-left: 12%;
      }
    }
}
</style>
