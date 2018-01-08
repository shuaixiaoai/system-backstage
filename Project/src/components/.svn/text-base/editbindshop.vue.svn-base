<template>
  <div class="bindshop">
    <el-form :inline="true" :model="formInline" class="demo-form-inline each-bindshop" v-for="(item, index) in bindArr" :key="item.shopId">
      <el-button type="default" icon="close" size="mini" class="btn-delete" @click="deleteMsgItem(index)"></el-button>
      <el-form-item label="店铺选择" label-width="100px" class="item-list">
          <el-select v-model="item.shop_id" placeholder="请选择店铺">
              <el-option :value="item.shop_id" :key="item.index" :label="item.shop_name" v-for="item in shopList"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="Banner状态" label-width="100px" class="item-list">
          <el-radio-group v-model="item.is_show">
              <el-radio-button label="1">上线</el-radio-button>
              <el-radio-button label="0">下线</el-radio-button>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="截止时间" label-width="100px" class="item-list">
          <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" v-model="item.deadline" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="排序" label-width="100px" class="item-list">
          <el-input v-model="item.sort_by" class="banner-input" placeholder="默认值为0"></el-input>
      </el-form-item>
    </el-form>
    <div class="add-bindbanner">
        <el-button　type="default" size="small" @click="addShop"><i class="el-icon-plus"></i>　添加绑定店铺</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import URL from '../utils/baseURL'
export default {
  name: 'bindshop',
  data () {
    return {
      formInline: {}
    }
  },
  mounted () {
    let url = URL.baseUrl + '/shop/shop/getShopDownList'
    this.getShopsList(url)
  },
  computed: {
    ...mapState({
      bindArr: ({shopmodule}) => shopmodule.editData.bind,
      shopList: ({shopmodule}) => shopmodule.shopList
    })
  },
  methods: {
    ...mapActions([
      'getShopsList'
    ]),
    addShop () {
      console.log(this.bindArr)
      // this.$store.commit('ADDBINDBANNER')
      this.bindArr.push({shop_id: '', deadline: '', sort_by: '', is_show: '0'})
    },
    deleteMsgItem (index) {
      console.log(index)
      this.bindArr.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bindshop{
  margin-left: -90px;
}
.item-list {
  width: 360px;
  margin-bottom: 12px;
}
.add-bindbanner {
  button{
    display: inline-block;
    width: auto;
    height: 30px;
    // margin-left: 32px;
    cursor: pointer;
  }
}
.each-bindshop{
  position: relative;
  margin-bottom: 16px;
  padding-top: 16px;
  border-radius: 8px;
  border: 1px solid #D3DCE6;
  .btn-delete {
    position: absolute;
    top: 12px;
    right: 12px;
  }
}
</style>
