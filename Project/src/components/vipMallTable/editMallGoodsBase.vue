<template>
  <div class="setmenu-goods-table">

  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'editMallGoodsBase',
  // 初始化数据
  data () {
    return {
    }
  },
  // 挂载立即执行
  mounted () {
    let params = {
      pageNum: 1
    }
    this.getVipMallGoods(params)// params请求参数
  },
  // 计算属性,获取vuex数据
  computed: {
    ...mapState({
      tableData: ({vipMallGoods}) => vipMallGoods.mallGoodsData
    })
  },
  // 方法声明
  methods: {
    ...mapActions([
      'getVipMallGoods'
    ]),
    toModify (row, column) {
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.setmenu-goods-table{
  width: auto;
  height: auto;
  margin: 30px 50px;
}
</style>
