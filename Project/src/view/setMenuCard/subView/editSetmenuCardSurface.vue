<template>
  <div class="edit-card-surface">
    <h4>卡面（最多5张，建议尺寸：宽572px，高：342px）</h4>
    <div class="choosed-surface">
        <p>该主题已选卡面：</p>
        <span class="avatar-binded-list" v-for="(item, index) in chooseImages" :key="index">
          <img :src="item.image_url" alt="">
          <div class="icon-false" @click="deleteChoosedPic(item, index)"><i class="el-icon-close"></i></div>
        </span>
        <p class="notice"><span>上传图片须知：</span>卡面最多5张，请确保已选卡面与即选择上传图片小于等于5张，若需要选择其他图片，请先删除再继续操作！</p>
    </div>
    <UploadComponentMuilt v-on:success="getUploadResponse" v-on:delete="deleteUploadImg" :url="uploadUrl" :maxLength="maxLength"></UploadComponentMuilt>
    <el-button type="primary" @click="saveCardSurface" v-if="showFlag" :disabled="savedDisabled" style="margin-top: 30px;">确认修改</el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import utils from '../../../utils/utils'
import api from '../../../api/axios'
import UploadComponentMuilt from '../../../components/uploadComponentMuilt'

export default {
  name: 'cardSurface',
  data () {
    return {
      fileList: [],
      imageUrlArr: [],
      showFlag: false,
      savedDisabled: false,
      uploadUrl: '/giftcard/giftcard/uploadGift',
      maxLength: 1
    }
  },
  mounted () {
    this.initPage()
    // console.log(this.themeDetail)
  },
  computed: {
    ...mapState({
      categoryId: ({setMenu}) => setMenu.themeDetail.category_id,
      chooseImages: ({setMenu}) => setMenu.themeDetail.itmes
    })
  },
  methods: {
    ...mapActions([
      'createCardSurface',
      'getThemeDetail',
      'deleteSurface'
    ]),
    initPage () {
      let categoryId = utils.storage.getItem('categoryId')
      let sendData = {
        data: {
          categoryId: utils.storage.getItem('categoryId')
        },
        that: this,
        type: 'edit'
      }
      this.getThemeDetail(sendData)
    },
    deleteChoosedPic (item, index) {
      console.log(index)
      let data = {
        categoryId: this.categoryId,
        bkId: item.bk_id
      }
      api.deleteSurface(data).then(({data}) => {
        if (data.code === 0) {
          this.chooseImages.splice(index, 1)
          this.initPage()
        }
      })
      // this.chooseImages.splice(index, 1)
      // console.log(this.chooseImages.length)
    },
    saveCardSurface () {
      let sendData = {
        data: {
          categoryId: this.categoryId,
          urlList: this.imageUrlArr
        },
        that: this
      }
      this.savedDisabled = true
      this.createCardSurface(sendData)
    },
    getUploadResponse (response) {
      this.imageUrlArr.push(response)
      this.showFlag = true
    },
    deleteUploadImg (index) {
      this.imageUrlArr.splice(index, 1)
    }
  },
  components: {
    UploadComponentMuilt
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.edit-card-surface{
  width:80%;
  height: 100%;
  margin: 0 auto;
  h4 {
    font-size: 12px;
    color: #D3DCE6;
  }
  .upload-demo {
    margin: 20px auto 16px auto;
  }
  .el-upload-list--picture .el-upload-list__item{
    width: 60%;
  }
  .choosed-surface{
    width: 100%;
    height: auto;
    p{
      font-size: 14px;
      font-weight: bold;
      color: #333;
      margin: 16px 0;
    }
    .avatar-binded-list{
      position: relative;
      display: inline-block;
      width: 178px;
      height: auto;
      overflow: hidden;
      border-radius: 4px;
      border: 1px dashed #d9d9d9;
      margin-left: 6px;
      .icon-false{
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #f1f1f1;
        border: 1px dashed #999;
        font-size: 12px;
        text-align: center;
        color: #666;
        cursor: pointer;
      }
      img {
        width: 178px;
        height: auto;
      }
    }
    p.notice{
      font-size: 12px;
      color: #666;
      span {
        font-weight: bold;
      }
    }
  }
}
</style>
