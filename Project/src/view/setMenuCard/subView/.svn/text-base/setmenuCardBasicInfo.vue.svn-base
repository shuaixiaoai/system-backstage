<template>
  <div class="basicInfo">
    <el-form label-width="110px" :model="form" :rules="rules" ref="form">
        <el-form-item label="主题名称" prop="name">
          <el-input v-model="form.name" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="上传主题封面" required prop="imageUrl">
            <UploadComponent v-on:success="getUploadResponse" :url="uploadUrl" :disabled="disabled"></UploadComponent>
        </el-form-item>
        <el-form-item label="截止时间：" required>
            <el-col :span="8">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="主题状态">
            <el-radio-group v-model="form.state">
                <el-radio label="1">上架</el-radio>
                <el-radio label="0">下架</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')" :disabled="successDisable">立即创建</el-button>
        </el-form-item>
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
        uploadUrl: '/giftcard/giftcard/uploadGift',
        form: {
          name: '',
          state: '1',
          type: '',
          date1: '',
          date2: '',
          imageUrl: ''
        },
        imageUrl: '',
        dialogImageUrl: '',
        uncheckFlag: true,
        dialogVisible: false,
        successDisable: false,
        disabled: false,
        rules: {
          name: [
            { required: true, message: '请输入活动名称,此项必填', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          imageUrl: [
            { required: true, message: '此项必选', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'createTheme'
      ]),
      getUploadResponse (response) {
        this.form.imageUrl = response
        this.imageUrl = response
        this.disabled = false
      },
      onSubmit (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let sendData = {
              data: {
                categoryTitle: this.form.name,
                categoryStatus: this.form.state,
                url: this.imageUrl,
                endTime: utils.formatDate(this.form.date1)
              },
              that: this
            }
            // console.log(sendData)
            this.createTheme(sendData)
          } else {
            // console.log('error submit!!')
            return false
          }
        })
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
  width: auto;
  height: 100%;
  margin: 0 100px;
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
}
</style>
