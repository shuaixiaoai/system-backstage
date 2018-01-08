<template>
  <div class="setmenu-goods-table">
      <div style="margin: 30px 0;">
        <el-button type="success" @click="showDialogForm()">设为已发货订单</el-button>
        <el-button type="danger" @click="orderToFail">设为失败订单</el-button>
      </div>
      <el-table
        ref="singleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="morder_id"
          label="订单ID"
          width="100">
        </el-table-column>
        <el-table-column
          prop="morder_sn"
          label="订单编号"
          width="200">
        </el-table-column>
        <!-- <el-table-column
          prop="user_id"
          label="用户ID"
          width="80">
        </el-table-column> -->
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
          prop="mgoods_name"
          label="兑换商品名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="goods_type"
          label="商品类别"
          width="150">
          <template scope="scope">
            <span v-if="scope.row.goods_type ==1">实物</span>
            <span v-if="scope.row.goods_type ==2">虚拟</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address_info"
          label="地址"
          width="320">
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
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button type="danger" size="mini" icon="edit" @click.prevent="modifyOrder(scope.$index,tableData)">修改</el-button>
              </template>
            </el-table-column>
      </el-table>
      <div class="pages" v-if="tableDataCount>10">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="tableDataCount">
        </el-pagination>
      </div>
      <!-- 填写物流表单 -->
      <el-dialog title="填写物流备注" :visible.sync="dialogFormVisible">
        <el-form :model="logisticsForm" :rules="rules" ref="logisticsForm"  label-width="100px">
          <el-form-item label="物流名称" prop="shippingName">
            <el-input v-model="logisticsForm.shippingName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="物流单号" prop="shippingCode">
            <el-input v-model="logisticsForm.shippingCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="物流描述" prop="shippingDesc">
            <el-input v-model="logisticsForm.shippingDesc" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitLogisticsForm('logisticsForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改订单姓名，电话，地址表单 -->
      <el-dialog title="请填写订单修改信息" :visible.sync="dialogFormOrder">
        <el-form :model="orderForm" :rules="orderRules" ref="orderForm"  label-width="100px">
          <el-form-item label="姓名" prop="shippingName">
            <el-input v-model="orderForm.userName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="shippingCode">
            <el-input v-model="orderForm.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="shippingDesc">
            <el-input v-model="orderForm.addressInfo" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormOrder = false">取 消</el-button>
          <el-button type="primary" @click="submitOrderForm('orderForm')">确 定</el-button>
        </div>
      </el-dialog>
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
      rowSelected: '',
      currentPage: 1,
      dialogFormVisible: false,
      dialogFormOrder: false,
      logisticsForm: {
        shippingName: '',
        shippingCode: '',
        shippingDesc: ''
      },
      rules: {
        shippingName: [
          { required: true, message: '物流公司名称', trigger: 'blur' }
        ],
        shippingCode: [
          { required: true, message: '物流单号', trigger: 'blur' }
        ],
        shippingDesc: [
          { required: false, message: '物流描述', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      orderForm: {
        morderId: '',
        userName: '',
        phone: '',
        addressInfo: ''
      },
      orderRules: {
        userName: [
          { required: true, message: '姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '电话', trigger: 'blur' }
        ],
        addressInfo: [
          { required: false, message: '地址信息', trigger: 'blur' }
        ]
      }
    }
  },
  // 挂载立即执行
  mounted () {
  // params请求参数
  // orderStatus 未发货订单填10,20,30 已发货为40 失败为0.
    let params = {
      page: 1,
      orderStatus: '0,20,30'
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
      'getMallOrdersList',
      'setMallOrderToSuccess',
      'setMallOrderToFail',
      'modifyMallOrderDetail'
    ]),
    handleSelectionChange (val) {
      this.rowSelected = val
      if (val.length > 1) {
        val.splice(0, val.length - 1)
      }
    },
    showDialogForm () {
      if (!this.rowSelected) {
        this.$message('请选择一项进行设置')
      } else if (this.rowSelected[0].order_type === '1') {
        // order_type 1：实物 2：虚拟
        this.dialogFormVisible = true
      } else {
        this.remarksLogistics()
      }
    },
    submitLogisticsForm (logisticsForm) {
      this.$refs[logisticsForm].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.orderToSuccess()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    remarksLogistics () {
      let that = this
      that.$prompt('填写备注', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '备注不能为空',
        inputPlaceholder: '请输入备注'
      }).then(({ value }) => {
        that.$message({
          type: 'success',
          message: '物流信息是 ' + value
        })
        that.orderToSuccess(value)
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    orderToSuccess (val) {
      console.log('提交')
      let postParams = {}
      postParams.morderId = this.rowSelected[0].morder_id
      postParams.orderType = this.rowSelected[0].order_type
      postParams.shippingName = this.logisticsForm.shippingName
      postParams.shippingCode = this.logisticsForm.shippingCode
      if (this.rowSelected[0].order_type === '1') {
        postParams.shippingDesc = this.logisticsForm.shippingDesc
      } else {
        postParams.shippingDesc = val
      }

      let params = {
        data: postParams,
        that: this
      }
      this.setMallOrderToSuccess(params)
    },
    orderToFail () {
      let that = this
      that.$prompt('填写失败原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '失败原因不能为空',
        inputPlaceholder: '请填写失败原因'
      }).then(({ value }) => {
        that.$message({
          type: 'success',
          message: '物流信息是 ' + value
        })
        console.log(value)
        console.log(that.rowSelected)
        let params = {
          data: {
            morderId: that.rowSelected[0].morder_id,
            cancelReason: value
          },
          that: that
        }
        that.setMallOrderToFail(params)
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    modifyOrder (i, tableData) {
      this.dialogFormOrder = true
      this.orderForm.morderId = tableData[i].morder_id
      this.orderForm.userName = tableData[i].user_name
      this.orderForm.phone = tableData[i].phone
      this.orderForm.addressInfo = tableData[i].address_info
    },
    submitOrderForm (orderForm) {
      console.log(this.orderForm)
      let params = {
        data: {
          morderId: this.orderForm.morderId,
          userName: this.orderForm.userName,
          phone: this.orderForm.phone,
          addressInfo: this.orderForm.addressInfo
        },
        that: this
      }
      this.$refs[orderForm].validate((valid) => {
        if (valid) {
          this.dialogFormOrder = false
          this.modifyMallOrderDetail(params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      let params = {
        page: val,
        orderStatus: '0,20,30'
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
