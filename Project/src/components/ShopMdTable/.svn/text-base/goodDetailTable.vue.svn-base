<template>
  <div class="goodDTable">
      <table>
          <tr>
              <td>项目</td>
              <td>值</td>
              <td>其他</td>
          </tr>
          <tr>
              <td>商品名称</td>
              <td>{{goodDetail.goods_name}}</td>
              <td></td>
          </tr>
          <!-- <tr>
              <td>商品ID</td>
              <td>{{goodDetail.goods_id}}</td>
              <td></td>
          </tr> -->
          <tr>
              <td>商品描述</td>
              <!-- <td>{{goodDetail.description}}</td> -->
              <td><img :src="goodDetail.description" alt="" class="detail-img"></td>
              <td></td>
          </tr>
          <tr>
              <td>商品卖点</td>
              <td>{{goodDetail.selling_point}}</td>
              <td></td>
          </tr>
          <tr>
          <tr>
              <td>图片存储地址</td>
              <td>
                {{goodDetail.image_url}}
                <div>
                  <img :src="goodDetail.image_url" alt="" class="detail-img">
                </div>
              </td>
              <td></td>
          </tr>

          <tr>
            <td>商品价格</td>
            <td>{{goodDetail.goods_price}}</td>
            <td></td>
          </tr>
          <tr>
            <td>商品折扣</td>
            <td>{{goodDetail.goods_discount}}</td>
            <td></td>
          </tr>
          <tr>
            <td>餐盒费</td>
            <td>{{goodDetail.materiel_fee}}</td>
            <td></td>
          </tr>
          <tr>
            <td>商品属性列表</td>
            <td>
                <div class="" v-for="item in goodDetail.specs" class="lists">
                    <div class="inline-block spec-group-name">{{item.spec_group}}</div>
                    <div class="inline-block">
                        <span v-if="item.multiselect === 1">多选</span>
                        <span v-else>非多选</span>　　
                        <span v-if="item.selectable === 1"　class="select-state">必选</span>
                        <span v-else class="select-state">非必选</span>
                    </div>
                    <div class="inline-block">
                      <div class="pro-value" v-for="v_item in item.spec_list">
                          <span>{{v_item.spec}}</span>
                          <span>{{v_item.price}}</span>
                      </div>
                    </div>
                </div>
            </td>
            <td></td>
          </tr>
          <tr>
              <td>商品店铺绑定列表</td>
              <td>
                  <div class="" v-for="item in goodDetail.shops" class="lists">
                      <div class="inline-block shop-name">
                        {{item.shop_name}}
                      </div>
                      <div class="inline-block">
                          <span v-if="item.goods_status == 1">上架</span>
                          <span v-else>下架</span>
                      </div>
                      <div class="inline-block recommend-state">
                          <span v-if="item.goods_commend == 1">推荐</span>
                          <span v-else>不推荐</span>
                      </div>
                      <div class="inline-block storage-state">
                          {{item.storage}}
                      </div>
                  </div>
              </td>
              <td></td>
          </tr>
      </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import api from '../../api/axios'

export default {
  name: 'goodDTable',
  data () {
    return {
      // tableData: []
      // multipPropertiesleSelection: []
    }
  },
  mounted () {
    let sendData = {
      data: {
        goodsId: this.$route.query.goodsId
      },
      that: this
    }
    this.getGoodDetail(sendData)
  },
  computed: {
    ...mapState({
      goodDetail: ({shopmodule}) => shopmodule.goodDetail
      // multipPropertiesleSelection: ({shopmodule}) => shopmodule.multipPropertiesleSelection
    })
  },
  methods: {
    ...mapActions([
      'getGoodDetail'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.goodDTable{
  width: 100%;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 80px;
  border: 1px solid #dfe6ec;
  border-radius: 4px;
  font-size: 12px;
  table{
    width: 100%;
    text-align: center;

    tr, th{
      width: 100%;
      background: #fff;
    }
    td{
      border: 1px solid #dfe6ec;
      height: auto;
      padding: 10px 30px;
      &:nth-child(1) {
        width: 140px;
      }
      &:nth-child(2) {
        width: 400px;
        padding-left: 30px;
        text-align: left;
      }
      .detail-img{
        width: 650px;
        height: 220px;
      }
      .lists {
        border: 1px solid #ccc;
        padding: 4px;
        margin: 2px auto;
        background: #eee;
        .shop-name {
          padding: 0 16px;
          margin-right: 10px;
        }
        .recommend-state {
          margin: 0 10px;
        }
        .storage-state, .select-state{
          margin-left: 10px;
        }
      }
    }
    .inline-block{
      display: inline-block;
      vertical-align: middle;
    }
    .spec-group-name{
      width: 80px;
      text-align: center;
    }
    .pro-value{
      width: auto;
      padding: 4px 10px;
      background: #EFF2F7;
      border: 1px solid #8492A6;
      vertical-align: top;
      margin-left: 12px;
      margin-bottom: 4px;
      border-radius: 2px;
    }
  }
}
</style>
