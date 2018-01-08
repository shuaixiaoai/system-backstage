<template>
    <el-row>
        <el-menu :default-active="activeIndex"  class="el-menu-vertical-demo" @open="handleOpen" @select="handleSelect" unique-opened>
              <el-menu-item index="1">
                  <router-link to='/index'>
                      <i class="el-icon-menu"></i>首页
                  </router-link>
              </el-menu-item>
              <el-submenu index="2" class="el-menu-vertical-demo" default-active="2-1">
                  <template slot="title"><i class="iconfont icon-dingdan-copy"></i>订单管理</template>
                  <el-menu-item index="2-1">
                      <router-link to='/ordersManage/Manage/checked'>
                          订单列表
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                      <router-link to='/ordersManage/Search'>
                          订单搜索
                      </router-link>
                  </el-menu-item>
              </el-submenu>

              <el-submenu index="3" class="el-menu-vertical-demo" default-active="3-1">
                  <template slot="title"><i class="iconfont icon-taocan"></i>套餐卡管理</template>
                  <el-menu-item index="3-1">
                      <router-link to='/setmenuManage/cardList'>
                          主题列表
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="3-2">
                      <router-link to='/setmenuManage/goodsList'>
                          套餐商品列表
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="3-3">
                      <router-link to='/setmenuManage/giftsList'>
                          礼品卡列表
                      </router-link>
                  </el-menu-item>
              </el-submenu>

              <el-submenu index="4" class="el-menu-vertical-demo" default-active="4-1">
                  <template slot="title"><i class="iconfont icon-vip"></i>会员商城</template>
                  <el-menu-item index="4-1">
                      <router-link to='/vipStore/vGoodsManage'>
                          兑换商品管理
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="4-2">
                      <router-link to='/vipStore/vOrdersManage/editPendingOrder'>
                          兑换订单管理
                      </router-link>
                  </el-menu-item>
              </el-submenu>

              <el-submenu index="5" class="el-menu-vertical-demo" default-active="5-1">
                  <template slot="title"><i class="iconfont icon-tongji"></i>统计管理</template>
                  <el-menu-item index="5-1">
                      <router-link to='/statistics/turnover/takeoutTurnover'>
                          营业额统计
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="5-2">
                      <router-link to='/statistics/totalOrders'>
                          订单量统计
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="5-3">
                      <router-link to='/statistics/goodsSales/goods'>
                          商品销量统计
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="5-4">
                      <router-link to='/statistics/userNum'>
                          用户统计
                      </router-link>
                  </el-menu-item>
              </el-submenu>
              <el-submenu index="6" class="el-menu-vertical-demo" default-active="6-1">
                  <template slot="title"><i class="iconfont icon-dianpu"></i>店铺模块</template>
                  <el-menu-item index="6-1">
                      <router-link to='/shopmodule/goodsManage'>
                          商品管理
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="6-2">
                      <router-link to='/shopmodule/bannerManage'>
                          Banner管理
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="6-3">
                      <router-link to='/shopmodule/discountInfo'>
                          优惠信息
                      </router-link>
                  </el-menu-item>
              </el-submenu>
              <el-submenu index="7" class="el-menu-vertical-demo" default-active="7-1">
                  <template slot="title"><i class="iconfont icon-yonghu"></i>用户管理</template>
                  <el-menu-item index="7-1">
                      <router-link to='/userManage/commonUser'>
                          普通用户
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="7-2">
                      <router-link to='/userManage/associator/vipList'>
                          会员
                      </router-link>
                  </el-menu-item>
                  <el-menu-item index="7-3">
                      <router-link to='/userManage/userSearch'>
                          搜索
                      </router-link>
                  </el-menu-item>
              </el-submenu>
        </el-menu>
    </el-row>

</template>

<script>
import utils from '../utils/utils'
export default {
  name: 'navbar',
  data () {
    return {
      activeIndex: '1'
    }
  },
  mounted () {
    this.activeIndex = utils.storage.getItem('currentIndex')
    // this.handleSelect('1')
  },
  beforeUpdate: function () {
    // this.activeIndex = this.$route.matched[1].path
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(123)
    },
    handleSelect (key, keyPath) {
      this.activeIndex = key
      utils.storage.setItem('currentIndex', key)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-menu-vertical-demo{
    li{
      padding: 0;
      padding-left: 0!important;
      border-bottom: 1px solid #ccc;
      &:hover{
        background: #fff;
      }
      li{
        border-bottom: 1px solid transparent;
        border-top: 1px solid #e5e5e5;
        background: #F9FAFC;
        &:hover{
          background: #eae8e8;
        }
      }
      a, .el-submenu__title{
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 0 20px;
          font-size: 14px;
          text-shadow: none!important;
          border-left: 4px solid transparent;
          &:hover{
            color: #20a0ff;
            border-left: 4px solid #e5e5e5;
          }
          &.v-link-active{
            color: #20a0ff;
            border-left: 4px solid #e5e5e5;
          }
      }
      .el-menu-item{
        &:hover{
          background: #fff;
        }
      }
    }
    .el-submenu.is-opened {
      background: #C0CCDA;
      .el-submenu__title{
        color: #fff!important;
      }
      i{
        color: #fff;
      }
    }
    .v-link-active{
      color: #20a0ff;
    }
    i {
      color: #999;
      margin-right: 12px;
    }
}
</style>
