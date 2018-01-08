<template>
  <div class="ordersManage">
    <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>会员商城</el-breadcrumb-item>
              <el-breadcrumb-item>兑换商品管理</el-breadcrumb-item>
              <el-breadcrumb-item>兑换订单管理</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="wrapper">
          <div class="add-container">
              <div class="add-tab-title">
                  <span class="titel-item">
                    <router-link to='/vipStore/vOrdersManage/editPendingOrder'>
                        未发货订单
                    </router-link>
                  </span>
                  <span class="titel-item">
                      <router-link to='/vipStore/vOrdersManage/editSuccessOrder'>
                          已发货订单
                      </router-link>
                  </span>
                  <span class="titel-item">
                      <router-link to='/vipStore/vOrdersManage/editFailOrder'>
                          失败订单
                      </router-link>
                  </span>
              </div>
              <div class="add-tab-box">
                  <router-view></router-view>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import api from '../../api/axios'
import utils from '../../utils/utils'

export default {
  name: 'ordersManage',
  data () {
    return {
    }
  },
  mounted () {
    this.$router.push({path: '/vipStore/vOrdersManage/editPendingOrder'})
  },
  computed: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.ordersManage{
    width: 100%;
    height: auto;
    .wrapper{
      height: auto;
      margin: 0 2px;
      border: 1px solid #eaeefb;
      border-top: 0;
      border-radius: 4px;
      .add-tab-title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 0;
        background: #eef1f6;
        border-bottom: 1px solid #eaeefb;
        .titel-item{
          display: inline-block;
          width: auto;
          height: 40px;
          font-size: 14px;
          text-align: center;
          color: #48576a;
          cursor: pointer;
          a{
            display: block;
            padding: 0 18px;
            &.v-link-active {
              background: #fff;
              color: #20a0ff;
            }
          }
        }
      }
      .add-tab-box{
        .box-item{
          margin-top: 16px;
          height: auto;
          display: none;
          &.active {
            display: block;
          }
          .good-input{
            width: 230px;
          }
          .form-title{
            font-size: 14px;
            margin: 20px 12px;
          }
          .previewWrapper{
            position: absolute;
            top: 100px;
            left: 590px;
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
            .bind-shop {
              padding-top: 16px;
              border-top: 1px dashed #333;
            }
          }
        }
      }
    }
}
.wrapper-header{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #fff;
  color: #000;
  font-weight: bold;
  background-color: #fff;
  margin-top: 16px;
  padding: 10px 15px 10px 0;
  border-radius: 4px;
}
</style>
