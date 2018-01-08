<template>
  <div class="userSearch">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
              <el-breadcrumb-item>搜索</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="options">
          <SearchForm></SearchForm>
      </div>
      <div class="result">
          <ResultTable></ResultTable>
      </div>
  </div>
</template>

<script>
import SearchForm from './searchForm'
import ResultTable from '../../components/userTable/searchResultTable'
export default {
  name: 'userSearch',
  data () {
    return {
    }
  },
  components: {
    SearchForm,
    ResultTable
  }
}
</script>

<style lang="less" scoped>
  .userSearch{
    width: 100%;
    height: auto;
    .options{
      margin: 30px 0 0 2px;
    }
  }
</style>
