<template>
  <div class="editBanner">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>店铺模块</el-breadcrumb-item>
              <el-breadcrumb-item>Banner管理</el-breadcrumb-item>
              <el-breadcrumb-item>修改Banner</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="add-wrapper">
          <div class="add-container">
              <!-- <span class="basicInfo">基本信息</span> -->
              <div class="box-info">
                  <EditBannerForm></EditBannerForm>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import EditBannerForm from '../../components/EditBannerForm'
export default {
  name: 'editBanner',
  data () {
    return {
    }
  },
  mounted () {
    // console.log(this.$route.query.benner)
  },
  components: {
    EditBannerForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.editBanner{
    width: 100%;
    height: auto;
    .wrapper{
      wid
      margin-top: 30px;
      padding: 0 2px;
    }
    .add-wrapper{
      width: 810px;
      height: auto;
      margin: 0 2px;
      margin-left: 100px;
      box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 4px 0px, rgba(0, 0, 0, 0.0392157) 0px 0px 6px 0px;
      background: rgb(255, 255, 255);
      border-width: 1px;
      border-style: solid;
      border-color: rgb(209, 219, 229);
      border-image: initial;
      border-top: none;
      .add-container {
        padding: 30px;
        min-width: 710px;
        .basicInfo{
          display: block;
          font-size: 16px;
          color: #333;
          margin-bottom: 16px;
        }
      }
    }
}
</style>
