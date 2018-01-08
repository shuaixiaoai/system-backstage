<template>
  <div class="record">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/userManage/commonUser' }">普通用户</el-breadcrumb-item>
              <el-breadcrumb-item>积分记录</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="data-list">
          <RecordTable></RecordTable>
      </div>
  </div>
</template>

<script>
import RecordTable from '../../components/userTable/recordTable'
export default {
  name: 'scoreRecord',
  data () {
    return {
    }
  },
  components: {
    RecordTable
  }
}
</script>

<style lang="less" scoped>
  .record{
    width: 100%;
    height: auto;
    .data-list{
      margin: 80px 2px;
    }
  }
</style>
