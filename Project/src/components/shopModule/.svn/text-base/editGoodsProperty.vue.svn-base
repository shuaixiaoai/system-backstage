<template>
  <div class="property">

      <div class="owned-proterty">
          <div class="section-bind">
            <span class="wrapper-header">已有属性：</span>
          </div>
          <div class="owned-pro-item">
              <PropertyTb></PropertyTb>
          </div>
      </div>
      <div class="add-property">
          <div>
              <el-button type="primary" size="small" icon="plus" @click="addGoodsProperty" :disabled="allDisable">添加商品属性</el-button>
          </div>
          <div class="properties" v-if="this.addList.length>0">
              <!-- <div class="" v-if="addList.length === 0">
                  everybody follows me
              </div> -->
              <div class="property-item" v-for="(item, index) in addList">
                  <div class="item-des">
                      <label class="property-name"><span class="necessary">*</span>属性名: </label>
                      <p class="false-tip" v-if="show_spec_group_tip">属性名为必填项</p>
                      <el-input v-model="item.spec_group" placeholder="请输入内容" style="width: 200px;" :disabled="allDisable"></el-input>
                      <el-checkbox v-model="item.multiselect" class="item-des-chek" :disabled="allDisable">多选</el-checkbox>
                      <el-checkbox v-model="item.selectable" :disabled="allDisable">必选</el-checkbox>
                      <div class="operate">
                          <el-button type="primary" size="small" icon="plus" @click="addPropertiesValue(item)" :disabled="allDisable">增加属性值</el-button>
                          <el-button type="danger" size="small" icon="delete" @click="detePropertyItem(index, item)" :disabled="allDisable">删除</el-button>
                      </div>
                  </div>
                  <div class="item-property-value" v-for="(subItem, index) in item.spec_list">
                      <label class="property-name">
                          <span class="necessary">*</span>属性值:
                      </label>
                      <p class="false-tip" v-if="show_spec_tip">属性值为必填项</p>
                      <p class="false-tip-price" v-if="show_price_tip">价格为必填项</p>
                      <el-input placeholder="请输入内容" v-model="subItem.spec" class="value-inpur" size="small" :disabled="allDisable"></el-input>
                      <label class="property-name">
                          <span class="necessary">*</span>价格:
                      </label>
                      <el-input placeholder="请输入内容" v-model="subItem.price" class="value-inpur" size="small" :disabled="allDisable"></el-input>
                      <label class="property-name">排序: </label><el-input placeholder="默认值为0" v-model="subItem.sort_by" class="value-inpur" size="small" :disabled="allDisable"></el-input>
                      <el-checkbox v-model="subItem.default1" :disabled="allDisable">是否默认</el-checkbox>
                  </div>
              </div>
          </div>
          <el-button type="primary" @click="submitForm()" class="btn-create" :disabled="allDisable">确认修改</el-button>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PropertyTb from '../ShopMdTable/edithasPropertyTable'
import utils from '../../utils/utils'
export default {
  name: 'eproperty',
  data () {
    return {
      checked1: false,
      checked2: false,
      allDisable: false,
      show_spec_group_tip: false,
      show_spec_tip: false,
      show_price_tip: false,
      seletedGroupsid: [],
      addList: [
      ]
    }
  },
  mounted () {
    let goodDetail = JSON.parse(utils.storage.getItem('goodDetailForEdit'))
    this.goodsId = goodDetail.goods_id
  },
  computed: {
    ...mapState({
      multipPropertiesleSelection: ({shopmodule}) => shopmodule.multipPropertiesleSelection
    })
  },
  methods: {
    ...mapActions([
      'getPropertiesList',
      'updateGoodProperty'
    ]),
    submitForm () {
      let validate = false
      if (this.addList.length === 0) {
        validate = true
      } else {
        for (let i = 0; i < this.addList.length; i++) {
          if (this.addList[i].spec_group === '') {
            this.$message.error('属性名为必填项！')
            return
          } else {
            for (let j = 0; j < this.addList[i].spec_list.length; j++) {
              if (this.addList[i].spec_list[j].spec === '') {
                this.$message.error('属性值为必填项！')
                return
              }
              if (this.addList[i].spec_list[j].price === '') {
                this.$message.error('价格为必填项！')
                return
              } else if (!utils.isNum(this.addList[i].spec_list[j].price)) {
                this.$message.error('价格必须是数值！')
                return
              }
            }
          }
          validate = true
        }
      }
      if (validate) {
        let sendData = {
          data: this.initPostData(),
          that: this
        }
        console.log(sendData)
        this.updateGoodProperty(sendData)
      }
    },
    initPostData () {
      let sendData = {}
      sendData.addList = JSON.parse(JSON.stringify(this.addList))
      for (let i = 0; i < this.addList.length; i++) {
        sendData.addList[i].multiselect = this.addList[i].multiselect === true ? 1 : 0
        sendData.addList[i].selectable = this.addList[i].selectable === true ? 1 : 0
        for (let j = 0; j < this.addList[i].spec_list.length; j++) {
          sendData.addList[i].spec_list[j].default1 = this.addList[i].spec_list[j].default1 === true ? 1 : 0
          sendData.addList[i].spec_list[j].sortBy = this.addList[i].spec_list[j].sort_by
        }
        sendData.addList[i].specList = sendData.addList[i].spec_list
        delete sendData.addList[i].spec_list
        sendData.addList[i].specGroup = this.addList[i].spec_group
      }
      sendData.groupIds = []
      for (let i = 0; i < this.multipPropertiesleSelection.length; i++) {
        sendData.groupIds.push(parseInt(this.multipPropertiesleSelection[i].group_id))
      }
      // sendData.groupIds = sendData.groupIds.concat(this.seletedGroupsid)
      sendData.goodsId = parseInt(this.goodsId)
      return sendData
    },
    addGoodsProperty () {
      let goodsProperty = {
        spec_group: '',
        selectable: false,
        multiselect: false,
        spec_list: [
          {
            spec: '',
            price: '',
            default1: 1,
            sort_by: 0
          }
        ]
      }
      this.addList.push(goodsProperty)
    },
    addPropertiesValue (item) {
      item.spec_list.push({spec: '', price: '', default1: '1', sort_by: 0})
    },
    detePropertyItem (index, item) {
      this.addList.splice(index, 1)
    }
  },
  components: {
    PropertyTb
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.property {
  .owned-proterty{
    width: 100%;
    padding-left: 12%;
    padding-right: 12%;
    height: auto;
    padding-bottom: 32px;
    border-bottom: 1px solid #eaeefb;
    .owned-pro-item{
      margin-top: 16px;
    }
  }
  .add-property{
    width: 100%;
    padding-left: 12%;
    padding-right: 12%;
    height: auto;
    margin-top: 32px;
    padding-bottom: 32px;
    .btn-create {
      margin-top: 16px;
    }
    .properties{
      width: 100%;
      min-width: 760px;
      margin-top: 16px;
      border: 1px solid #eaeefb;
      border-radius: 4px;
      .property-item{
        margin-bottom: 16px;
        padding: 16px;
        background: #f9fafc;
        &:last-child {
          margin-bottom: 0;
        }
        .item-des{
          position: relative;
          .property-name{
            position: relative;
            font-size: 14px;
            color: #1f2d3d;
            padding-right: 5px;
          }
          .false-tip{
            position: absolute;
            top: 38px;
            left: 64px;
            color: red;
            font-size: 12px;
          }
          .item-des-chek{
            margin-left: 16px;
            margin-right: 16px;
          }
          .operate{
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        .item-property-value{
          position: relative;
          width: 100%;
          height: auto;
          padding: 20px 12px;
          margin-top: 22px;
          border: 1px solid #ccc;
          border-radius: 4px;
          .property-name{
            position: relative;
            font-size: 14px;
            color: #1f2d3d;
            padding-right: 5px;
          }
          .false-tip {
            position: absolute;
            top: 51px;
            left: 76px;
            color: red;
            font-size: 12px;
          }
          .false-tip-price{
            position: absolute;
            top: 51px;
            left: 275px;
            color: red;
            font-size: 12px;
          }
          .value-inpur{
            width: 130px;
            margin-right: 16px;
          }
        }
      }
      .necessary{
        color: red;
        margin-right: 4px;
      }
    }
  }
}
</style>
