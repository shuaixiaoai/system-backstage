<template>
  <div class="ordersManage-wrapper">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>订单管理</el-breadcrumb-item>
              <el-breadcrumb-item>订单详情</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="operate-wrapper">
        <div v-if="orderDetail.order_status == 10"><!--./未付款订单-->
            <el-button type="info" @click.prevent="setOrderToFailed" size="small">设为失败订单</el-button>
        </div>
        <div v-if="orderDetail.order_status == 20"><!--./已付款订单-->
            <el-button type="info" @click.prevent="setOrderToChecked" size="small">设为已确认订单</el-button>
            <el-button type="info" @click.prevent="setOrderToFailed" size="small">设为失败订单</el-button>
            <el-button @click.prevent="editOrderDetail" type="info" size="small">修改订单</el-button>
            <el-button @click.prevent="printOrder" type="danger" size="small">打印订单</el-button>
        </div>
        <div v-if="orderDetail.order_status == 30"><!--./已确认订单-->
            <el-button type="info" @click.prevent="setOrderToFailed" size="small">设为失败订单</el-button>
            <el-button @click.prevent="editOrderDetail" type="info" size="small">修改订单</el-button>
            <el-button @click.prevent="printOrder" type="danger" size="small">打印订单</el-button>
        </div>
        <div v-if="orderDetail.order_status == 40"><!--./配送中订单-->
            <el-button type="info" @click.prevent="setOrderToSucceed" size="small">设为已送达订单</el-button>
            <el-button type="info" @click.prevent="setOrderToFailed" size="small">设为失败订单</el-button>
            <el-button @click.prevent="editOrderDetail" type="info" size="small">修改订单</el-button>
            <el-button @click.prevent="printOrder" type="danger" size="small">打印订单</el-button>
        </div>
        <div v-if="orderDetail.order_status == 50 || orderDetail.order_status == 60 "><!--./成功订单-->
            <el-button type="info" @click.prevent="setOrderToFailed" size="small">设为失败订单</el-button>
            <el-button @click.prevent="printOrder" type="danger" size="small">打印订单</el-button>
        </div>
      </div>
      <div class="order-detail">
          <!-- <div class="table-header">
              <h3>订单详情</h3>
          </div> -->
          <div class="table-panel">
              <table class="table-detail">
                <tbody>
                    <tr>
                        <td class="item-name">订单Id</td>
                        <td>{{orderDetail.order_id}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">店铺名称</td>
                        <td>{{orderDetail.shop_name}}</td>
                    </tr>

                    <tr>
                        <td class="item-name">用户Id</td>
                        <td>{{orderDetail.user_id}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">顾客姓名</td>
                        <td>{{orderDetail.contacts}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">顾客电话</td>
                        <td>{{orderDetail.phone}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">顾客地址</td>
                        <td>{{orderDetail.address_detail}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">订单备注</td>
                        <td>{{orderDetail.order_message}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">顾客要求送达时间</td>
                        <td>{{orderDetail.reached_time}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">订单总价</td>
                        <td>{{orderDetail.order_amount}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">优惠券编号</td>
                        <td>{{orderDetail.voucher_code}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">优惠卷价格</td>
                        <td>{{orderDetail.voucher_price}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">配送员姓名</td>
                        <td>{{orderDetail.courier_name}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">配送员电话</td>
                        <td>{{orderDetail.courier_phone}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">订单状态</td>
                        <td v-if="orderDetail.order_status == 0">已取消</td>
                        <td v-if="orderDetail.order_status == 10">未付款</td>
                        <td v-if="orderDetail.order_status == 20">已支付</td>
                        <td v-if="orderDetail.order_status == 30">已确认</td>
                        <td v-if="orderDetail.order_status == 40">已确认</td>
                        <td v-if="orderDetail.order_status == 50">已送达</td>
                        <td v-if="orderDetail.order_status == 60">已送达</td>
                    </tr>
                    <tr>
                        <td class="item-name">商品详情</td>
                        <td>
                            <div class="goods-list" v-for="item in orderDetail.detail">
                                {{item.goods_name}}&nbsp;&nbsp;&nbsp;&nbsp;【{{item.spec_name_string}}】 【{{item.goods_num}}：份】 单价： {{item.goods_amount}}

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="item-name">取消时间</td>
                        <td>{{orderDetail.cancelTime}}</td>
                    </tr>

                    <tr>
                        <td class="item-name">下单时间</td>
                        <td>{{orderDetail.createTime}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">支付时间</td>
                        <td>{{orderDetail.paymentTime}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">确认时间</td>
                        <td>{{orderDetail.confirmTime}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">配送时间</td>
                        <td>{{orderDetail.deliveryTime}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">送达时间</td>
                        <td>{{orderDetail.takeTime}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">完成时间</td>
                        <td>{{orderDetail.finishTime}}</td>
                    </tr>
                    <tr>
                        <td class="item-name">失败原因</td>
                        <td>{{orderDetail.cancel_text}}</td>
                    </tr>
                </tbody>
              </table>
          </div>
      </div>
      <el-dialog title="订单修改" :visible.sync="dialogFormVisible" class="edit-dialogue">
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
import api from '../../api/axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ordersDetail',
  data () {
    return {
      orderDetail: {},
      dialogFormVisible: false,
      form: {
        contacts: '',
        phone: '',
        address_detail: ''
      }
    }
  },
  mounted () {
    // console.log(this.$route.query.orderId)
    this.initPage()
  },
  methods: {
    ...mapActions([
      'printerOrder'
    ]),
    initPage () {
      let orderId = this.$route.query.orderId
      var url = '/order/order/orderDetail?orderId=' + orderId
      // console.log(url)
      api.getOrderDetail(url)
      .then(({ data }) => {
        console.log(data)
        this.orderDetail = data.data
      })
    },
    setOrderToFailed () {
      this.$prompt('此操作将设置该订单为失败订单，是否继续？', '请输入失败原因', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        closeOnClickModal: false
      }).then(({value}) => {
        let postData = {
          orderIds: this.$route.query.orderId,
          cancelText: value
        }
        api.setOrderToFailed(postData)
        .then(({ data }) => {
          if (data.code === 0) {
            this.$notify.success('设置成功！')
            // 请求更新后的数据
            this.initPage()
          } else {
            this.$message.error(data.message)
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
    setOrderToChecked () {
      this.$confirm('此操作将设置该订单为已确认订单，是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        let postData = {
          orderIds: this.$route.query.orderId
        }
        api.setOrderToChecked(postData)
        .then(({ data }) => {
          if (data.code === 0) {
            this.$notify.success('设置成功！')
            this.initPage()
          } else {
            this.$message.error(data.message)
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
    editOrderDetail () {
      this.currentId = this.orderDetail.order_id
      this.form.contacts = this.orderDetail.contacts
      this.form.phone = this.orderDetail.phone
      this.form.address_detail = this.orderDetail.address_detail
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
        this.dialogFormVisible = false
        this.$notify.success('设置成功！')
        this.initPage()
      })
    },
    printOrder () {
      let sendData = {
        data: {
          orderIds: this.$route.query.orderId,
          operate: 1
        },
        that: this
      }
      this.printerOrder(sendData)
    },
    setOrderToSucceed () {
      this.$confirm('此操作将设置该订单为成功订单，是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        let postData = {
          orderIds: this.$route.query.orderId
        }
        api.setOrderToSucceed(postData)
        .then(({ data }) => {
          if (data.code === 0) {
            this.$notify.success('设置成功！')
            this.initPage()
            // 请求跟新后的数据
          } else {
            this.$message.error(data.message)
          }
        })
      })
      .catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消设置'
        // })
      })
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .ordersManage-wrapper{
        height: 100%;
        width: 100%;
        .crumb{
            width: 100%;
            height: 45px;
            line-height: 45px;
            .el-breadcrumb{
              line-height: 45px;
              padding-left:15px;
              .el-breadcrumb__item{
                color: red;
                .el-breadcrumb__item__inner{
                  color: red!important;
                }
            }
          }
        }
        .order-detail {
          border-top: 1px solid #d1dbe5;
          padding: 16px;
          .table-header{
            h3 {
              font-size: 24px;
              margin-bottom: 16px;
            }
          }
          .table-detail{
            width: 80%;
            margin: 0 auto;
            tr {
              background: #f9f9f9;
              &:nth-child(odd){
                background: #fff;
              }
              &:hover{
                background: #f9f9f9;
              }
              td {
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                border: 1px solid #d1dbe5;
                &:nth-child(odd) {
                  text-align: center;
                }
                &:nth-child(even) {
                  padding-left: 60px;
                  .goods-list{
                    width: 460px;
                    height: 30px;
                    line-height: 30px;
                    margin: 4px;
                    text-align: center;
                    background: #eee;
                  }
                }
              }
            }
            .item-name{
              width: 35%;
              text-align: right;
            }
          }
        }
    }
    .el-pagination{
      text-align: right;
      margin-top: 30px;
    }
    .operate-wrapper{
      padding: 30px 0;
      button {
        &:first-child {
          margin-left: 12px;
        }
      }
    }
</style>
