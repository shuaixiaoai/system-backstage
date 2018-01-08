<template>
  <div class="setmenu-goods">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>套餐卡管理</el-breadcrumb-item>
            <el-breadcrumb-item>套餐商品列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <div class="operate">
            <el-button type="primary" @click="addNewSetMenu">新增套餐商品</el-button>
        </div>
        <div class="table-data">
            <SetMenuGoodsTable></SetMenuGoodsTable>
        </div>
    </div>
    <el-dialog title="新增套餐商品" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm" class="modal-data" :rules="rules" ref="addForm">
            <el-form-item label="商品：" label-width="80px" prop="goodsId">
                <el-select v-model="addForm.goodsId" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.goods_id"
                      :label="item.goods_name"
                      :value="item.goods_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格: " label-width="80px" prop="price">
                <el-input v-model="addForm.price"></el-input>
            </el-form-item>
            <el-form-item label="主题状态: ">
                <el-radio-group v-model="addForm.state">
                    <el-radio label="1">上架</el-radio>
                    <el-radio label="0">下架</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd">取 消</el-button>
            <el-button type="primary" @click="confirmAdd('addForm')">确 定</el-button>
        </div>
    </el-dialog>
    <!-- {{options}} -->
  </div>
</template>

<script>
import SetMenuGoodsTable from '../../components/SetmenuTable/SetMenuGoodsTable'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'setMenuGoods',
  data () {
    return {
      addForm: {
        price: '',
        state: '0',
        goodsId: ''
      },
      rules: {
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        goodsId: [
          { required: true, message: '此项必选', trigger: 'blur' }
        ]
      },
      addDialogFormVisible: false
    }
  },
  computed: {
    ...mapState({
      options: ({setMenu}) => setMenu.goodsList
    })
  },
  mounted () {
    this.getAllGoodsList()
  },
  methods: {
    ...mapActions([
      'getAllGoodsList',
      'createNewSetMenuGoods'
    ]),
    addNewSetMenu () {
      // console.log('add')
      this.addDialogFormVisible = true
    },
    cancelAdd () {
      this.addDialogFormVisible = false
    },
    confirmAdd (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          let sendData = {
            data: {
              goodsId: this.addForm.goodsId,
              goodsStatus: this.addForm.state,
              goodsPrice: this.addForm.price
            },
            that: this
          }
          this.createNewSetMenuGoods(sendData)
          // this.addDialogFormVisible = false
        } else {
          return false
        }
      })
      // this.addDialogFormVisible = false
    }
  },
  components: {
    SetMenuGoodsTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.setmenu-goods{
  width: 100%;
  height: 100%;
  .modal-data .el-input{
    width: 205px;
  }
  .container{
    margin: 0 100px;
  }
  .operate{
    margin: 30px 2px;
  }
  .table-data{
    margin-top: 20px;
  }
}
</style>
