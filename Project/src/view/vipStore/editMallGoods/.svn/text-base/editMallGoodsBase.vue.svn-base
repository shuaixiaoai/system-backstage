<template>
  <div class="editMallGoodsBase">
  <!-- {{ mgoodDetail }} -->
    <el-form ref="mgoodDetail" :model="mgoodDetail" :rules="rules" label-width="100px">
      <el-form-item label="商品名称" prop="mgoods_name">
          <el-input v-model="mgoodDetail.mgoods_name" class="good-input" :disabled="dongDisabled"></el-input>
      </el-form-item>
      <el-form-item label="所需积分" prop="points">
          <el-input v-model="mgoodDetail.points" class="good-input" :disabled="dongDisabled">
          </el-input>
      </el-form-item>
      <el-form-item label="类别" prop="goods_type">
        <el-select v-model="mgoodDetail.goods_type" placeholder="请选择商品分类">
          <el-option label="实物" value="1"></el-option>
          <el-option label="虚拟票券" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品介绍" prop="description">
          <el-input
            type="textarea"
            v-model="mgoodDetail.description"
            style="width: 320px;" :disabled="dongDisabled">
          </el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" v-if="skipType === 'modify'" @click="submitForm('mgoodDetail')" :disabled="disabled">保存修改</el-button>
          <el-button type="primary" v-else @click="submitNext('mgoodDetail')" :disabled="disabled">下一步</el-button>
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
      disabled: false,
      dongDisabled: false,
      skipType: '',
      rules: {
        mgoods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        points: [
          { required: true, message: '请输入所需积分', trigger: 'blur' }
        ],
        goods_type: [
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写商品描述', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 拿缓存的mgoodsId判断,如果为-1则为新建商品,不为null则为修改商品
    let mgoodsId = utils.storage.getItem('mgoodsId')
    if (mgoodsId !== '-1') {
      console.log('修改')
      this.skipType = 'modify'
      let routerParams = {
        data: {
          mgoodsId: mgoodsId
        },
        that: this
      }
      this.getVipMallGoodsDetail(routerParams)
    } else {
      console.log('新建')
      this.skipType = 'addNew'
      this.mgoodDetail.mgoods_id = ''
      // 拿缓存addNewParams，如果是第一次进入新建则不存在，否则为修改新建的已填字段
      let addNewParams = JSON.parse(utils.storage.getItem('addNewParams'))
      if (!addNewParams) {
        this.mgoodDetail.mgoods_name = ''
        this.mgoodDetail.points = ''
        this.mgoodDetail.goods_type = '1'
        this.mgoodDetail.description = ''
      } else {
        this.mgoodDetail.mgoods_name = addNewParams.mgoodsName
        this.mgoodDetail.points = addNewParams.points
        this.mgoodDetail.goods_type = addNewParams.goodsType
        this.mgoodDetail.description = addNewParams.description
      }
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
      'getVipMallGoodsDetail'
    ]),
    initPostData () {
      let postData = {}
      postData.mgoodsId = this.mgoodDetail.mgoods_id
      postData.mgoodsName = this.mgoodDetail.mgoods_name
      postData.points = this.mgoodDetail.points
      postData.goodsType = this.mgoodDetail.goods_type
      postData.description = this.mgoodDetail.description
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
    submitNext (mgoodDetail) {
      this.$refs[mgoodDetail].validate((valid) => {
        if (valid) {
          let params = this.initPostData()
          console.log(params)
          // 设置新建商品的参数缓存
          utils.storage.setItem('addNewParams', JSON.stringify(params))
          this.$router.push({path: '/vipStore/editMallGoodsMainEntry/editMallGoodsImg'})
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
