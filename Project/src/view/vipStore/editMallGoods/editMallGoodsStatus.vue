<template>
  <div class="editMallGoodsBase">
  <!-- {{mgoodDetail}} -->
    <el-form ref="mgoodDetail" :model="mgoodDetail" :rules="rules" label-width="100px">
      <el-form-item label="设置库存" prop="storage">
          <el-input v-model="mgoodDetail.storage" class="good-input" :disabled="dongDisabled"></el-input>
      </el-form-item>
      <el-form-item label="每次兑换限制" prop="is_limit">
        <el-switch
          v-model="mgoodDetail.is_limit"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="1"
          off-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="限制数量" prop="limit_num">
          <el-input v-if="mgoodDetail.is_limit === '0'" v-model="mgoodDetail.limit_num" class="good-input" :disabled="true">
          </el-input>
          <el-input v-else v-model="mgoodDetail.limit_num" class="good-input" :disabled="false">
          </el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
          <el-switch
          v-model="mgoodDetail.status"
          on-color="#13ce66"
          off-color="#ff4949"
          on-value="1"
          off-value="0"
          on-text="上线"
          off-text="下线">
        </el-switch>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" v-if="skipType === 'modify'" @click="submitForm('mgoodDetail')" :disabled="disabled">保存修改</el-button>
          <el-button type="primary" v-else @click="submitAddNew('mgoodDetail')" :disabled="disabled">提交新建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import utils from '../../../utils/utils'
import URL from '../../../utils/baseURL'

export default {
  name: 'editMallGoodsBase',
  data () {
    return {
      skipType: '',
      disabled: false,
      dongDisabled: false,
      limitDisabled: false,
      switchLimit: false,
      rules: {
        storage: [
          { required: true, message: '请输入库存量', trigger: 'blur' }
        ],
        limit_num: [
          { required: true, message: '请输入限制数量', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    let mgoodsId = utils.storage.getItem('mgoodsId')
    if (mgoodsId !== '-1') {
      this.skipType = 'modify'
      let routerParams = {
        data: {
          mgoodsId: mgoodsId
        },
        that: this
      }
      this.getVipMallGoodsDetail(routerParams)
    } else {
      this.skipType = 'addNew'
      this.mgoodDetail.mgoods_id = ''
      this.mgoodDetail.storage = ''
      this.mgoodDetail.is_limit = '0'
      this.mgoodDetail.limit_num = '0'
      this.mgoodDetail.status = '1'
    }
  },
  // 计算属性,获取vuex数据
  computed: {
    ...mapState({
      mgoodDetail: ({vipMallGoods}) => vipMallGoods.mallGoodsDetail
    })
  },
  methods: {
    ...mapActions([
      'modifyMallGoods',
      'getVipMallGoodsDetail',
      'addNewMallGoods'
    ]),
    initPostData () {
      let postData = {}
      postData.mgoodsId = this.mgoodDetail.mgoods_id
      postData.storage = this.mgoodDetail.storage
      postData.isLimit = this.mgoodDetail.is_limit
      postData.limitNum = this.mgoodDetail.limit_num
      postData.status = this.mgoodDetail.status
      return postData
    },
    submitForm (mgoodDetail) {
      this.$refs[mgoodDetail].validate((valid) => {
        if (valid) {
          let postData = {
            data: this.initPostData(),
            that: this
          }
          this.modifyMallGoods(postData)
        } else {
          return false
        }
      })
    },
    submitAddNew (mgoodDetail) {
      this.$refs[mgoodDetail].validate((valid) => {
        if (valid) {
          let postData = {
            data: this.initPostData(),
            that: this
          }
          // 拿缓存addNewParams，如果是第一次进入新建则不存在，否则为修改新建的已填字段
          let addNewParams = JSON.parse(utils.storage.getItem('addNewParams'))
          let params = {}
          Object.assign(postData.data, addNewParams)
          delete postData.data.mgoodsId
          console.log(postData)
          this.addNewMallGoods(postData)
        } else {
          return false
        }
      })
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.editMallGoodsBase{
    width: 40%;
    height: auto;
    margin-left: 12%;
    margin-top: 50px;
}


</style>
