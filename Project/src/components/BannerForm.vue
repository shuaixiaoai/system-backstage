<template>
  <div class="bannerF">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="基本信息"></el-form-item>
        <el-form-item label="名称" class="needvalidate">
          <el-input v-model="form.name" class="banner-input" required @change="hideTip"></el-input><span style="color: red; margin-left: 6px;">*</span>
          <p class="form-tip" v-if="showNameTip">请输入名称</p>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-input v-model="form.typeId" class="banner-input" placeholder="默认值为0"></el-input>
        </el-form-item>
        <el-form-item label="操作值">
          <el-input v-model="form.typeValue" class="banner-input" placeholder="默认值为0"></el-input>
        </el-form-item>
        <el-form-item  class="needvalidate previewPic" label="上传图片">
          <UploadComponent v-on:success="getUploadResponse" :url="uploadUrl"></UploadComponent>
        </el-form-item>
        <el-form-item label="绑定店铺" label-width="80px"></el-form-item>
        <el-form-item>
            <BindShop></BindShop>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="onSubmit" :disabled="disabled">立即创建</el-button>
          <div class="uploadTip" v-if="disabled">请完成基本信息必选项</div>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </el-form>
      <div class="previewWrapper" v-if="showPreviewFlag === true">
        <p>预览效果</p>
        <img :src="form.src" alt="">
      </div>
  </div>
</template>

<script>
import api from '../api/axios'
import utils from '../utils/utils'
import { mapState, mapActions } from 'vuex'
import BindShop from './bindshop'
import UploadComponent from './uploadComponent'

export default {
  name: 'bannerForm',
  props: {
    type: {
      type: String,
      default: 'add'
    }
  },
  data () {
    return {
      uploadUrl: '/shop/banners/uploadBanner',
      disabled: true,
      showNameTip: false,
      showUploadImgTip: false,
      showPreviewFlag: false,
      imageUrl: ''
    }
  },
  computed: {
    ...mapState({
      // disabled: ({shopmodule}) => shopmodule.disabled,
      fileList: ({shopmodule}) => shopmodule.fileList,
      file: ({shopmodule}) => shopmodule.file,
      // imageUrl: ({shopmodule}) => shopmodule.imageUrl,
      // showPreviewFlag: ({shopmodule}) => shopmodule.showPreviewFlag,
      form: ({shopmodule}) => shopmodule.form,
      options: ({shopmodule}) => shopmodule.options,
      value: ({shopmodule}) => shopmodule.value,
      bindArr: ({shopmodule}) => shopmodule.bindArr
      // searchTime: ({statistic}) => statistic.searchTime,
      // statistic: ({statistic}) => statistic.goodsSalesData
    })
  },
  methods: {
    ...mapActions([
      'createNewBanner'
    ]),
    onSubmit () {
      let data = this.initSearchData()
      let sendData = {}
      sendData.data = data
      sendData.that = this
      // console.log(sendData)
      this.createNewBanner(sendData)
    },
    initSearchData () {
      let sendData = {}
      if (this.form.name === '') {
        this.showNameTip = true
      } else if (this.form.src === '') {
        this.showUploadImgTip = true
        this.disabled = false
      } else {
        this.disabled = false
        sendData.title = this.form.name
        sendData.typeId = this.form.typeId === '' ? 0 : this.form.typeId
        sendData.typeValue = this.form.typeValue === '' ? 0 : this.form.typeValue
        sendData.src = this.form.src
        let arrData = this.bindArr.slice()
        for (let i = 0; i <= arrData.length - 1; i++) {
          if (arrData[i].deadline === '') {
            arrData[i].deadline = ''
          } else {
            let postTime = utils.formatDate(arrData[i].deadline)
            arrData[i].deadline = postTime
          }
        }
        sendData.bind = arrData
        return sendData
      }
    },
    getUploadResponse (response) {
      // console.log(response)
      this.form.src = response
      this.imageUrl = response
      this.disabled = false
      this.showPreviewFlag = true
    },
    hideTip () {
      this.showNameTip = false
    }
  },
  components: {
    BindShop,
    UploadComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.banner-input {
  width: 230px;
}
.previewPic {
  padding-right: 30px
}
.uploadTip{
  font-size: 12px;
  color: #8391a5;
}
.form-tip {
  position: absolute;
  top: 28px;
  left: 0;
  font-size: 10px;
  color: red;
}
.previewPic .form-tip {
  top: 25px;
}
.needvalidate {
  position: relative;
}
.previewWrapper{
  position: absolute;
  top: 80px;
  left: 500px;
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
  .bind-shop {
    padding-top: 16px;
    border-top: 1px dashed #333;
  }
}
</style>
