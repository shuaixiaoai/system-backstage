<template>
  <div class="bannerManage">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>店铺模块</el-breadcrumb-item>
              <el-breadcrumb-item>Banner管理</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="operate">
          <el-button type="primary" icon="plus" @click="toAddBanner">新建Banner</el-button>
      </div>
      <div class="table-list">
          <BannerMTable></BannerMTable>
      </div>
  </div>
</template>
<script>
import BannerMTable from '../../components/ShopMdTable/bannerMTable'
export default {
  // name: 'bannerManage',
  data () {
    return {
    }
  },
  methods: {
    toAddBanner () {
      this.$router.push({path: '/shopmodule/addBanner'})
    }
  },
  components: {
    BannerMTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bannerManage{
    width: 100%;
    height: auto;
    .table-list {
      width: 80%;
      margin-left: 5%;
    }
    .operate {
      margin-left: 5%;width: 80%;
      margin: 30px auto 30px 5%;
    }
}
</style>
