import axios from 'axios'
import qs from 'qs'
import store from '../vuex'
import router from '../router'
import utils from '../utils/utils'
import { Message } from 'element-ui'

// 设置全局axios

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.withCredentials = true
const instance = axios.create({
  baseURL: 'http://betaadminapi.tovof.com/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  responseType: 'json'// default
})
const uploadInstance = axios.create({
  baseURL: 'http://betaadminapi.tovof.com/',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=---1232'
  }
})
axios.defaults.timeout = 5000    // 5000的超市验证
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.interceptors.request.use = instance.interceptors.request.use

// request 拦截器
instance.interceptors.request.use(
  config => {
    // if (store.state.isLogin) {
    //   config.headers.Authorization = `isLogin ${store.state.isLogin}`
    // }
    config.headers['token'] = utils.storage.getItem('token')
    return config
  },
  err => {
    Message({
      showClose: true,
      message: error,
      type: error.data.error.message
    })
    return Promise.reject(err)
  }
)
// response 拦截器
instance.interceptors.response.use(
  response => {
    if (response.data === null) {
      return response
    } else {
      if (response.data.code === 1000) {
        Message({
          showClose: true,
          message: response.data.message,
          type: 'error'
        })
        utils.storage.deleteItem('isLogin')
        utils.storage.deleteItem('token')
        utils.storage.setItem('currentIndex', '1')
        // console.log(router.currentRoute.fullPath)
        router.push({
          path: '/login'
        })
      } else {
        return response
      }
    }
  },
  error => {   // 除了2XX之外的都是错误，就会走这
    // console.log(error)
    // loadinginstace.close()
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('userLogout')    // 可能是isLogin失效，清楚它
          router.replace({
            path: 'login',
            query: {redirect: router.currentRouter.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
      return Promise.reject(error.response.data)
    }
  }
)

export default {
  // banner上传
  uploadRequest (url, data) {
    return uploadInstance.post(url, data)
  },
  // 用户登录
  userLogin (data) {
    return instance.post('/auth/auth/login', data)
  },
  // // 删除用户
  // delUser (data) {
  //   return instance.post('/api/delUser', data)
  // },
  // 退出登录
  userLoginout () {
    return instance.post('/auth/auth/loginout')
  },
  // 获取订单数据
  getOrdersList (url) {
    return instance.get(url)
  },
  // 获取店铺下拉列表数据
  getShopsList (url) {
    return instance.get(url)
  },
  // 获取退款中订单
  getRefundOrder (url) {
    return instance.get(url)
  },
  // 搜索订单
  searchOrder (data) {
    return instance.post('/order/orderSearch/ordersearch', data)
  },
  // 订单详情
  getOrderDetail (url) {
    return instance.get(url)
  },
  // 修改订单
  updateOrder (data) {
    return instance.post('/order/order/updateOrder', data)
  },
  // 设为确认订单
  setOrderToChecked (data) {
    return instance.post('/order/order/confirmOrder', data)
  },
  // 设为已配送订单
  setOrderToSent (data) {
    return instance.post('/order/order/setDelivered', data)
  },
  // 设为失败订单
  setOrderToFailed (data) {
    return instance.post('/order/order/cancelOrder', data)
  },
  // 设为成功订单
  setOrderToSucceed (data) {
    return instance.post('/order/order/setToSuccess', data)
  },
  // 退款操作
  agreeRefund (data) {
    return instance.post('/order/order/refund', data)
  },
  // 打印订单
  printerOrder (data) {
    return instance.post('/order/order/printerOrder', data)
  },
  // 营业额统计查询
  getTurnover (data) {
    return instance.get('/statis/order/getStatis', {params: data})
  },
  // 套餐卡营业额统计查询
  getSetMenuTurnover (data) {
    return instance.get('/statis/giftcart/getRevenue', {params: data})
  },
  // 订单量统计查询
  getTotalOrders (data) {
    return instance.get('/statis/order/getStatis', {params: data})
  },
  // 商品销量统计查询
  getGoodsSales (data) {
    return instance.get('/statis/goods/statis', {params: data})
  },
  // 套餐卡销量统计
  getSetMenuSales (data) {
    return instance.get('/statis/giftcart/getSales', {params: data})
  },
  // 用户统计查询
  getUserNum (data) {
    return instance.get('/statis/user/getStatis', {params: data})
  },
  // 导出营业额
  exportTurnoverTable (data) {
    return instance.get('/statis/order/exportRevenue', {params: data})
  },
  // 导出套餐卡营业额
  exportSetMenuTurnoverTable (data) {
    return instance.get('/statis/giftcart/exportRevenue', {params: data})
  },
  // 导出订单
  exportTotalOrdersTable (data) {
    return instance.get('/statis/order/exportOrder', {params: data})
  },
  // 导出商品销量统计
  exportGoodsSalesTable (data) {
    return instance.get('/statis/goods/exportGoodsSale', {params: data})
  },
  // 导出套餐卡销量统计
  exportSetMenuSalesTable (data) {
    return instance.get('/statis/giftcart/exportSales', {params: data})
  },
  // 导出用户统计
  exportUserNumTable (data) {
    return instance.get('/statis/user/exportUser', {params: data})
  },
  // 上传图片
  uploadPicture (data) {
    return instance.post('/shop/banners/createBanner', data)
  },
  // 创建banner
  creatNewBanner (data) {
    return instance.post('/shop/banners/createBanner', data)
  },
  // 获取Banner列表
  getBannersList () {
    return instance.get('/shop/banners/getBanners')
  },
  // 删除Banner
  deleteBanner (data) {
    return instance.post('/shop/banners/delBanner', data)
  },
  // 获取Banner详情
  getBannerDetail (data) {
    return instance.get('/shop/banners/bannerDetail', {params: data})
  },
  // 更新Banner
  editBanner (data) {
    return instance.post('/shop/banners/bannerUpdate', data)
  },
  // 获取商品列表
  getGoodsList (data) {
    return instance.get('/goods/goods/getGoodsList', {params: data})
  },
  // 获取商品分类列表
  getGoodsCategoryList (data) {
    return instance.get('/goods/goods/categoryList', {params: data})
  },
  // 创建商品
  creatNewGood (data) {
    return instance.post('/goods/goods/createGoods', data)
  },
  // 获取已有属性列表
  getPossessedPropertyList (data) {
    return instance.get('/goods/goods/specGroupList', {params: data})
  },
  // 创建商品属性
  createNewGoodsProperty (data) {
    return instance.post('/goods/goods/bindSpec', data)
  },
  // 商品绑定店铺
  createdNewGoodBind (data) {
    return instance.post('/goods/goods/bindShop', data)
  },
  // 获取商品详情
  getGoodDetail (data) {
    return instance.get('/goods/goods/getGoodsDetail', {params: data})
  },
  // 更新商品基本信息
  updateGoodBasicInfo (data) {
    return instance.post('/goods/goods/updateGoods', data)
  },
  // 更新商品属性
  updateGoodProperty (data) {
    return instance.post('/goods/goods/updateSpec', data)
  },
  // 更新商品店铺绑定
  updateGoodBindShop (data) {
    return instance.post('/goods/goods/updateBindShop', data)
  },
  // ==================用户===================
  // 获取用户列表
  getUsersList (data) {
    return instance.get('/users/users/getUser', {params: data})
  },
  // 获取vip列表
  getVipList (data) {
    return instance.get('/users/vip/getVipUser', {params: data})
  },
  // 升级为会员
  upgradeToVip (data) {
    return instance.post('/users/users/toBeVip', data)
  },
  // 改变积分
  changePoint (data) {
    return instance.post('/users/users/changePoint', data)
  },
  // 用户积分记录
  getPointLogs (data) {
    return instance.get('/users/users/pointLogs', {params: data})
  },
  // 获取黑名单列表
  getBlackUserList (data) {
    return instance.get('/users/users/getBlackList', {params: data})
  },
  // 加入黑名单
  moveToBlackList (data) {
    return instance.post('/users/users/addBlackList', data)
  },
  removeBlackList (data) {
    return instance.post('/users/users/removeBlackList', data)
  },
  // 用户搜索
  userSearch (data) {
    return instance.get('/users/userSearch', {params: data})
  },
  // 用户导出excel
  exportAsExcel (data) {
    return instance.get('/users/export', {params: data})
  },
  // 套餐卡
  // 请求主题列表
  getThemeList (data) {
    return instance.get('/giftcard/giftcard/categoryList', {params: data})
  },
  // 请求套餐商品列表
  getThemeSetMenuGoodsList (data) {
    return instance.get('/giftcard/giftcard/gooodsList', {params: data})
  },
  // 获取主题详情
  getThemeDetail (data) {
    return instance.get('/giftcard/giftcard/categoryDetail', {params: data})
  },
  // 删除主题
  deleteSetMenuTheme (data) {
    return instance.post('/giftcard/giftcard/deteleCategory', data)
  },
  // 请求礼品卡列表
  getGiftCardList (data) {
    return instance.get('/giftcard/giftcard', {params: data})
  },
  // 创建主题基本信息
  createTheme (data) {
    return instance.post('/giftcard/giftcard/createCategory', data)
  },
  // 创建卡面
  createCardSurface (data) {
    return instance.post('/giftcard/giftcard/createBackground', data)
  },
  // 修改主题信息
  updateCategory (data) {
    return instance.post('/giftcard/giftcard/updateCategory', data)
  },
  // 删除卡面
  deleteSurface (data) {
    return instance.post('/giftcard/giftcard/deteleBackground', data)
  },
  // 添加商品套餐
  createSetMenuGoods (data) {
    return instance.post('/giftcard/giftcard/createGoods', data)
  },
  // 套餐商品修改
  editSetMenuGoods (data) {
    return instance.post('/giftcard/giftcard/updateGoods', data)
  },
  // 套餐商品删除
  deleteSetMenuGoods (data) {
    return instance.post('/giftcard/giftcard/deteleGoods', data)
  },
  // 获取所有商品列表
  getAllGoodsList () {
    return instance.get('/goods/goods/getGoodsDownList')
  },
  // 获取会员商城商品列表
  getAllMallGoodsList (req) {
    return instance.get('/vipmall/mallGoods/goodsList', {params: req})
  },
  // 获取会员商城商品详情
  getMallGoodsDetail (req) {
    return instance.get('/vipmall/mallGoods/goodsDetail', {params: req})
  },
  // 修改会员商城商品信息
  modifyMallGoods (req) {
    return instance.post('/vipmall/mallGoods/updateGoods', req)
  },
  // 创建会员商城商品
  creatNewMallGoods (req) {
    return instance.post('/vipmall/mallGoods/createGoods', req)
  },
  // 获取会员商城未发货订单
  getPengdingOrdersList (req) {
    return instance.get('/vipmall/mallOrder/orderList', {params: req})
  },
  // 会员商城订单置为已发货
  modifyMallOrderToSuccess (req) {
    return instance.post('/vipmall/mallOrder/delivered', req)
  },
  // 会员商城订单置为失败
  modifyMallOrderToFail (req) {
    return instance.post('/vipmall/mallOrder/doFailded', req)
  },
  // 会员商城订单信息修改
  modifyMallOrderDetail (req) {
    return instance.post('/vipmall/mallOrder/updateMorder', req)
  }
}
