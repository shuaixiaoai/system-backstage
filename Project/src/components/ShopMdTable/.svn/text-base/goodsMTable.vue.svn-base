<template>
  <div class="bannerMTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
       <el-table-column
          type="index"
          label="序号"
          width="80">
       </el-table-column>
       <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
       </el-table-column>
       <el-table-column
        prop="goods_price"
        label="价格"
        width="180">
       </el-table-column>
       <el-table-column
         prop="category_name"
         label="类别"
         width="180">
       </el-table-column>
       <el-table-column
         prop="sale_num"
         label="销量">
       </el-table-column>
       <el-table-column
         prop="selling_point"
         label="标签">
       </el-table-column>
       <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template scope="scope">
            <el-button @click.prevent="viewGoodDetail(scope.$index,tableData)" type="primary" size="mini" icon="view">查看</el-button>
            <el-button @click.prevent="editGoodMessage(scope.$index,tableData)" type="danger" size="mini" icon="edit">修改</el-button>
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
import { mapState, mapActions } from 'vuex'
import {getPaginationList} from '../../utils/pagination'
import api from '../../api/axios'
import utils from '../../utils/utils'

export default {
  name: 'goodsMTable',
  data () {
    return {
    }
  },
  mounted () {
    let data = {}
    data.sendData = {}
    data.sendData.page = 1
    data.that = this
    // console.log(data)
    this.getGoodsList(data)
  },
  computed: {
    ...mapState({
      tableData: ({shopmodule}) => shopmodule.goodsList,
      total: ({shopmodule}) => shopmodule.goodsTotalNumber
    })
  },
  methods: {
    ...mapActions([
      'getGoodsList'
    ]),
    viewGoodDetail (index, row) {
      console.log(index, row[index])
      let goodsId = row[index].goods_id
      this.$router.push({path: '/shopmodule/goodDetail?', query: {goodsId: goodsId}})
    },
    editGoodMessage (index, row) {
      let goodsId = row[index].goods_id
      utils.storage.setItem('goodsId', goodsId)
      this.$router.push({path: '/shopmodule/editGood/EBasicInfo?', query: {goodsId: goodsId}})
    },
    handleCurrentChange (page) {
      let data = {}
      data.sendData = {}
      data.sendData.page = page
      data.that = this
      this.getGoodsList(data)
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
</style>
