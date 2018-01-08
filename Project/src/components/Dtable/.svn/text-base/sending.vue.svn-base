<template>
    <div class="sending">
      <div class="operate-wrapper">
          <el-button @click="setOrderToSucceed()" type="warning">设为已送达订单</el-button>
          <el-button @click="setOrderToFailed()" type="danger">设为失败订单</el-button>
      </div>
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
              width = '120'>
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
              prop="courier_name"
              label="配送员"
              width="120">
          </el-table-column>
          <el-table-column
              prop="courier_phone"
              label="配送员电话">
          </el-table-column>
          <el-table-column
              prop="courier_time"
              label="配送时间"
              width="120">
          </el-table-column>
          <!-- <el-table-column
              prop="send_state"
              label="取货状态"
              width="120">
          </el-table-column> -->
          <el-table-column
              fixed="right"
              label="操作"
              width="250">
              <template scope="scope">
                <el-button @click.prevent="viewOrderDetail(scope.$index,tableData)" type="info" size="mini">查看订单</el-button>
                <el-button @click.prevent="editOrderDetail(scope.$index,tableData)" type="info" size="mini">修改订单</el-button>
                <el-button @click.prevent="printOrder(scope.$index,tableData)" type="danger" size="mini">打印订单</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" class="edit-dialogue">
            <el-form :model="form">
                <el-form-item label="姓名：" label-width="80">
                    <el-input v-model="form.contacts" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话： " label-width="80">
                    <el-input v-model="form.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址： " label-width="80">
                    <el-input v-model="form.address_detail" auto-complete="off"></el-input>
                </el-form-item>

            </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="checkToEdit">确 定</el-button>
          </div>
        </el-dialog>
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
  import { mapState, mapActions } from 'vuex'
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
        loading: false,
        dialogFormVisible: false,
        form: {
          contacts: '',
          phone: '',
          address_detail: ''
        },
        currentId: ''
      }
    },
    mounted () {
      this.loading = true
      var url = '/order/order/orderlist?shopId=10002&page=1&orderStatus=40'
      api.getOrdersList(url)
      .then(({ data }) => {
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
      ...mapActions([
        'printerOrder'
      ]),
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      setOrderToFailed () {
        this.$prompt('此操作将设置该订单为失败订单，是否继续？', '请输入失败原因', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          closeOnClickModal: false
        }).then(({ value }) => {
          let setOrders = []
          if (this.multipleSelection.length === 0) {
            this.$message('请选择订单')
          } else {
            this.multipleSelection.forEach((value) => {
              setOrders.push(value.order_id)
            })
            let postData = {
              orderIds: setOrders.join(','),
              cancelText: value
            }
            api.setOrderToFailed(postData)
            .then(({ data }) => {
              if (data.code === 0) {
                this.$notify.success('设置成功！')
                // 请求跟新后的数据
                var url = '/order/order/orderlist?shopId=10002&page=1&orderStatus=40'
                api.getOrdersList(url)
                .then(({ data }) => {
                  if (data.code === 0) {
                    this.tableData = data.data.list
                    this.total = data.data.count
                  } else {
                    this.tableData = []
                    this.total = 0
                  }
                })
              } else {
                this.$message.error(data.message)
              }
            })
          }
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: data.message
          // })
        })
      },
      setOrderToSucceed () {
        this.$confirm('此操作将设置该订单为成功订单，是否继续？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          let setOrders = []
          if (this.multipleSelection.length === 0) {
            this.$message('请选择订单')
          } else {
            this.multipleSelection.forEach((value) => {
              setOrders.push(value.order_id)
            })
            let postData = {
              orderIds: setOrders.join(',')
            }
            api.setOrderToSucceed(postData)
            .then(({ data }) => {
              if (data.code === 0) {
                this.$notify.success('设置成功！')
                // 请求跟新后的数据
                var url = '/order/order/orderlist?shopId=10002&page=1&orderStatus=40'
                api.getOrdersList(url)
                .then(({ data }) => {
                  if (data.code === 0) {
                    this.tableData = data.data.list
                    this.total = data.data.count
                  } else {
                    this.tableData = []
                    this.total = 0
                  }
                })
              } else {
                this.$message.error(data.message)
              }
            })
          }
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消设置'
          // })
        })
      },
      printOrder (index, row) {
        let sendData = {
          data: {
            orderIds: row[index].order_id,
            operate: 1
          },
          that: this
        }
        this.printerOrder(sendData)
      },
      handleCurrentChange (page) {
        var that = this
        var url = '/order/order/orderlist?shopId=10002&page=' + page + '&orderStatus=40'
        getPaginationList(that, url)
      },
      dateFormat: function (row, column) {
        var date = row[column.property] * 1000
        if (date !== '') {
          return moment(date).format('YYYY-MM-DD, h: mm: ss')
        }
      },
      viewOrderDetail (index, row) {
        let orderId = row[index].order_id
        this.$router.push({path: '/ordersManage/Detail?', query: {orderId: orderId}})
      },
      editOrderDetail (index, row) {
        this.currentId = row[index].order_id
        this.form.contacts = row[index].contacts
        this.form.phone = row[index].phone
        this.form.address_detail = row[index].address_detail
        this.dialogFormVisible = true
      },
      checkToEdit () {
        let data = {
          orderId: this.currentId,
          contacts: this.form.contacts,
          phone: this.form.phone,
          address_detail: this.form.address_detail
        }
        api.updateOrder(data).then(({data}) => {
          if (data.code === 0) {
            this.dialogFormVisible = false
            this.loading = true
            var url = '/order/order/orderlist?shopId=10002&page=1&orderStatus=40'
            api.getOrdersList(url)
            .then(({ data }) => {
              this.loading = false
              if (data.code === 0) {
                this.tableData = data.data.list
                this.total = data.data.count
              } else {
                this.$message.error(data.message)
              }
            })
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sending{
  padding: 0 2px;
  .operate-wrapper{
    width: 100%;
    height: 50px;
    margin-top: 16px;
  }
  .detail_list{
    padding: 2px 6px;
    background: #eee;
    margin: 4px;
    font-size: 12px;
    text-align: center;
  }
}
.el-button+.el-button {
    margin-left: 0;
}
.el-pagination{
  text-align: right;
  margin-top: 30px;
}
</style>
