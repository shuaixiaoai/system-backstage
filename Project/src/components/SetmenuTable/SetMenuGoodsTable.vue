<template>
  <div class="setmenu-goods-table">
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
            prop="goods_name"
            label="套餐名称">
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="价格"
            width="140">
          </el-table-column>
          <el-table-column
            prop="goods_status"
            label="状态">
            <template scope="scope">
                <span v-if="scope.row.goods_status === '1'">上架</span>
                <span v-if="scope.row.goods_status === '0'">下架</span>
            </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="180">
              <template scope="scope">
                <el-button @click.prevent="clickToeditSetMenuGoods(scope.$index,tableData)" type="danger" size="mini" icon="edit">修改</el-button>
                <el-button @click.prevent="clickToDeleteSetMenuGoods(scope.$index,tableData)" type="danger" size="mini" icon="delete2">删除</el-button>
              </template>
            </el-table-column>
      </el-table>
      <el-dialog title="套餐商品修改" :visible.sync="dialogFormVisible">
          <el-form :model="form" class="modal-data">
              <el-form-item label="价格: " label-width="140">
                  <el-input v-model="form.price"></el-input>
              </el-form-item>
              <el-form-item label="主题状态: ">
                  <el-radio-group v-model="form.state">
                      <el-radio label="1">上架</el-radio>
                      <el-radio label="0">下架</el-radio>
                  </el-radio-group>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="cancelEdit">取 消</el-button>
              <el-button type="primary" @click="confirmEdit">确 定</el-button>
          </div>
      </el-dialog>
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'setMenuGoodsTable',
  data () {
    return {
      form: {
        price: '',
        state: '',
        gccId: ''
      },
      dialogFormVisible: false
    }
  },
  mounted () {
    this.$store.commit('INITLOADING')
    let data = {
      page: 1
    }
    this.getSetMenuGoodsList(data)
  },
  computed: {
    ...mapState({
      loading: ({setMenu}) => setMenu.loading,
      tableData: ({setMenu}) => setMenu.setMenuGoodsList.list,
      total: ({setMenu}) => setMenu.setMenuGoodsList.count
    })
  },
  methods: {
    ...mapActions([
      'getSetMenuGoodsList',
      'editSetMenuGoods',
      'deleteSetMenuGoods'
    ]),
    handleCurrentChange (page) {
      this.$store.commit('INITLOADING')
      let data = {
        page: page
      }
      console.log(data)
      this.getSetMenuGoodsList(data)
    },
    clickToeditSetMenuGoods (index, row) {
      console.log(row[index])
      this.dialogFormVisible = true
      this.form.price = row[index].goods_price
      this.form.state = row[index].goods_status
      this.form.gccId = row[index].gcc_id
      // this.$router.push({path: '/ordersManage/Detail?', query: {orderId: orderId}})
    },
    clickToDeleteSetMenuGoods (index, row) {
      this.$confirm('此操作将删除该套餐商品， 是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sendData = {
          data: {
            gccId: row[index].gcc_id
          },
          that: this
        }
        this.deleteSetMenuGoods(sendData)
      }).catch(() => {
        return false
      })
    },
    confirmEdit () {
      // this.dialogFormVisible = false
      let sendData = {
        data: {
          gccId: this.form.gccId,
          goodsStatus: this.form.state,
          goodsPrice: this.form.price
        },
        that: this
      }
      this.editSetMenuGoods(sendData)
    },
    cancelEdit () {
      this.dialogFormVisible = false
      this.$message.warning('您已取消修改操作！')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.setmenu-goods-table{
  width: auto;
  height: auto;
  .modal-data .el-input{
    width: 320px;
  }
}
</style>
