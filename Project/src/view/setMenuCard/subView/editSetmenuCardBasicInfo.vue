<template>
  <div class="basicInfo">
    <el-form label-width="110px" :model="form" ref="form">
        <el-form-item label="主题名称" required>
          <el-input v-model="form.category_title" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="修改上传图片" required>
          <UploadComponent v-on:success="getUploadResponse" :url="uploadUrl" :disabled="disabled"></UploadComponent>
        </el-form-item>
        <el-form-item label="截止时间：" required>
            <el-col :span="8">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.end_time" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="主题状态" required>
            <el-radio-group v-model="form.category_status">
                <el-radio label="1">上架</el-radio>
                <el-radio label="0">下架</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" :disabled="successDisable">确认修改</el-button>
        </el-form-item>
        <div class="previewWrapper">
          <p><el-tag type="success" class="form-title">预览效果</el-tag></p>
          <img :src="form.background_url" alt="">
        </div>
    </el-form>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import utils from '../../../utils/utils'
  import UploadComponent from '../../../components/uploadComponent'

  export default {
    name: 'basicInfo',
    data () {
      return {
        fileList: [],
        dialogImageUrl: '',
        successDisable: false,
        disabled: false,
        uploadUrl: '/giftcard/giftcard/uploadGift'
      }
    },
    mounted () {
      let categoryId = utils.storage.getItem('categoryId')
      console.log(categoryId)
      let sendData = {
        data: {
          categoryId: utils.storage.getItem('categoryId')
        },
        that: this
      }
      this.getThemeDetail(sendData)
    },
    computed: {
      ...mapState({
        form: ({setMenu}) => setMenu.themeDetail,
        endTime: ({setMenu}) => setMenu.themeDetail.end_time * 1000,
        imageUrl: ({setMenu}) => setMenu.themeDetail.background_url
      })
    },
    methods: {
      ...mapActions([
        'getThemeDetail',
        'updateCategory'
      ]),
      getUploadResponse (response) {
        this.imageUrl = response
        this.form.background_url = response
      },
      onSubmit () {
        if (this.form.category_title === '') {
          this.$message.error('请填写主题名称！')
        } else {
          if (this.form.end_time === undefined) {
            this.$message.error('请选择时间！')
          } else {
            let sendData = {
              data: {
                categoryTitle: this.form.category_title,
                categoryStatus: this.form.category_status,
                url: this.form.background_url,
                endTime: utils.formatDate(new Date(this.form.end_time)),
                categoryId: this.$route.query.category_id
              },
              that: this
            }
            // console.log(sendData)
            this.updateCategory(sendData)
          }
        }
      }
    },
    components: {
      UploadComponent
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.basicInfo{
  width: 500px;
  height: 100%;
  margin-left: 15%;
  position: relative;
  .upload-component {
    .el-upload {
      width: 178px;
      height: auto;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      img{
        width: 178px;
        height: auto;
      }
      &:hover{
        border-color: #20a0ff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
    }
  }
  .showTip{
    font-size: 12px;
    color: red;
  }
  .previewWrapper{
    position: absolute;
    top: 0;
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
  }
}
</style>
