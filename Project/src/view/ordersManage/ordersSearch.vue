<template>
  <div class="ordersManage-wrapper">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>订单管理</el-breadcrumb-item>
              <el-breadcrumb-item>订单搜索</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="key-search">
          <el-form :inline="true" :model="formInline" label-width="100px" class="demo-form-inline">
              <!-- <el-form-item label="店铺ID">
                  <el-input v-model="formInline.shopId" placeholder="店铺ID"></el-input>
              </el-form-item> -->
              <el-form-item label="订单编号">
                  <el-input v-model="formInline.orderSn" placeholder="订单编号"></el-input>
              </el-form-item>
              <el-form-item label="订单ID">
                  <el-input v-model="formInline.orderId" placeholder="订单ID"></el-input>
              </el-form-item>

              <el-form-item label="店铺名称">
                  <!-- <el-input v-model="formInline.shopName" placeholder="店铺名称"></el-input> -->
                  <el-select v-model="formInline.shopId" placeholder="请选择店铺">
                      <el-option :value="item.shop_id" :key="item.index" :label="item.shop_name" v-for="item in shopList"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="开始时间">
                  <el-date-picker
                      style="width: 180px"
                      v-model="formInline.startTime"
                      type="date"
                      placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间">
                  <el-date-picker
                      style="width: 180px"
                      v-model="formInline.endTime"
                      type="date"
                      placeholder="选择日期时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="订单状态">
                  <el-select v-model="formInline.orderStatus" placeholder="请选择订单状态
                  " style="width: 180px">
                      <el-option label="失败订单" value="0"></el-option>
                      <el-option label="未付款" value="10"></el-option>
                      <el-option label="已付款" value="20"></el-option>
                      <el-option label="商家确认" value="30"></el-option>
                      <el-option label="配送" value="40"></el-option>
                      <el-option label="已完成" value="60"></el-option>
                      <el-option label="全部" value="0, 10, 20, 30, 40, 50, 60"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="用户Id">
                  <el-input v-model="formInline.userId" placeholder="用户Id"></el-input>
              </el-form-item>　　
              <el-form-item label="姓名">
                  <el-input v-model="formInline.contacts" placeholder="姓名"></el-input>
              </el-form-item>
              <el-form-item label="电话号码">
                  <el-input v-model="formInline.phone" placeholder="电话号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :disabled="false" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
      </div>
      <div class="order-list">
          <h4 class="time-range">（日期范围：{{startDay}}--{{endDay}}）</h4>
          <Dtable :tableData='tableData' :loading='loading'></Dtable>
          <div class="block" v-if="total>10">
              <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="total, prev, pager, next"
              :total="total">
              </el-pagination>
          </div>
      </div>

  </div>
</template>

<script>
import Dtable from '../../components/Dtable/searchTable'
import api from '../../api/axios'
import utils from '../../utils/utils'
export default {
  name: 'ordersSearch',
  data () {
    return {
      formInline: {
        shopId: '',
        // shopName: '',
        startTime: '',
        endTime: '',
        orderStatus: [],
        userId: '',
        contacts: '',
        phone: '',
        orderSn: '',
        orderId: ''
      },
      tableData: [],
      total: 0,
      loading: false,
      shopList: [],
      startDay: '',
      endDay: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log(to, from)
    if (from.path === '/ordersManage/Detail') {
      console.log('123455g')
    }
    next()
  },
  mounted () {
    // console.log(this.$route)
    let url = '/shop/shop/getShopDownList'
    api.getShopsList(url).then(({data}) => {
      console.log(data)
      if (data.code === 0) {
        this.shopList = data.data.list
      } else {
        this.$message.error('获取店铺列表失败，请联系管理员！')
      }
    })
  },
  methods: {
    onSubmit () {
      this.loading = true
      let searchData = this.initSearchData()
      searchData.page = 1
      // console.log(this.formInline)
      console.log(searchData)
      api.searchOrder(searchData)
      .then(({ data }) => {
        console.log(data)
        this.loading = false
        if (data.code === 0) {
          this.tableData = data.data.list
          this.total = data.data.count
          this.startDay = data.data.startDay
          this.endDay = data.data.endDay
        } else {
          this.$message.error(data.message)
          this.tableData = []
          this.total = 0
        }
      })
    },
    initSearchData () {
      let startDay = ''
      if (this.formInline.startTime === '') {
        startDay = ''
      } else {
        // console.log(utils.formatDate(this.formInline.startTime))
        startDay = utils.formatDate(this.formInline.startTime)
      }
      let endDay = ''
      if (this.formInline.endTime === '') {
        endDay = ''
      } else {
        endDay = utils.formatDate(this.formInline.endTime)
      }
      let shopId = this.formInline.shopId
      // let shopName = this.formInline.shopName

      // let endTime = this.formInline.endTime
      let orderStatus = this.formInline.orderStatus
      let userId = this.formInline.userId
      let contacts = this.formInline.contacts
      let phone = this.formInline.phone
      let orderSn = this.formInline.orderSn
      let orderId = this.formInline.orderId
      let searchData = {
        shopId: shopId,
        startDay: startDay,
        endDay: endDay,
        orderStatus: orderStatus,
        userId: userId,
        contacts: contacts,
        phone: phone,
        orderSn: orderSn,
        orderId: orderId
      }
      // console.log(searchData)
      return searchData
    },
    handleCurrentChange (page) {
      // 分页点击事件， 回去对应分页的数据
      let searchData = this.initSearchData()
      searchData.page = page
      api.searchOrder(searchData)
      .then(({ data }) => {
        if (data.code === 0) {
          this.tableData = data.data.list
          this.total = data.data.count
        }
      })
    }
  },
  components: {
    Dtable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .ordersManage-wrapper{
        width: 100%;
        height: auto;
        .crumb{
            width: 100%;
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #d1dbe5;
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
        .key-search{
          margin-top: 30px;
          padding: 0 16px;
        }
        .order-list{
          padding: 0 2px;
          margin-top: 70px;
          position: relative;
          .time-range{
            position: absolute;
            top: -30px;
            right: 0;
            font-size: 12px;
            font-weight: bold;
          }
        }
    }
    .el-pagination{
      text-align: right;
      margin-top: 30px;
    }

</style>
