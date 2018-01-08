import api from '../../api/axios'
import baseURL from '../../utils/baseUrl'
import utils from '../../utils/utils'

const state = {
  loading: false,
  mallGoodsData: [],
  mallGoodsDataCount: 0,
  mallGoodsDetail: {
    is_limit: 0,
    status: 1
  },
  mallOrdersData: [],
  ordersParams: {},
  mallOrdersDataCount: 0
}

const types = {
  ADDLOADING: 'ADDLOADING', // 加载菊花
  REMOVELOADING: 'REMOVELOADING',  // 清除菊花
  MALLGOODSDATA: 'MALLGOODSDATA', // 会员商城商品列表数据
  MALLGOODSCOUNT: 'MALLGOODSCOUNT', // 会会员商城商品列表数据总数
  MALLGOODSDETAIL: 'MALLGOODSDETAIL', // 会员商城商品详情
  MALLORDERSDATA: 'MALLORDERSDATA', // 会员订单列表数据
  ORDERSPARAMS: 'ORDERSPARAMS', // 请求会员订单列表数据参数缓存
  MALLORDERSDATACOUNT: 'MALLORDERSDATACOUNT' // 会员订单列表数据总数
}

// actions
const actions = {
  // params请求参数 , commit提交载荷改变状态和数据
  getVipMallGoodsList ({commit}, params) {
    // let that = data.that
    let req = {
      page: params.pageNum
    }
    api.getAllMallGoodsList(req).then((res) => {
      console.log(res)
      commit('REMOVELOADING')
      commit(types.MALLGOODSDATA, {
        list: res.data.data.list
      })
      commit(types.MALLGOODSCOUNT, {
        count: res.data.data.count
      })
    })
  },
  getVipMallGoodsDetail ({commit}, params) {
    api.getMallGoodsDetail(params.data).then((res) => {
      console.log(res)
      commit('REMOVELOADING')
      commit(types.MALLGOODSDETAIL, {
        list: res.data.data
      })
    })
  },
  modifyMallGoods ({commit}, params) {
    let req = params.data
    console.log(req)
    api.modifyMallGoods(req).then((res) => {
      console.log(res)
      if (res.data.code === 0) {
        params.that.$notify.success({
          title: '成功',
          message: '保存成功',
          offset: 100
        })
      } else {
        params.that.$notify.error({
          title: '错误',
          message: '保存失败'
        })
      }
    })
  },
  addNewMallGoods ({commit}, params) {
    let req = params.data
    console.log(req)
    api.creatNewMallGoods(req).then((res) => {
      console.log(res)
      if (res.data.code === 0) {
        params.that.$notify.success({
          title: '成功',
          message: '新建成功',
          offset: 100
        })
        utils.storage.deleteItem('addNewParams')
        params.that.$router.push({path: '/vipStore/vGoodsManage'})
      } else if (res.data.code === 100001) {
        params.that.$notify.error({
          title: '错误',
          message: '信息填写不完整'
        })
      } else {
        params.that.$notify.error({
          title: '错误',
          message: '新建失败,'
        })
      }
    })
  },
  getMallOrdersList ({commit}, params) {
    let req = params
    commit(types.ORDERSPARAMS, {
      ordersParams: params
    })
    api.getPengdingOrdersList(req).then((res) => {
      console.log(res)
      commit('REMOVELOADING')
      commit(types.MALLORDERSDATA, {
        list: res.data.data.list
      })
      commit(types.MALLORDERSDATACOUNT, {
        count: res.data.data.count
      })
    })
  },
  setMallOrderToSuccess ({commit, dispatch}, params) {
    let req = params.data
    console.log(params)
    api.modifyMallOrderToSuccess(req).then((res) => {
      console.log(res)
      commit('REMOVELOADING')
      if (res.data.code === 0) {
        params.that.$notify.success({
          title: '成功',
          message: '设置成功',
          offset: 100
        })
        dispatch('getMallOrdersList', state.ordersParams)
      } else {
        params.that.$notify.error({
          title: '错误',
          message: '设置失败'
        })
      }
    })
  },
  setMallOrderToFail ({commit, dispatch}, params) {
    let req = params.data
    console.log(req)
    api.modifyMallOrderToFail(req).then((res) => {
      console.log(res)
      commit('REMOVELOADING')
      if (res.data.code === 0) {
        params.that.$notify.success({
          title: '成功',
          message: '设置成功',
          offset: 100
        })
        console.log(state.ordersParams)
        dispatch('getMallOrdersList', state.ordersParams)
      } else {
        params.that.$notify.error({
          title: '错误',
          message: '设置失败'
        })
      }
    })
  },
  modifyMallOrderDetail ({commit, dispatch}, params) {
    let req = params.data
    console.log(req)
    api.modifyMallOrderDetail(req).then((res) => {
      console.log(res)
      commit('REMOVELOADING')
      if (res.data.code === 0) {
        params.that.$notify.success({
          title: '成功',
          message: '修改成功',
          offset: 100
        })
        dispatch('getMallOrdersList', state.ordersParams)
      } else {
        params.that.$notify.error({
          title: '错误',
          message: '修改失败'
        })
      }
    })
  }
}

// mutations
const mutations = {
  [types.ADDLOADING] (state) {
    // 变更状态
    state.loading = true
  },
  [types.REMOVELOADING] (state) {
    // 变更状态
    state.loading = false
  },
  [types.MALLGOODSDATA] (state, res) {
    // 数据存储
    state.mallGoodsData = res.list
  },
  [types.MALLGOODSCOUNT] (state, res) {
    state.mallGoodsDataCount = res.count
  },
  [types.MALLGOODSDETAIL] (state, res) {
    state.mallGoodsDetail = res.list
  },
  [types.MALLORDERSDATA] (state, res) {
    state.mallOrdersData = res.list
  },
  [types.ORDERSPARAMS] (state, res) {
    state.ordersParams = res.ordersParams
  },
  [types.MALLORDERSDATACOUNT] (state, res) {
    state.mallOrdersDataCount = res.count
  }
}
export default {
  state,
  mutations,
  actions
}
