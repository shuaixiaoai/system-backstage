<template>
  <div class="addGood">
      <div class="crumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>店铺模块</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/shopmodule/goodsManage' }">商品管理</el-breadcrumb-item>
              <el-breadcrumb-item>新增商品</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="wrapper">
          <div class="add-container">
              <div class="add-tab-title">
                  <!-- <span class="titel-item" :class="{active: currentIndex == index}" v-for="(item, index) in tabTitle" @click="currentIndex = titleIndex = index">{{item}}</span> -->
                  <span class="titel-item" :class="{active: currentIndex == index}" v-for="(item, index) in tabTitle" @click="navigateToTab(index)">{{item}}</span>
              </div>
              <div class="add-tab-box">
                  <div class="box-item" :class="{active: titleIndex == 0}">
                      <BasicInfo></BasicInfo>
                  </div>
                  <div class="box-item" :class="{active: titleIndex == 1}">
                      <GoodsProperty></GoodsProperty>
                  </div>
                  <div class="box-item" :class="{active: titleIndex == 2}">
                      <GBindShop></GBindShop>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import BasicInfo from '../../../components/shopModule/shopBasicInfo'
import GoodsProperty from '../../../components/shopModule/GoodsProperty'
import GBindShop from '../../../components/shopModule/goodsBindShop'

export default {
  name: 'addGood',
  data () {
    return {
      tabTitle: ['基本信息', '商品属性', '绑定店铺'],
      currentIndex: 0,
      titleIndex: 0
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      goodsId: ({shopmodule}) => shopmodule.currentGoodsId
    })
  },
  methods: {
    navigateToTab (index) {
      if (index !== 0) {
        if (this.goodsId === 0) {
          this.$message('请完成商品基本信息创建！')
        } else {
          this.currentIndex = this.titleIndex = index
        }
      } else {
        this.currentIndex = this.titleIndex = index
      }
    }
  },
  components: {
    BasicInfo,
    GoodsProperty,
    GBindShop
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.addGood{
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
          padding: 0 18px;
          cursor: pointer;
          &.active {
            background: #fff;
            color: #20a0ff;
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
  color: #fff;
  background-color: #50bfff;
  margin: 0;
  padding: 10px 15px;
  border-radius: 4px;
}
</style>
