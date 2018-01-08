<template>
  <div class="gifts-card">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>套餐卡管理</el-breadcrumb-item>
            <el-breadcrumb-item>礼品卡列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="table-data">
            <GiftCardTable></GiftCardTable>
        </div>
    </div>
  </div>
</template>

<script>
import GiftCardTable from '../../components/SetmenuTable/giftCardTable'
export default {
  name: 'setMenuGoods',
  data () {
    return {
    }
  },
  methods: {
    addNewSetMenu () {
      console.log('add')
    }
  },
  components: {
    GiftCardTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.gifts-card{
  width: 100%;
  height: 100%;
}
</style>
