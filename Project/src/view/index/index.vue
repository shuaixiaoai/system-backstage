<template>
  <div class="first-page">
    <img src="./indexbg.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.first-page{
  width: 100%;
  height: 100%;
  button {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    background: #000;
    color: #fff;
  }
  img{
    width: 100%;
    height: 99%;
  }
  // background: url(./indexbg.jpg) no-repeat center center;
}
</style>
