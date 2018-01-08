<template>
  <div class="search-option">
      <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="查询条件: " class="specialColor"></el-form-item>
          <el-form-item label="日期：">
              <el-col :span="4">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1" style="text-align: center;color: #97a8be;">——</el-col>
              <el-col :span="4">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
              </el-col>
          </el-form-item>
          <el-form-item label="时间(时段)：" v-if="searchTime">
              <el-col :span="4">
                  <el-time-select
                      type="time"
                      placeholder="起始时间"
                      v-model="form.time1"
                      style="width: 100%;"
                      :picker-options="{
                          start: '01:00',
                          step: '01:00',
                          end: '24:00'
                      }"></el-time-select>
              </el-col>
              <el-col class="line" :span="1" style="text-align: center;color: #97a8be;">——</el-col>
              <el-col :span="4">
                  <el-time-select
                    type="time"
                    placeholder="起始时间"
                    v-model="form.time2"
                    style="width: 100%;"
                    :picker-options="{
                        start: '01:00',
                        step: '01:00',
                        end: '24:00'
                    }"></el-time-select>
              </el-col>
          </el-form-item>
          <el-form-item label="店铺：" v-if="searchShop">
              <el-select v-model="shop_id" clearable placeholder="请选择店铺">
                  <el-option :value="item.shop_id" :key="item.index" :label="item.shop_name" v-for="item in shop"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="商品：" v-if="goods">
            <el-select v-model="goods_id" clearable placeholder="请选择商品">
                <el-option :value="item.goods_id" :key="item.index" :label="item.goods_name" v-for="item in goodsList"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="exportExcel">导出 Excel</el-button>
          </el-form-item>
    </el-form>
  </div>
</template>

<script>
import utils from '../utils/utils'
import api from '../api/axios'
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    searchTime: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    searchShop: {
      type: Boolean,
      default: true
    },
    goods: {
      type: String
    }
  },
  name: 'Search',
  data () {
    return {
      form: {
        shopId: '',
        goodsId: '',
        date1: '',
        date2: '',
        time1: '',
        time2: ''
      },
      shop: [],
      goodsList: [],
      shop_id: '',
      goods_id: ''
    }
  },
  mounted () {
    api.getShopsList('/shop/shop/getShopDownList')
    .then(({ data }) => {
      this.shop = data.data.list
    })
    let data = {
      page: 0
    }
    api.getGoodsList(data).then(({data}) => {
      this.goodsList = data.data.list
    })
  },
  methods: {
    ...mapActions([
      'getTotalOrdersStatistic',
      'getGoodsSalesStatistic',
      'getTurnoverStatistic',
      'getUserNumStatistic',
      'eportTurnoverExcel',
      'eportTotalOrdersExcel',
      'eportGoodsSalesExcel',
      'eportUserNumExcel'
    ]),
    onSubmit () {
      let sendData = {
        data: this.initSearchData(),
        that: this
      }
      if (this.type === 'totalOrder') {
        this.getTotalOrdersStatistic(sendData)
      }
      if (this.type === 'goodsSales') {
        this.getGoodsSalesStatistic(sendData)
      }
      if (this.type === 'turnover') {
        this.getTurnoverStatistic(sendData)
      }
      if (this.type === 'userNum') {
        // console.log(sendData)
        this.getUserNumStatistic(sendData)
      }
    },
    initSearchData () {
      let searchData = {}
      searchData.shopId = this.shop_id
      searchData.goodsId = this.goods_id
      if (this.form.date1 === '') {
        searchData.startDay = ''
      } else {
        searchData.startDay = utils.formatDate(this.form.date1)
      }
      if (this.form.date2 === '') {
        searchData.endDay = ''
      } else {
        searchData.endDay = utils.formatDate(this.form.date2)
      }
      searchData.startHour = this.form.time1.slice(0, 2)
      searchData.endHour = this.form.time2.slice(0, 2)
      searchData.page = 1
      return searchData
    },
    exportExcel () {
      // console.log(this.type)
      if (this.type === 'turnover') {
        let data = this.initSearchData()
        let sendData = {}
        sendData.shopId = data.shopId
        sendData.startDay = data.startDay
        sendData.endDay = data.endDay
        this.eportTurnoverExcel(sendData)
      }
      if (this.type === 'totalOrder') {
        let data = this.initSearchData()
        this.eportTotalOrdersExcel(data)
      }
      if (this.type === 'goodsSales') {
        let data = this.initSearchData()
        let sendData = {}
        sendData.shopId = data.shopId
        sendData.startDay = data.startDay
        sendData.endDay = data.endDay
        this.eportGoodsSalesExcel(sendData)
      }
      if (this.type === 'userNum') {
        let data = this.initSearchData()
        this.eportUserNumExcel(data)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.specialColor .el-form-item__label {
  color: #475669;
}
</style>
