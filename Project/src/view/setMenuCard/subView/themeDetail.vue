<template>
  <div class="theme-detail">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>套餐卡管理</el-breadcrumb-item>
            <el-breadcrumb-item>主题列表</el-breadcrumb-item>
            <el-breadcrumb-item>主题详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="them-detail">
        <div class="table-header">
            <h3>主题详情</h3>
        </div>
        <div class="table-panel">
            <table class="table-detail">
              <tbody>
                  <tr>
                      <td class="item-name">背景分类ID</td>
                      <td>{{themeDetail.category_id}}</td>
                  </tr>
                  <tr>
                      <td class="item-name">背景分类标题</td>
                      <td>{{themeDetail.category_title}}</td>
                  </tr>

                  <tr>
                      <td class="item-name">创建时间</td>
                      <td>{{themeDetail.create_time}}</td>
                  </tr>
                  <tr>
                      <td class="item-name">封面图片</td>
                      <td>{{themeDetail.background_url}}</td>
                  </tr>
                  <tr>
                      <td class="item-name">状态</td>
                      <td v-if="themeDetail.category_status == 0">下架</td>
                      <td v-if="themeDetail.category_status == 1">上架</td>
                  </tr>
                  <tr>
                      <td class="item-name">结束时间</td>
                      <td>{{themeDetail.end_time}}</td>
                  </tr>
                  <!-- <tr>
                      <td class="item-name">订单状态</td>
                      <td v-if="themeDetail.order_status == 0">已取消</td>
                      <td v-if="themeDetail.order_status == 10">未付款</td>
                      <td v-if="themeDetail.order_status == 20">已支付</td>
                      <td v-if="themeDetail.order_status == 30">已确认</td>
                      <td v-if="themeDetail.order_status == 40">已确认</td>
                      <td v-if="themeDetail.order_status == 50">已送达</td>
                      <td v-if="themeDetail.order_status == 60">已送达</td>
                  </tr> -->
                  <tr>
                      <td class="item-name">背景列表</td>
                      <td>
                          <div class="goods-list" v-for="item in themeDetail.itmes">
                              <span>背景ID:  {{item.bk_id}}</span>
                              <span>主题ID:  {{item.category_id}}</span>
                              <span>创建时间:  {{item.create_time}}</span> <br>
                              <span>背景图片地址:  {{item.image_url}}</span>

                          </div>
                      </td>
                  </tr>
              </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import api from '../../../utils/utils'
export default {
  name: 'themeDetail',
  data () {
    return {
    }
  },
  mounted () {
    let categoryId = this.$route.query.categoryId
    let sendData = {
      data: {
        categoryId: this.$route.query.categoryId
      },
      that: this
    }
    this.getThemeDetail(sendData)
  },
  computed: {
    ...mapState({
      themeDetail: ({setMenu}) => setMenu.themeDetail
    })
  },
  methods: {
    ...mapActions([
      'getThemeDetail'
    ])
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.theme-detail{
  width: 100%;
  height: 100%;
  .them-detail {
    padding: 16px 10%;
    .table-header{
      h3 {
        font-size: 24px;
        margin-bottom: 16px;
      }
    }
    .table-detail{
      width: 100%;
      tr {
        background: #f9f9f9;
        &:nth-child(odd){
          background: #fff;
        }
        &:hover{
          background: #f9f9f9;
        }
        td {
          min-height: 40px;
          height: auto;
          line-height: 40px;
          font-size: 14px;
          border: 1px solid #d1dbe5;
          &:nth-child(odd) {
            width: 30%;
            text-align: center;
          }
          &:nth-child(even) {
            padding-left: 60px;
            .goods-list{
              width: 600px;
              height: auto;
              line-height: 30px;
              padding: 0 10px;
              margin: 4px;
              text-align: left;
              border: 1px solid #EFF2F7;
              span {
                padding: 2px 4px;
                background: #F9FAFC;
                border: 1px solid #fff;
                margin-right: 4px;
                border-radius: 3px;
              }
            }
          }
        }
      }
      .item-name{
        width: 35%;
        text-align: right;
      }
    }
  }
}
</style>
