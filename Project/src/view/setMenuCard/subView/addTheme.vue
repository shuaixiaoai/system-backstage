<template>
  <div class="add-surface">
    <div class="crumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>套餐卡管理</el-breadcrumb-item>
            <el-breadcrumb-item>套餐卡列表</el-breadcrumb-item>
            <el-breadcrumb-item>新增主题</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="tab-title">
      <span class="title-item" :class="{active: currentIndex === index}" v-for="(item, index) in tabTitle" @click="navigateToTab(index)">{{item}}</span>
      {{tabTitle}}
    </div>
    <div class="container">
      <div class="box-item" :class="{active: titleIndex === 0}">
          <BasicInfo></BasicInfo>
      </div>
      <div class="box-item" :class="{active: titleIndex === 1}">
        <CardSurface></CardSurface>
      </div>
    </div>
  </div>
</template>

<script>
import BasicInfo from './setMenuCardBasicInfo.vue'
import CardSurface from './setMenuCardSurface.vue'
export default {
  name: 'addTheme',
  data () {
    return {
      tabTitle: ['主题信息', '卡面信息'],
      currentIndex: 0,
      titleIndex: 0
    }
  },
  methods: {
    navigateToTab (index) {
      this.currentIndex = index
      this.titleIndex = index
      // if (index !== 0) {
      //   if (this.goodsId === 0) {
      //     this.$message('请完成商品基本信息创建！')
      //   } else {
      //     this.currentIndex = this.titleIndex = index
      //   }
      // } else {
      //   this.currentIndex = this.titleIndex = index
      // }
    }
  },
  components: {
    BasicInfo,
    CardSurface
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.add-surface{
  width: 100%;
  height: 100%;
  .tab-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 0;
    background: #eef1f6;
    border-bottom: 1px solid #eaeefb;
    .title-item{
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
  .container{
    .box-item{
      margin-top: 16px;
      height: auto;
      display: none;
      &.active {
        display: block;
      }
    }
  }
}
</style>
