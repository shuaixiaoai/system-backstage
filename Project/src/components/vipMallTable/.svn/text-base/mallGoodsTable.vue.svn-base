<template>
  <div class="setmenu-goods-table">
  <!-- {{ tableDataCount }} -->
      <el-table
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 90%;">
          <el-table-column
            type="index"
            prop="mgoods_id"
            label="序号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="mgoods_name"
            label="商品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="points"
            label="所需积分"
            width="180">
          </el-table-column>
          <el-table-column
            prop="goods_type"
            width="80"
            label="类别">
          </el-table-column>
          <el-table-column
            prop="sale_num"
            label="已兑换量"
            width="180">
          </el-table-column>
          <el-table-column
            prop="storage"
            label="当前库存"
            width="180">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="140">
            <!-- 模板作用域scope -->
            <template scope="scope">
              <el-switch
              v-model="scope.row.status"
              on-text="上架"
              off-text="下架"
              on-value="1"
              off-value="0"
              on-color="#13ce66"
              off-color="#ff4949"
              disabled>
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="image_id"
            label="图片id"
            width="120">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="180">
              <template scope="scope">
                <el-button type="danger" size="mini" icon="edit" @click.prevent="toEditMallGoods(scope.$index,tableData)">修改</el-button>
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
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import utils from '../../utils/utils'
export default {
  name: 'mallGoodsTable',
  // 初始化数据
  data () {
    return {
      currentPage: 1
    }
  },
  // 挂载立即执行
  mounted () {
    let params = {
      pageNum: 1
    }
    this.getVipMallGoodsList(params)// params请求参数
  },
  // 计算属性,获取vuex数据
  computed: {
    ...mapState({
      tableData: ({vipMallGoods}) => vipMallGoods.mallGoodsData,
      tableDataCount: ({vipMallGoods}) => vipMallGoods.mallGoodsDataCount
    })
  },
  // 方法声明
  methods: {
    ...mapActions([
      'getVipMallGoodsList'
    ]),
    toEditMallGoods (index, row) {
      let mgoodsId = row[index].mgoods_id
      // 跳转存储goodsId防刷新
      utils.storage.setItem('mgoodsId', mgoodsId)
      this.$router.push({path: '/vipStore/editMallGoodsMainEntry?', query: {skipType: 'modify'}})
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      let params = {
        pageNum: val
      }
      this.getVipMallGoodsList(params)// params请求参数
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
