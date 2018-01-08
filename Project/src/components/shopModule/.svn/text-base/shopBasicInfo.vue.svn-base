<template>
  <div class="basicInfo">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <div class="section-bind">
        <span class="wrapper-header" style="margin-bottom: 30px;">基本信息</span>
      </div>
      <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="form.goodsName" class="good-input" :disabled="dongDisabled"></el-input>
      </el-form-item>
      <el-form-item label="基本价格" prop="goodsPrice">
          <el-input v-model="form.goodsPrice" class="good-input" :disabled="dongDisabled">
              <template slot="append"> ￥</template>
          </el-input>
      </el-form-item>
      <el-form-item label="分　　类" prop="category_id">
          <el-select v-model="form.category_id" placeholder="请选择分类"　class="good-input" :disabled="dongDisabled">
              <el-option :value="item.category_id" :key="index" :label="item.category_name" v-for="(item, index) in categoryList"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="餐盒费" prop="materielFee">
          <el-input v-model="form.materielFee" class="good-input" :disabled="dongDisabled"></el-input>
      </el-form-item>
      <el-form-item label="商品标签" prop="sellingPoint">
          <el-input v-model="form.sellingPoint" class="good-input" :disabled="dongDisabled"></el-input>
      </el-form-item>
      <el-form-item label="商品介绍" prop="description">
          <UploadComponent v-on:success="getUploadDescription" :url="uploadUrl" :disabled="disabled"></UploadComponent>
          <!-- <el-input
            type="textarea"
            v-model="form.description"
            style="width: 320px;" :disabled="dongDisabled">
          </el-input> -->
      </el-form-item>
      <el-form-item  class="needvalidate previewPic" label="上传图片">
          <UploadComponent v-on:success="getUploadResponse" :url="uploadUrl" :disabled="disabled"></UploadComponent>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :disabled="successDisabled">立即创建</el-button>
      </el-form-item>
    </el-form>
    <div class="previewWrapper" v-if="showPreviewFlag === true">
      <p><el-tag type="success" class="form-title">预览效果</el-tag></p>
      <img :src="imgageUrl" alt="">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import api from '../../api/axios'
import UploadComponent from '../uploadComponent'
// import FormData from 'form-data'
export default {
  name: 'basicInfo',
  data () {
    return {
      uploadUrl: '/goods/goods/uploadGoods',
      form: {
        goodsName: '',
        goodsPrice: '',
        category_id: '',
        description: '',
        src: '',
        sellingPoint: '',
        materielFee: ''
      },
      fileList: [],
      showPreviewFlag: false,
      imgageUrl: '',
      disabled: false,
      dongDisabled: false,
      successDisabled: false,
      rules: {
        goodsName: [
           { required: true, message: '请输入活动名称' }
        ],
        goodsPrice: [
           { required: true, message: '请输入价格，此项必填' }
        ],
        category_id: [
           { required: true, message: '请至少选择一项' }
        ],
        materielFee: [
           { required: true, message: '请输入价格，此项必填' }
        ],
        sellingPoint: [
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
      categoryList: ({shopmodule}) => shopmodule.categoryList
    })
  },
  methods: {
    ...mapActions([
      'getGoodsCategoryList',
      'creatNewGood'
    ]),
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let sendData = {
            data: this.initSearchData(),
            that: this
          }
          this.creatNewGood(sendData)
        } else {
          return false
        }
      })
    },
    initSearchData () {
      let data = {}
      data.goodsName = this.form.goodsName
      data.goodsPrice = this.form.goodsPrice
      data.categoryId = this.form.category_id
      data.sellingPoint = this.form.sellingPoint
      data.description = this.form.description
      data.materielFee = this.form.materielFee
      data.src = this.form.src
      return data
    },
    getUploadResponse (response) {
      // console.log(response)
      this.form.src = response
      this.imageUrl = response
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
.basicInfo{
  width: 80%;
  margin-left: 12%;
}
</style>
