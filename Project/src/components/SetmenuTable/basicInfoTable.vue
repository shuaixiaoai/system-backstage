<template>
  <div class="basic-info-table">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        tooltip-effect="dark"
        style="width: 100%">
          <el-table-column
            type="index"
            width="55">
          </el-table-column>
          <el-table-column
            prop="category_title"
            label="主题名称">
          </el-table-column>
          <el-table-column
            prop="category_status"
            label="状态">
            <template scope="scope">
                <span v-if="scope.row.category_status==='1'">上架</span>
                <span v-else>下架</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="end_time"
            label="截止时间"
            :formatter="dateFormat">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="260">
              <template scope="scope">
                <!-- <el-button @click.prevent="viewOrderDetail(scope.$index,tableData)" type="danger" size="mini">查看</el-button> -->
                <el-button @click.prevent="viewCardSurface(scope.$index,tableData)" type="success" size="mini" icon="information">查看详情</el-button>
                <el-button @click.prevent="editSetMenuTheme(scope.$index,tableData)" type="info" size="mini" icon="edit">修改</el-button>
                <el-button @click.prevent="deleteTheme(scope.$index,tableData)" type="danger" size="mini" icon="delete">删除</el-button>
              </template>
            </el-table-column>
      </el-table>
      <div class="block" v-if="total>10">
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
import { mapState, mapActions } from 'vuex'
import utils from '../../utils/utils'
export default {
  name: 'basicInfoTable',
  data () {
    return {
      // tableData: [
      //   {name: 'xiaoai', state: '12', address: 'hahaha'}
      // ]
    }
  },
  mounted () {
    this.$store.commit('INITLOADING')
    let data = {
      page: 1
    }
    this.getThemeList(data)
  },
  computed: {
    ...mapState({
      loading: ({setMenu}) => setMenu.loading,
      tableData: ({setMenu}) => setMenu.basicThemeInfo.list,
      total: ({setMenu}) => setMenu.basicThemeInfo.count
    })
  },
  methods: {
    ...mapActions([
      'getThemeList',
      'deleteSetMenuTheme',
      'getThemeDetail'
    ]),
    handleCurrentChange (page) {
      this.$store.commit('INITLOADING')
      let data = {
        page: page
      }
      console.log(data)
      this.getThemeList(data)
    },
    dateFormat: function (row, column) {
      var date = row[column.property] * 1000
      if (date !== '') {
        return moment(date).format('YYYY-MM-DD, H: mm: ss')
      }
    },
    viewCardSurface (index, row) {
      let categoryId = row[index].category_id
      utils.storage.setItem('categoryId', categoryId)
      this.$router.push({path: '/setmenuManage/themeDetail?', query: {categoryId: categoryId}})
    },
    deleteTheme (index, row) {
      let sendData = {
        data: {
          categoryId: row[index].category_id
        },
        that: this
      }
      this.deleteSetMenuTheme(sendData)
    },
    editSetMenuTheme (index, row) {
      let categoryId = row[index].category_id
      utils.storage.setItem('categoryId', categoryId)
      this.$router.push({path: '/setmenuManage/edit/editBasicInfo?', query: {category_id: row[index].category_id}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.basic-info-table{
  width: auto;
  height: auto;
}
</style>
