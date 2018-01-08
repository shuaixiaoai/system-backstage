<template>
  <div class="setmenu-goods-table">
      <el-table
        ref="singleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row>
        <el-table-column
          prop="morder_sn"
          label="订单编号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="用户ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address_info"
          label="地址"
          width="250">
        </el-table-column>
        <el-table-column
          prop="all_point"
          label="所需积分"
          width="150">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="下单时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="shipping_name"
          label="物流名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="shipping_code"
          label="物流单号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="shipping_desc"
          label="物流描述"
          width="150">
        </el-table-column>
        <el-table-column
          prop="cancel_text"
          label="失败原因"
          width="150">
        </el-table-column>
      </el-table>
      <div class="pages" v-if='tableDataCount>10'>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="tableDataCount">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import utils from '../../../utils/utils'
export default {
  name: 'editPendingOrder',
  // 初始化数据
  data () {
    return {
      currentPage: 1
    }
  },
  // 挂载立即执行
  mounted () {
  // params请求参数
  // orderStatus 未发货订单填10,20,30 已发货为40 失败为0.
    let params = {
      page: 1,
      orderStatus: '0'
    }
    this.getMallOrdersList(params)
  },
  // 计算属性,获取vuex数据
  computed: {
    ...mapState({
      tableData: ({vipMallGoods}) => vipMallGoods.mallOrdersData,
      tableDataCount: ({vipMallGoods}) => vipMallGoods.mallOrdersDataCount
    })
  },
  // 方法声明
  methods: {
    ...mapActions([
      'getMallOrdersList'
    ]),
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      let params = {
        page: val,
        orderStatus: '40'
      }
      this.getMallOrdersList(params)// params请求参数
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
  .pages{
    margin-right: 15%;
  }
}
</style>
