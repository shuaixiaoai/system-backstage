<template>
  <div class="goods-bind-shop">
    <div class="section-bind">
      <span class="wrapper-header">绑定店铺</span>
      <el-button　type="default" size="small" @click="addShop" class="add-bind" :disabled="successFlag"><i class="el-icon-plus"></i>　添加绑定店铺</el-button>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline each-bindshop" v-for="(item, index) in bindArr" :key="item.shopId">
      <!-- <div class="" > -->
        <el-button type="default" icon="close" size="mini" class="btn-delete" @click="deleteMsgItem(index)" :disabled="successFlag"></el-button>
        <el-form-item label="店铺选择" label-width="100px" class="item-list">
            <el-select v-model="item.shopId" placeholder="请选择店铺"  :disabled="successFlag">
                <el-option :value="item.shop_id" :key="item.index" :label="item.shop_name" v-for="item in shopList"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品状态" label-width="100px" class="item-list">
            <el-radio-group v-model="item.goodsStatus" :disabled="successFlag">
                <el-radio-button label="1">上线</el-radio-button>
                <el-radio-button label="0">下线</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="设为库存" label-width="100px" class="item-list" >
            <el-input v-model="item.storage" class="banner-input" placeholder="请输入" :disabled="successFlag"></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" label-width="100px" class="item-list" >
            <el-radio-group v-model="item.goodsCommend" :disabled="successFlag">
                <el-radio-button label="0">不推荐</el-radio-button>
                <el-radio-button label="1">推荐</el-radio-button>
            </el-radio-group>
        </el-form-item>
      <!-- </div> -->
    </el-form>
    <div class="wrapper-create">
        <el-button type="primary" @click="submitForm('formInline')" class="btn-create" :disabled="successFlag">确认绑定店铺</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PropertyTb from '../ShopMdTable/hasPropertyTable'
import utils from '../../utils/utils'
import URL from '../../utils/baseURL'
export default {
  name: 'gbindShop',
  data () {
    return {
      formInline: {},
      bindArr: [
        {shopId: '', storage: '', goodsStatus: 0, goodsCommend: 0}
      ],
      successFlag: false
    }
  },
  mounted () {
    let url = URL.baseUrl + '/shop/shop/getShopDownList'
    this.getShopsList(url)
  },
  computed: {
    ...mapState({
      // multipPropertiesleSelection: ({shopmodule}) => shopmodule.multipPropertiesleSelection,
      shopList: ({shopmodule}) => shopmodule.shopList,
      goodsId: ({shopmodule}) => shopmodule.currentGoodsId
    })
  },
  methods: {
    ...mapActions([
      'getShopsList',
      'newGoodsBindShop'
    ]),
    submitForm () {
      let validate = false
      for (let i = 0; i < this.bindArr.length; i++) {
        if (this.bindArr[i].shopId === '') {
          this.$message.error('商品绑定店铺必选！')
          return
        }
        if (this.bindArr[i].storage === '') {
          this.$message.error('库存必选！')
          return
        } else if (!utils.isNum(this.bindArr[i].storage)) {
          this.$message.error('库存必须为数值！')
          return
        }
        validate = true
      }
      if (validate) {
        let data = {}
        data.sendData = this.initPostData()
        data.that = this
        console.log(data.sendData)
        this.newGoodsBindShop(data)
      }
    },
    initPostData () {
      let sendData = {}
      sendData.goodsId = this.goodsId
      sendData.bind = sendData.bind = JSON.parse(JSON.stringify(this.bindArr))
      for (let i = 0; i < this.bindArr.length; i++) {
        sendData.bind[i].goodsStatus = parseInt(this.bindArr[i].goodsStatus)
        sendData.bind[i].goodsCommend = parseInt(this.bindArr[i].goodsCommend)
        sendData.bind[i].shopId = parseInt(this.bindArr[i].shopId)
        sendData.bind[i].storage = parseInt(this.bindArr[i].storage)
      }
      return sendData
    },
    addShop () {
      this.bindArr.push({shopId: '', storage: '', goodsStatus: 0, goodsCommend: 0})
    },
    deleteMsgItem (index) {
      this.bindArr.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goods-bind-shop{
  .section-bind{
    position: relative;
    width: 760px;
    margin: 0 auto;
    .add-bind{
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .item-list {
    margin-top: 12px;
    width: 360px;
    margin-bottom: 12px;
  }
  .each-bindshop{
    width: 760px;
    position: relative;
    margin: 0 auto 16px auto;
    padding-top: 16px;
    border-radius: 8px;
    border: 1px solid #D3DCE6;
    .btn-delete {
      position: absolute;
      top: 12px;
      right: 12px;
    }
  }
  .wrapper-create{
    width: 760px;
    margin: 16px auto 12px auto;
  }
  .wrapper-header{
    margin-top: 0;
  }
}
</style>
