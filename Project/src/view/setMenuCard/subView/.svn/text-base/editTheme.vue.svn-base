<template>
  <div class="add-surface">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>套餐卡管理</el-breadcrumb-item>
            <el-breadcrumb-item>套餐卡列表</el-breadcrumb-item>
            <el-breadcrumb-item>修改主题</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
      <div class="add-tab-title">
          <!-- <span class="titel-item" :class="{active: currentIndex == index}" v-for="(item, index) in tabTitle" @click="navigateToTab(index)">{{item}}</span> -->
          <span class="titel-item">
            <router-link to='/setmenuManage/edit/editBasicInfo'>
                主题信息
            </router-link>
          </span>
          <span class="titel-item">
              <router-link to='/setmenuManage/edit/editSurface'>
                  卡面信息
              </router-link>
          </span>
      </div>
      <div class="add-tab-box">
          <router-view></router-view>
      </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import utils from '../../../utils/utils'
import EBasicInfo from './editSetMenuCardBasicInfo.vue'
import ECardSurface from './editSetMenuCardSurface.vue'
export default {
  name: 'editTheme',
  data () {
    return {
      tabTitle: ['主题信息', '卡面信息'],
      currentIndex: 0,
      titleIndex: 0
    }
  },
  mounted () {
    // console.log(this.$route.query)
    // let categoryId = utils.storage.getItem('categoryId')
    // console.log(categoryId)
    // this.$router.push({path: '/setmenuManage/edit/editBasicInfo?', query: {categoryId: categoryId}})
    // let sendData = {
    //   data: {
    //     categoryId: categoryId
    //   },
    //   that: this
    // }
    // this.getThemeDetail(sendData)
  },
  computed: {
    ...mapState({
      // themeDetail: ({shopmodule}) => setMenu.themeDetail
    })
  },
  methods: {
    ...mapActions([
      'getThemeDetail'
    ])
  },
  beforeDestroyed () {
    console.log('注销前')
  },
  components: {
    EBasicInfo,
    ECardSurface
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.add-surface{
  width: 100%;
  height: 100%;
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
     margin-top: 30px;
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
</style>
