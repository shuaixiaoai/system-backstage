//  变量命名要使用驼峰，不要使用下划线，不然eslint会报错
import Vue from 'vue'
import Router from 'vue-router'
import main from '@/view/main'
import index from '@/view/index/index'
import orders from '@/view/ordersManage/orders'
import ordersManage from '@/view/ordersManage/ordersManage'
import ordersSearch from '@/view/ordersManage/ordersSearch'
import ordersDetail from '@/view/ordersManage/ordersDetail'
import ordersEdit from '@/view/ordersManage/ordersEdit'
import unPaid from '@/components/Dtable/unPaid'
import paid from '@/components/Dtable/paid'
import checked from '@/components/Dtable/checked'
import failed from '@/components/Dtable/failed'
import refund from '@/components/Dtable/refund'
import sending from '@/components/Dtable/sending'
import succeed from '@/components/Dtable/succeed'

import setMenuCard from '@/view/setMenuCard/setmenuEntry'
import setMenuCardView from '@/view/setMenuCard/setMenuCardView'
import setMenuGoodsView from '@/view/setMenuCard/setMenuGoodsView'
import giftsCardView from '@/view/setMenuCard/giftsCardView'
import basicInfo from '@/view/setMenuCard/subView/setMenuCardBasicInfo'
import cardSurface from '@/view/setMenuCard/subView/setMenuCardSurface'
import addTheme from '@/view/setMenuCard/subView/addTheme'
import editTheme from '@/view/setMenuCard/subView/editTheme'
import editBasicInfo from '@/view/setMenuCard/subView/editSetMenuCardBasicInfo'
import editSurface from '@/view/setMenuCard/subView/editSetMenuCardSurface'
import themeDetail from '@/view/setMenuCard/subView/themeDetail'

// 会员商城模块
import vipStore from '@/view/vipStore/mainEntry'
    // 兑换商品管理
import vGoodsManage from '@/view/vipStore/goodsManage'
import editMallGoodsMainEntry from '@/view/vipStore/editMallGoodsMainEntry'
import editMallGoodsBase from '@/view/vipStore/editMallGoods/editMallGoodsBase'
import editMallGoodsImg from '@/view/vipStore/editMallGoods/editMallGoodsImg'
import editMallGoodsStatus from '@/view/vipStore/editMallGoods/editMallGoodsStatus'
    // 兑换订单管理
import vOrdersManage from '@/view/vipStore/ordersManage'
import editPendingOrder from '@/view/vipStore/editMallOrders/editPendingOrder'
import editSuccessOrder from '@/view/vipStore/editMallOrders/editSuccessOrder'
import editFailOrder from '@/view/vipStore/editMallOrders/editFailOrder'

// 店铺商品模块
import mainStatistic from '@/view/dataStatistics/mainStatistic'
import turnover from '@/view/dataStatistics/turnover'
import outTurnover from '@/view/dataStatistics/turnoverTakeout'
import setMenuTurnover from '@/view/dataStatistics/turnoverSetMenu'
import goodsSales from '@/view/dataStatistics/goodsSales'
import salesOfGoods from '@/view/dataStatistics/salesOfGoods'
import salesOfSetMenu from '@/view/dataStatistics/salesOfSetMenu'

import totalOrders from '@/view/dataStatistics/totalOrders'
import userNum from '@/view/dataStatistics/userNum'

import shopmodule from '@/view/shopmodule/moduleEntry'
import goodsManage from '@/view/shopmodule/goodsManage'
import bannerManage from '@/view/shopmodule/bannerManage'
import discountInfo from '@/view/shopmodule/discountInfo'
import addBanner from '@/view/shopmodule/addBanner'
import editBanner from '@/view/shopmodule/editBanner'

import addGood from '@/view/shopmodule/goodsManage/addGood'
import editGood from '@/view/shopmodule/goodsManage/editGood'

import goodDetail from '@/view/shopmodule/goodsManage/goodDetail'
import EBasicInfo from '@/components/shopModule/editShopBasicInfo'
import EGoodsProperty from '@/components/shopModule/editGoodsProperty'
import EGBindShop from '@/components/shopModule/editgoodsBindShop'

import user from '@/view/user/userentry'
import commonUser from '@/view/user/user'
import associator from '@/view/user/associator'
import userSearch from '@/view/user/userSearch'
import scoreRecord from '@/view/user/scoreRecord'
import vipList from '@/view/user/associatorList'
import vipSetup from '@/view/user/associatorSetup'
import blackUserList from '@/view/user/blackUserList'

import login from '@/view/login/login'
import forgetpsw from '@/view/login/forgetpsw'
import NOTFOUND from '@/view/error/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: __dirname,
  linkActiveClass: 'v-link-active',
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/login',
      component: main,
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由需要登录
      },
      children: [
        {
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/ordersManage',
          name: 'orders',
          component: orders,
          children: [
            {path: 'Detail', name: 'Detail', component: ordersDetail},
            {path: 'Edit', name: 'Edit', component: ordersEdit},
            {
              path: 'Manage',
              name: 'ordersManage',
              component: ordersManage,
              meta: {requireAuth: true},
              children: [
                {
                  path: 'unPaid',
                  name: 'unPaid',
                  component: unPaid,
                  meta: {requireAuth: true}
                },
                {
                  path: 'paid',
                  name: 'paid',
                  component: paid,
                  meta: {requireAuth: true}
                },
                {
                  path: 'checked',
                  name: 'checked',
                  component: checked,
                  meta: {requireAuth: true}
                },
                {
                  path: 'sending',
                  name: 'sending',
                  component: sending,
                  meta: {requireAuth: true}
                },
                {
                  path: 'failed',
                  name: 'failed',
                  component: failed,
                  meta: {requireAuth: true}
                },
                {
                  path: 'succeed',
                  name: 'succeed',
                  component: succeed,
                  meta: {requireAuth: true}
                },
                {
                  path: 'refund',
                  name: 'refund',
                  component: refund,
                  meta: {requireAuth: true}
                }
              ]
            },
            {path: 'Search', name: 'ordersSearch', component: ordersSearch}
          ]
        },
        {
          path: '/setMenuManage',
          name: 'setMenuManage',
          component: setMenuCard,
          children: [
            {path: 'goodsList', name: 'goodsList', component: setMenuGoodsView, meta: {requireAuth: true}},
            {path: 'giftsList', name: 'giftsList', component: giftsCardView, meta: {requireAuth: true}},
            {path: 'cardList', name: 'cardList', component: setMenuCardView, meta: {requireAuth: true}},
            {path: 'addTheme', name: 'addTheme', component: addTheme, meta: {requireAuth: true}},
            {
              path: 'edit',
              name: 'editTheme',
              component: editTheme,
              meta: {requireAuth: true},
              children: [
                {path: 'editBasicInfo', name: 'editBasicInfo', component: editBasicInfo, meta: {requireAuth: true}},
                {path: 'editSurface', name: 'editSurface', component: editSurface, meta: {requireAuth: true}}
              ]
            },
            {path: 'themeDetail', name: 'themeDetail', component: themeDetail, meta: {requireAuth: true}}
          ]
        },
        {
          path: '/vipStore',
          name: 'vipStore',
          component: setMenuCard,
          children: [
            {
              path: 'editMallGoodsMainEntry',
              name: 'editMallGoodsMainEntry',
              component: editMallGoodsMainEntry,
              children: [
                {path: 'editMallGoodsBase', name: 'editMallGoodsBase', component: editMallGoodsBase},
                {path: 'editMallGoodsImg', name: 'editMallGoodsImg', component: editMallGoodsImg},
                {path: 'editMallGoodsStatus', name: 'editMallGoodsStatus', component: editMallGoodsStatus}
              ]
            },
            {
              path: 'vGoodsManage',
              name: 'vGoodsManage',
              component: vGoodsManage
            },
            {
              path: 'vOrdersManage',
              name: 'vOrdersManage',
              component: vOrdersManage,
              children: [
                {path: 'editPendingOrder', name: 'editPendingOrder', component: editPendingOrder},
                {path: 'editSuccessOrder', name: 'editSuccessOrder', component: editSuccessOrder},
                {path: 'editFailOrder', name: 'editFailOrder', component: editFailOrder}
              ]
            }
          ]
        },
        {
          path: '/statistics',
          name: 'dataStatistics',
          component: mainStatistic,
          children: [
            {
              path: 'turnover',
              name: 'turnover',
              component: turnover,
              children: [
                {path: 'takeoutTurnover', name: 'outTurnover', component: outTurnover},
                {path: 'setMenuTurnover', name: 'setMenuTurnover', component: setMenuTurnover}
              ]
            },
            {
              path: 'goodsSales',
              name: 'goodsSales',
              component: goodsSales,
              children: [
                {path: 'goods', name: 'salesOfGoods', component: salesOfGoods},
                {path: 'setMenu', name: 'salesOfSetMenu', component: salesOfSetMenu}
              ]
            },
            {path: 'totalOrders', name: 'totalOrders', component: totalOrders},
            {path: 'userNum', name: 'userNum', component: userNum}
          ]
        },
        {
          path: '/shopmodule',
          name: 'shopmodule',
          component: shopmodule,
          meta: {
            keepAlive: false // 不需要被缓存
          },
          children: [
            {path: 'goodsManage', name: 'goodsManage', component: goodsManage, meta: {requireAuth: true}},
            {path: 'bannerManage', name: 'bannerManage', component: bannerManage, meta: {requireAuth: true}},
            {path: 'discountInfo', name: 'discountInfo', component: discountInfo, meta: {requireAuth: true}},
            {path: 'addBanner', name: 'addBanner', component: addBanner, meta: {requireAuth: true}},
            {path: 'editBanner', name: 'editBanner', component: editBanner, meta: {requireAuth: true}},
            {path: 'addGood', name: 'addGood', component: addGood, meta: {requireAuth: true}},
            {path: 'goodDetail', name: 'goodDetail', component: goodDetail, meta: {requireAuth: true}},
            {
              path: 'editGood',
              name: 'editGood',
              component: editGood,
              children: [
                {path: 'EBasicInfo', name: 'EBasicInfo', component: EBasicInfo, meta: {requireAuth: true}},
                {path: 'EGoodsProperty', name: 'EGoodsProperty', component: EGoodsProperty, meta: {requireAuth: true}},
                {path: 'EGBindShop', name: 'EGBindShop', component: EGBindShop, meta: {requireAuth: true}}
              ]
            }
          ]
        },
        {
          path: '/userManage',
          name: 'userManage',
          component: user,
          children: [
            {path: 'commonUser', name: 'commonUser', component: commonUser, meta: {requireAuth: true}},
            {path: 'userSearch', name: 'userSearch', component: userSearch, meta: {requireAuth: true}},
            {path: 'scoreRecord', name: 'scoreRecord', component: scoreRecord, meta: {requireAuth: true}},
            {
              path: 'associator',
              name: 'associator',
              component: associator,
              children: [
                {path: 'vipList', name: 'vipList', component: vipList, meta: {requireAuth: true}},
                {path: 'vipSetup', name: 'vipSetup', component: vipSetup, meta: {requireAuth: true}},
                {path: 'blackList', name: 'blackList', component: blackUserList, meta: {requireAuth: true}}
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/forgetpsw',
      name: 'forgetpsw',
      component: forgetpsw
    },
    {
      path: '/404',
      name: 'NOTFOUND',
      component: NOTFOUND
    }

  ]
})
