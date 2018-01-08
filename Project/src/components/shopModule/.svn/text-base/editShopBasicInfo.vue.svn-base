<template>
  <div class="edit-basicInfo">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <div class="section-bind">
        <span class="wrapper-header" style="margin-bottom: 30px;">基本信息：</span>
      </div>
      <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="form.goods_name" class="good-input" :disabled="editDisabled"></el-input>
      </el-form-item>
      <el-form-item label="基本价格" prop="goods_price">
          <el-input v-model="form.goods_price" class="good-input" :disabled="editDisabled">
              <template slot="append"> ￥</template>
          </el-input>
      </el-form-item>
      <el-form-item label="分　　类" prop="category_id">
          <el-select v-model="form.category_id" placeholder="请选择分类"　class="good-input" :disabled="editDisabled">
              <el-option :value="item.category_id" :key="index" :label="item.category_name" v-for="(item, index) in categoryList"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="餐盒费" prop="materiel_fee">
          <el-input v-model="form.materiel_fee" class="good-input" :disabled="editDisabled"></el-input>
      </el-form-item>
      <el-form-item label="商品标签" prop="selling_point">
          <el-input v-model="form.selling_point" class="good-input" :disabled="editDisabled"></el-input>
      </el-form-item>
      <el-form-item label="商品介绍(图片)" prop="description">
          <UploadComponent v-on:success="getUploadDescription" :url="uploadUrl" :disabled="disabled"></UploadComponent>
          <div class="previewWrapper">
            <p><el-tag type="success" class="form-title">预览效果</el-tag></p>
            <img :src="form.description" alt="">
          </div>
      </el-form-item>
      <el-form-item  class="needvalidate previewPic" label="上传图片">
        <UploadComponent v-on:success="getUploadResponse" :url="uploadUrl" :disabled="disabled"></UploadComponent>
        <div class="previewWrapper">
          <p><el-tag type="success" class="form-title">预览效果</el-tag></p>
          <img :src="form.image_url" alt="">
        </div>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :disabled="editDisabled">确定修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UploadComponent from '../uploadComponent'
export default {
  name: 'ebasicInfo',
  data () {
    return {
      uploadUrl: '/goods/goods/uploadGoods',
      fileList: [],
      imgageUrl: '',
      disabled: false,
      editDisabled: false,
      rules: {
        goods_name: [
           { required: true, message: '请输入活动名称' }
        ],
        goods_price: [
           { required: true, message: '请输入价格，此项必填' }
        ],
        category_id: [
           { required: true, message: '请至少选择一项' }
        ],
        materiel_fee: [
           { required: true, message: '请输入价格，此项必填' }
        ],
        selling_point: [
           { required: true, message: '请输入商品标签，此项必填' }
        ],
        description: [
           { required: true, message: '请输入商品描述，此项必填' }
        ]
      }
    }
  },
  mounted () {
    this.getGoodsCategoryList()
  },
  computed: {
    ...mapState({
      categoryList: ({shopmodule}) => shopmodule.categoryList,
      form: ({shopmodule}) => shopmodule.goodDetail
    })
  },
  methods: {
    ...mapActions([
      'getGoodsCategoryList',
      'updateGoodInfo',
      'getGoodDetail'
    ]),
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let sendData = {
            data: this.initSearchData(),
            that: this
          }
          this.updateGoodInfo(sendData)
        } else {
          return false
        }
      })
    },
    initSearchData () {
      let data = {}
      data.goodsName = this.form.goods_name
      data.goodsPrice = this.form.goods_price
      data.categoryId = this.form.category_id
      data.sellingPoint = this.form.selling_point
      data.description = this.form.description
      data.materielFee = this.form.materiel_fee
      data.src = this.form.image_url
      data.goodsId = this.form.goods_id
      return data
    },
    getUploadResponse (response) {
      // console.log(response)
      this.form.src = response
      this.imageUrl = response
      this.form.image_url = response
      this.disabled = false
    },
    getUploadDescription (response) {
      this.form.description = response
    }
  },
  components: {
    UploadComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.edit-basicInfo{
  width: 80%;
  margin-left: 12%;
  .good-input{
    width: 230px;
  }
  .previewWrapper{
    width: auto;
    height: auto;
    p{
      font-size: 14px;
      color: #20A0FF;
      margin-bottom: 16px;
    }
    img{
      width: 300px;
      height: auto;
      max-height: 150px;
      border: none;
    }
  }
}
</style>
