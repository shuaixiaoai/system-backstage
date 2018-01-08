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
              prop="order_sn"
              label="订单编号"
              width="200"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="order_id"
            label="订单ID"
            width="120">
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
          <el-table-column
              prop="coupon"
              label="是否使用优惠券"
              width="160">
          </el-table-column>
          <el-table-column
              prop="discount_money"
              label="优惠金额"
              width="100"
              show-overflow-tooltip>
          </el-table-column>
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
          <el-table-column
              prop="order_status"
              label="订单状态"
              width="130">
              <template scope="scope">
                <span v-if="scope.row.order_status==='0'">失败订单</span>
                <span v-if="scope.row.order_status==='10'">未付款订单</span>
                <span v-if="scope.row.order_status==='20'">已付款订单</span>
                <span v-if="scope.row.order_status==='30'">已确认订单</span>
                <span v-if="scope.row.order_status==='40'">配送中订单</span>
                <span v-if="scope.row.order_status==='50'">已完成订单</span>
                <span v-if="scope.row.order_status==='60'">已完成订单</span>
              </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button @click.prevent="viewOrderDetail(scope.$index,tableData)"  type="text" size="small">查看订单</el-button>
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

    </div>
</template>

<script>
  import moment from 'moment'
  import api from '../../api/axios'
  export default {
    name: 'Dtable',
    props: {
      tableData: {
        type: Array,
        default: function () {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        multipleSelection: [],
        dialogFormVisible: false,
        form: {
          contacts: '',
          phone: '',
          address_detail: ''
        }
      }
    },
    mounted () {
    },
    computed: {
    },
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      dateFormat: function (row, column) {
        var date = row[column.property] * 1000
        if (date !== '') {
          return moment(date).format('YYYY-MM-DD, H: mm: ss')
        }
      },
      viewOrderDetail (index, row) {
        let orderId = row[index].order_id
        console.log(orderId)
        this.$router.push({path: 'Detail?', query: {orderId: orderId}})
      },
      editOrderDetail (index, row) {
        this.currentId = row[index].order_id
        this.form.contacts = row[index].contacts
        this.form.phone = row[index].phone
        this.form.address_detail = row[index].address_detail
        console.log(this.form)
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
          //   var url = '/order/order/orderlist?shopId=10002&page=1&orderStatus=30'
          //   api.getOrdersList(url)
          //     .then(({ data }) => {
          //       if (data.code === 0) {
          //         this.tableData = data.data.list
          //         this.total = data.data.count
          //       }
          //     })
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.detail_list{
  padding: 2px 6px;
  background: #eee;
  margin: 4px;
  font-size: 12px;
  text-align: center;
}
.el-button+.el-button {
    margin-left: 0;
}
.el-pagination{
  text-align: right;
  margin-top: 30px;
}
</style>
