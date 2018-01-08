<template>
  <div class="bannerF">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="基本信息"></el-form-item>
        <el-form-item label="名称" class="needvalidate">
          <el-input v-model="form.title" class="banner-input" required></el-input>
          <!-- <span style="color: red; margin-left: 6px;">*</span> -->
          <!-- <p class="form-tip" v-if="showNameTip">请输入名称</p> -->
        </el-form-item>
        <el-form-item label="操作类型">
          <el-input v-model="form.type_id" class="banner-input" placeholder="默认值为0"></el-input>
        </el-form-item>
        <el-form-item label="操作值">
          <el-input v-model="form.type_value" class="banner-input" placeholder="默认值为0"></el-input>
        </el-form-item>
        <el-form-item  class="needvalidate previewPic" label="上传图片">
            <UploadComponent v-on:success="getUploadResponse" :url="uploadUrl" :disabled="disabled"></UploadComponent>
        </el-form-item>
        <el-form-item label="绑定店铺" label-width="80px"></el-form-item>
        <el-form-item>
            <BindShop></BindShop>
        </el-form-item>
        <el-form-item label-width="80px">
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
        </el-form-item>
      </el-form>
      <div class="previewWrapper">
        <p>预览效果</p>
        <img :src="form.image_url" alt="">
      </div>
  </div>
</template>

<script>
import api from '../api/axios'
import utils from '../utils/utils'
import { mapState, mapActions } from 'vuex'
import BindShop from './editbindshop'
import UploadComponent from './uploadComponent'

export default {
  name: 'bannerForm',
  data () {
    return {
      uploadUrl: '/shop/banners/uploadBanner',
      disabled: false
    }
  },
  computed: {
    ...mapState({
      fileList: ({shopmodule}) => shopmodule.fileList,
      file: ({shopmodule}) => shopmodule.file,
      form: ({shopmodule}) => shopmodule.editData
    })
  },
  mounted () {
    let bannerId = this.$route.query.bannerId
    let data = {}
    data.bannerId = bannerId
    this.getBannerDetail(data)
  },
  methods: {
    ...mapActions([
      'getBannerDetail',
      'checkToUpdateBanner'
    ]),
    onSubmit () {
      this.$confirm('是否确认修改Banner详情？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消操作',
        type: 'warning'
      }).then(() => {
        let sendData = {}
        sendData.that = this
        sendData.data = this.initSearchData()
        this.checkToUpdateBanner(sendData)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    initSearchData () {
      let sendData = {}
      for (let i = 0; i < this.form.bind.length; i++) {
        if (typeof this.form.bind[i].deadline === 'number') {
          let time = utils.formatDate(new Date(this.form.bind[i].deadline))
          this.form.bind[i].deadline = time
        } else {
          let time = utils.formatDate(this.form.bind[i].deadline)
          this.form.bind[i].deadline = time
        }
      }
      sendData.bind = []
      for (let i = 0; i < this.form.bind.length; i++) {
        let obj = {shopId: '', deadline: '', sortBy: '', isShow: ''}
        obj.shopId = this.form.bind[i].shop_id
        obj.deadline = this.form.bind[i].deadline
        obj.sortBy = this.form.bind[i].sort_by
        obj.isShow = this.form.bind[i].is_show
        sendData.bind.push(obj)
      }
      sendData.bannerId = this.$route.query.bannerId
      sendData.typeId = this.form.type_id
      sendData.typeValue = this.form.type_value
      sendData.title = this.form.title
      sendData.src = this.form.image_url
      sendData.imageId = this.form.image_id
      return sendData
    },
    getUploadResponse (response) {
      this.form.image_url = response
      this.imageUrl = response
      this.disabled = false
      this.showPreviewFlag = true
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
