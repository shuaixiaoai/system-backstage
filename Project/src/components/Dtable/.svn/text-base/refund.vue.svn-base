<template>
    <div class="">
      <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      border
      tooltip-effect="light"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="45">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="订单ID"
        width="120">
      </el-table-column>
      <el-table-column
          prop="order_sn"
          label="订单编号"
          width="200"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="shop_name"
        label="店铺名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="user_id"
        label="用户ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="contacts"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="130">
      </el-table-column>
      <el-table-column
          prop="address_detail"
          label="配送地址"
          width="390">
      </el-table-column>
      <el-table-column
          prop="detail"
          label="订单详情"
          width="440"
          >
          <template scope="scope">
              <div v-for="item in scope.row.detail" class="detail_list">
                {{item.goods_name}}&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="item.spec_name_string">【</span>{{item.spec_name_string}}<span v-if="item.spec_name_string">】</span>
                <span v-if="item.goods_num">【</span>{{item.goods_num}}：份<span v-if="item.goods_num">】</span> 
                单价： {{item.goods_amount}}
              </div>
          </template>
      </el-table-column>
      <el-table-column
        prop="order_message"
        label="备注"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="reached_time"
          label="要求送达时间"
          width="190">
      </el-table-column>
      <!-- <el-table-column
          prop="coupon"
          label="是否使用优惠券"
          width="160">
      </el-table-column>
      <el-table-column
          prop="discount_money"
          label="优惠金额"
          width="100"
          show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column
          prop="order_amount"
          label="订单总价"
          width="190">
      </el-table-column>
        <el-table-column
            prop="create_time"
            label="下单时间"
            width="190"
            :formatter="dateFormat">
        </el-table-column>
        <!-- <el-table-column
            prop="order_status"
            label="订单状态"
            width="130">
        </el-table-column> -->
          <el-table-column
              prop="refund_time"
              label="退款操作时间"
              width="190"
              :formatter="dateFormat">
          </el-table-column>
          <el-table-column
              prop="refund_status"
              label="退款状态"
              width="120">
              <template scope="scope">
                <el-tag v-if="scope.row.refund_status ==='1'" type="primary">申请中</el-tag>
                <el-tag v-if="scope.row.refund_status ==='2'">已审核</el-tag>
                <el-tag v-if="scope.row.refund_status ==='3'">已退款</el-tag>
                <el-tag v-if="scope.row.refund_status ==='4'" type="danger">已拒绝</el-tag>
              </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button @click.prevent="viewOrderDetail(scope.$index,tableData)"  type="text" size="small">查看订单</el-button>
                <el-button type="text" size="small" @click.prevent="agreeRefund(scope.$index, tableData)" v-if="scope.row.refund_status==='1'">同意</el-button>
                <el-button type="text" size="small" @click.prevent="refuseRefund(scope.$index, tableData)" v-if="scope.row.refund_status==='1'">拒绝</el-button>
                <el-button type="text" size="small" v-if="scope.row.refund_status==='2'" :disabled="true">已同意</el-button>
                <el-button type="text" size="small" v-if="scope.row.refund_status==='3'" :disabled="true">已退款</el-button>
                <el-button type="text" size="small" v-if="scope.row.refund_status==='4'" :disabled="true">已拒绝</el-button>
              </template>
            </el-table-column>
        </el-table>

        <div class="block" v-show="total>10">
            <el-pagination
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import api from '../../api/axios'
  import {getPaginationList} from '../../utils/pagination'
  export default {
    name: 'Dtable',
    props: {
    },
    data () {
      return {
        tableData: [],
        total: 0,
        multipleSelection: [],
        loading: false
      }
    },
    mounted () {
      this.loading = true
      var url = '/order/order/refundList?shopId=10002&page=1'
      api.getRefundOrder(url)
      .then(({ data }) => {
        console.log(data)
        this.loading = false
        if (data.code === 0) {
          this.tableData = data.data.list
          this.total = data.data.count
        } else {
          this.$message.error(data.message)
        }
      })
    },
    computed: {
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      viewOrderDetail (index, row) {
        let orderId = row[index].order_id
        this.$router.push({path: '/ordersManage/Detail?', query: {orderId: orderId}})
      },
      agreeRefund (index, row) {
        this.$confirm('此操作将同意退款申请，是否继续？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          console.log('在这里设置')
          let orderIds = row[index].order_id
          let operate = 'agree'
          let sendData = {
            orderIds: orderIds,
            operate: operate
          }
          api.agreeRefund(sendData)
          .then(({ data }) => {
            console.log(data)
            if (data.code === 0) {
              this.$message({
                type: 'info',
                message: '设置成功'
              })
              // 请求跟新后的数据
              var url = '/order/order/refundList?shopId=10002&page=1'
              api.getRefundOrder(url)
              .then(({ data }) => {
                if (data.code === 0) {
                  this.tableData = data.data.list
                  this.total = data.data.count
                } else {
                  this.tableData = []
                  this.total = 0
                }
              })
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消设置'
          // })
        })
      },
      refuseRefund (index, row) {
        console.log('拒绝')
        this.$confirm('此操作将拒绝退款申请，是否继续？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          let orderIds = row[index].order_id
          let operate = 'refuse'
          let sendData = {
            orderIds: orderIds,
            operate: operate
          }
          api.agreeRefund(sendData)
          .then(({ data }) => {
            console.log(data)
            if (data.code === 0) {
              this.$message({
                type: 'info',
                message: '设置成功'
              })
              // 请求跟新后的数据
              var url = '/order/order/refundList?shopId=10002&page=1'
              api.getRefundOrder(url)
              .then(({ data }) => {
                if (data.code === 0) {
                  this.tableData = data.data.list
                  this.total = data.data.count
                } else {
                  this.tableData = []
                  this.total = 0
                }
              })
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消设置'
          // })
        })
      },
      handleCurrentChange (page) {
        var that = this
        var url = '/order/order/refundList?shopId=10002&page=' + page
        getPaginationList(that, url)
      },
      dateFormat: function (row, column) {
        var date = row[column.property] * 1000
        if (date !== '') {
          return moment(date).format('YYYY-MM-DD, H: mm: ss')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-pagination{
  text-align: right;
  margin-top: 30px;
}
.detail_list{
  padding: 2px 6px;
  background: #eee;
  margin: 4px;
  font-size: 12px;
  text-align: center;
}
</style>
