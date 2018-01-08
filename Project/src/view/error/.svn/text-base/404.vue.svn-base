<template>
  <div class="error">
    <div class="error-info">
      <img src="./404.png" alt="">
      <h3>哎呀，崩溃啦!</h3>
      <p>抱歉，你请求的页面现在无法打开!</p>
      <p style="margin-top: 50px;">了解详情可以联系管理员， 或者返回作其他操作 !     <el-button type="primary" size="mini" class="btn-back" @click="goback">返回</el-button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  data () {
    return {
    //   nameList: []
    }
  },
  computed: {
  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.error{
  position: absolute;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  .error-info{
    width: 500px;
    height: 300px;
    border:1px solid #fff;
    margin: 220px auto;
  }
  h3{
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin-top: 22px;
  }
  p{
    font-size: 14px;
    font-weight: bold;
    color: #666;
    margin-top: 20px;
  }
  .btn-back{
    float: right;
  }
}
</style>
