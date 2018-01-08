<template>
    <div class="user-common">
        <div class="crumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>普通用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="padding: 0 2px;">
            <CommonUTable></CommonUTable>
        </div>
    </div>
</template>

<script>
import CommonUTable from '../../components/userTable/commonUTable'
export default {
  name: 'commonuser',
  data () {
    return {
    }
  },
  components: {
    CommonUTable
  }
}
</script>

<style lang="less" scoped>
  #user {
    width: 100%;
    height: auto;
    padding: 0 2px;
  }
</style>
