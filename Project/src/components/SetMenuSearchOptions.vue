<template>
  <div class="search-option">
      <el-form ref="form" :model="form" label-width="140px">
          <el-form-item label="查询条件： " class="specialColor"></el-form-item>
          <el-form-item label="日期：">
              <el-col :span="4">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.startDay" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1" style="text-align: center;color: #97a8be;">——</el-col>
              <el-col :span="4">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.endDay" style="width: 100%;"></el-date-picker>
              </el-col>
          </el-form-item>
          <el-form-item label="套餐卡主题：">
              <el-select v-model="form.categoryId" clearable placeholder="请选择主题">
                  <el-option :value="item.category_id" :key="item.index" :label="item.category_title" v-for="(item, index) in themeList"></el-option>
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
    type: {
      type: String
    }
  },
  name: 'Search',
  data () {
    return {
      form: {
        startDay: '',
        endDay: '',
        categoryId: ''
      },
      themeList: []
    }
  },
  mounted () {
    let data = {
      page: 0
    }
    api.getThemeList(data).then(({data}) => {
      this.themeList = data.data.list
    })
  },
  methods: {
    ...mapActions([
      'getSetMenuSales',
      'getSetMenuTurnover',
      'exportSetMenuTurnoverTable',
      'exportSetMenuSalesTable'
    ]),
    onSubmit () {
      let sendData = {
        data: this.initSearchData(),
        that: this
      }
      this.$store.commit('ADDLOADING')
      if (this.type === 'setMenu') {
        this.getSetMenuTurnover(sendData)
      }
      if (this.type === 'setMenuSales') {
        this.getSetMenuSales(sendData)
      }
    },
    initSearchData () {
      let data = {}
      if (this.form.startDay === '') {
        data.startDay = ''
      } else {
        data.startDay = utils.formatDate(this.form.startDay)
      }
      if (this.form.endDay === '') {
        data.endDay = ''
      } else {
        data.endDay = utils.formatDate(this.form.endDay)
      }
      data.categoryId = this.form.categoryId
      data.page = 1
      return data
    },
    exportExcel () {
      if (this.type === 'setMenu') {
        let data = {
          categoryId: this.form.categoryId,
          startDay: this.initSearchData().startDay,
          endDay: this.initSearchData().endDay
        }
        console.log(data)
        this.exportSetMenuTurnoverTable(data)
      }
      if (this.type === 'setMenuSales') {
        let data = {
          categoryId: this.form.categoryId,
          startDay: this.initSearchData().startDay,
          endDay: this.initSearchData().endDay
        }
        // console.log(data)
        this.exportSetMenuSalesTable(data)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.specialColor .el-form-item__label {
  color: #475669;
  font-size: 16px;
  font-weight: bold;
}
</style>
