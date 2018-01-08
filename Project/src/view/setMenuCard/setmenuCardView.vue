<template>
  <div class="setmenu-card">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>套餐卡管理</el-breadcrumb-item>
            <el-breadcrumb-item>套餐卡列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="operate">
            <el-button type="primary" @click="addNewTheme">新建主题</el-button>
        </div>
        <div class="table-data">
            <basicInfoTable></basicInfoTable>
        </div>
    </div>
  </div>
</template>

<script>
import basicInfoTable from '../../components/SetmenuTable/basicInfoTable'
export default {
  name: 'setMenuCard',
  data () {
    return {
    }
  },
  methods: {
    addNewTheme () {
      // this.$router.push({path: '/setmenuManage/addTheme?', query: {orderId: orderId}})
      this.$router.push({path: '/setmenuManage/addTheme'})
    }
  },
  components: {
    basicInfoTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.setmenu-card{
  width: 100%;
  height: 100%;
  .container{
    margin: 0 100px;
  }
  .operate{
    margin: 30px 2px;
  }
  .table-data{
    margin-top: 20px;
  }
}
</style>
