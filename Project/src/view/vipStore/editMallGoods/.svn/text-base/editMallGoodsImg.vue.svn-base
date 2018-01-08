<template>
  <div class="editMallGoodsImg">
  <!-- {{mgoodDetail}} -->
    <el-form ref="mgoodDetail" :model="mgoodDetail" :rules="rules" label-width="100px">
      <el-form-item v-if="showPreviewFlag === true">
        <div class="previewWrapper">
          <p><el-tag type="success" class="form-title">预览效果</el-tag></p>
          <img :src="mgoodDetail.image_url" alt="">
        </div>
      </el-form-item>
      <el-form-item  class="needvalidate previewPic" label="上传图片">
          <UploadComponent v-on:success="getUploadResponse" :url="uploadUrl" :disabled="disabled"></UploadComponent>
        <!-- <el-upload
            class="upload-demo"
            ref="upload"
            action="http://admin.tovof.com/goods/goods/uploadGoods"
            :multiple = "false"
            :on-change = "modifyImage"
            :on-success = "uploadSuccess"
            :on-error = "uploadFailed"
            :auto-upload="false"
            :on-remove="handleRemove"
            list-type="picture">
            <el-button slot="trigger" size="small" type="primary" :disabled="dongDisabled">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->
      </el-form-item>
      <el-form-item>
          <el-button type="primary" v-if="skipType === 'modify'" @click="submitUpload()" :disabled="disabled">保存修改</el-button>
          <el-button type="primary" v-else @click="submitNext()" :disabled="disabled">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import utils from '../../../utils/utils'
import URL from '../../../utils/baseURL'
import UploadComponent from '../../../components/uploadComponent'

export default {
  name: 'editMallGoodsImg',
  data () {
    return {
      skipType: '',
      showPreviewFlag: false,
      dongDisabled: false,
      disabled: false,
      success: false,
      src: '',
      uploadUrl: '/goods/goods/uploadGoods',
      rules: {
        mgoods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let mgoodsId = utils.storage.getItem('mgoodsId')
    if (mgoodsId !== '-1') {
      this.skipType = 'modify'
      let params = {
        data: {
          mgoodsId: mgoodsId
        },
        that: this
      }
      this.getVipMallGoodsDetail(params)
      if (this.mgoodDetail.image_url) {
        this.showPreviewFlag = true
      }
    } else {
      this.skipType = 'addNew'
      this.mgoodDetail.mgoods_id = ''
      // 拿缓存addNewParams，如果是第一次进入新建则不存在，否则为修改新建的已填字段
      let addNewParams = JSON.parse(utils.storage.getItem('addNewParams'))
      console.log(addNewParams)
      if (!addNewParams || !addNewParams.src) {
        this.showPreviewFlag = false
        this.mgoodDetail.image_url = ''
      } else {
        this.showPreviewFlag = true
        this.mgoodDetail.image_url = addNewParams.src
      }
    }
  },
  computed: {
    ...mapState({
      mgoodDetail: ({vipMallGoods}) => vipMallGoods.mallGoodsDetail
    })
  },
  methods: {
    ...mapActions([
      'modifyMallGoods',
      'getVipMallGoodsDetail'
    ]),
    submitUpload () {
      let params = {
        data: {
          mgoodsId: this.mgoodDetail.mgoods_id,
          src: this.src
        },
        that: this
      }
      // console.log(params)
      this.modifyMallGoods(params)
    },
    submitNext () {
      let addNewParams = JSON.parse(utils.storage.getItem('addNewParams'))
      if (this.success) {
        this.$router.push({path: '/vipStore/editMallGoodsMainEntry/editMallGoodsStatus'})
      }
    },
    getUploadResponse (response) {
      // 如果跳转是修改则进行修改，否则跳转下一步
      if (this.skipType === 'modify') {
        this.src = response
      } else {
        let params = JSON.parse(utils.storage.getItem('addNewParams'))
        console.log(params)
        params.src = response
        // 添加图片地址重新设置缓存
        utils.storage.setItem('addNewParams', JSON.stringify(params))
        this.success = true
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
.editMallGoodsImg {
  width: 50%;
  margin-left: 12%;
  margin-top: 50px;
  .previewWrapper img{
    width: 150px;
    height: 150px;
  }
}

</style>
