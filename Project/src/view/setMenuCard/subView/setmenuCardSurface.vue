<template>
  <div class="card-surface">
    <h4>卡面（最多5张，建议尺寸：宽572px，高：342px）</h4>
    <UploadComponentMuilt v-on:success="getUploadResponse" v-on:delete="deleteUploadImg" :url="uploadUrl" :maxLength="maxLength"></UploadComponentMuilt>
    <el-button type="primary" @click="saveCardSurface" v-if="showFlag" :disabled="savedDisabled" size="small" style="margin-top:30px;">创建卡面</el-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UploadComponentMuilt from '../../../components/uploadComponentMuilt'

export default {
  name: 'cardSurface',
  data () {
    return {
      uploadUrl: '/giftcard/giftcard/uploadGift',
      fileList: [],
      imageUrlArr: [],
      showFlag: false,
      savedDisabled: false,
      maxLength: 5
    }
  },
  computed: {
    ...mapState({
      categoryId: ({setMenu}) => setMenu.category_id
    })
  },
  methods: {
    ...mapActions([
      'createCardSurface'
    ]),
    saveCardSurface () {
      let sendData = {
        data: {
          categoryId: this.categoryId,
          urlList: this.imageUrlArr
        },
        that: this
      }
      console.log(sendData)
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
<style lang="less">
.card-surface{
  width: 80%;
  height: 100%;
  margin: 0 auto;
  h4 {
    font-size: 12px;
    color: #D3DCE6;
    margin-bottom: 30px;
  }
}
</style>
