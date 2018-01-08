import api from '../../api/axios'
import baseURL from '../../utils/baseUrl'
const state = {
  searchTime: false,
  loading: false,
  turnoverData: {},
  setMenuTurnoverData: {},
  totalOrdersData: {},
  goodsSalesData: {},
  setMenuSalesData: {},
  userNumData: {},
  searchData: {}        // 搜索post数据
}

const types = {
  SEARCHTURNOVER: 'SEARCHTURNOVER', // turnover营业额
  SEARCHSETMENUTURNOVER: 'SEARCHSETMENUTURNOVER',   // 套餐卡营业额统计查询
  SEARCHTOTALORDERS: 'SEARCHTOTALORDERS', // totalorders订单统计
  SEARCHGOODSSALES: 'SEARCHGOODSSALES', // goodssales商品销量
  SEARCHSETMENUSALES: 'SEARCHSETMENUSALES', // 套餐卡销量统计
  SEARCHUSERNUM: 'SEARCHUSERNUM', // usernum用户统计
  ADDLOADING: 'ADDLOADING', // 加载菊花
  REMOVELOADING: 'REMOVELOADING',  // 清除菊花
  CHANGESEARCHDATA: 'CHANGESEARCHDATA'
}

// actions
const actions = {
  getTurnoverStatistic ({commit}, data) {
    commit(types.CHANGESEARCHDATA, data)
    let that = data.that
    api.getTurnover(data.data).then(({ data }) => {
      commit('REMOVELOADING')
      if (data.code === 0) {
        data.data.startDay = data.data.startDay.substring(0, 4) + '-' + data.data.startDay.substring(4, 6) + '-' + data.data.startDay.substring(6, 8)
        data.data.endDay = data.data.endDay.substring(0, 4) + '-' + data.data.endDay.substring(4, 6) + '-' + data.data.endDay.substring(6, 8)
        data.data.list.forEach(function (val, index) {
          val.os_day = val.os_day.substring(0, 4) + '-' + val.os_day.substring(4, 6) + '-' + val.os_day.substring(6, 8)
        })
        commit(types.SEARCHTURNOVER, {
          dataDetail: data.data
        })
      } else {
        let dataList = {}
        that.$message('未查到相关信息！')
        commit(types.SEARCHTURNOVER, {
          dataDetail: dataList
        })
      }
    })
  },
  // 套餐卡营业额统计查询
  getSetMenuTurnover ({commit}, data) {
    let that = data.that
    commit(types.CHANGESEARCHDATA, data)
    api.getSetMenuTurnover(data.data)
      .then(({data}) => {
        commit('REMOVELOADING')
        if (data.code === 0) {
          data.data.startDay = data.data.startDay.substring(0, 4) + '-' + data.data.startDay.substring(4, 6) + '-' + data.data.startDay.substring(6, 8)
          data.data.endDay = data.data.endDay.substring(0, 4) + '-' + data.data.endDay.substring(4, 6) + '-' + data.data.endDay.substring(6, 8)
          commit(types.SEARCHSETMENUTURNOVER, {
            dataDetail: data.data
          })
        } else {
          let dataList = {}
          that.$message('未查到相关信息！')
          commit(types.SEARCHTURNOVER, {
            dataDetail: dataList
          })
        }
      })
  },
  getTotalOrdersStatistic ({commit}, data) {
    commit(types.CHANGESEARCHDATA, data)
    let that = data.that
    api.getTotalOrders(data.data).then(({ data }) => {
      commit('REMOVELOADING')
      if (data.code === 0) {
        data.data.startDay = data.data.startDay.substring(0, 4) + '-' + data.data.startDay.substring(4, 6) + '-' + data.data.startDay.substring(6, 8)
        data.data.endDay = data.data.endDay.substring(0, 4) + '-' + data.data.endDay.substring(4, 6) + '-' + data.data.endDay.substring(6, 8)
        data.data.list.forEach(function (val, index) {
          val.os_day = val.os_day.substring(0, 4) + '-' + val.os_day.substring(4, 6) + '-' + val.os_day.substring(6, 8)
          val.os_total_order_num = parseInt(val.os_complete_order_num) + parseInt(val.os_cancel_order_num)
        })
        commit(types.SEARCHTOTALORDERS, {
          dataDetail: data.data
        })
      } else {
        let dataList = {}
        that.$message('未查到相关信息！')
        commit(types.SEARCHTOTALORDERS, {
          dataDetail: dataList
        })
      }
    })
  },
  getGoodsSalesStatistic ({commit}, data) {
    commit(types.CHANGESEARCHDATA, data)
    let that = data.that
    api.getGoodsSales(data.data).then(({ data }) => {
      commit('REMOVELOADING')
      if (data.code === 0) {
        data.data.startDay = data.data.startDay.substring(0, 4) + '-' + data.data.startDay.substring(4, 6) + '-' + data.data.startDay.substring(6, 8)
        data.data.endDay = data.data.endDay.substring(0, 4) + '-' + data.data.endDay.substring(4, 6) + '-' + data.data.endDay.substring(6, 8)
        data.data.list.forEach(function (val, index) {
          val.os_day = val.os_day.substring(0, 4) + '-' + val.os_day.substring(4, 6) + '-' + val.os_day.substring(6, 8)
        })
        commit(types.SEARCHGOODSSALES, {
          dataDetail: data.data
        })
      } else {
        let dataList = {}
        that.$message('未查到相关信息！')
        commit(types.SEARCHGOODSSALES, {
          dataDetail: dataList
        })
      }
    })
  },
  // 获取套餐卡销量统计
  getSetMenuSales ({commit}, data) {
    commit(types.CHANGESEARCHDATA, data)
    let that = data.that
    api.getSetMenuSales(data.data)
      .then(({data}) => {
        commit('REMOVELOADING')
        if (data.code === 0) {
          if (data.data.list.length > 0) {
            data.data.startDay = data.data.startDay.substring(0, 4) + '-' + data.data.startDay.substring(4, 6) + '-' + data.data.startDay.substring(6, 8)
            data.data.endDay = data.data.endDay.substring(0, 4) + '-' + data.data.endDay.substring(4, 6) + '-' + data.data.endDay.substring(6, 8)
            commit(types.SEARCHSETMENUSALES, {
              dataDetail: data.data
            })
          } else {
            that.$message.error('未查到相关信息！')
            commit(types.SEARCHSETMENUSALES, {
              dataDetail: {}
            })
          }
        }
      })
  },
  // 用户统计
  getUserNumStatistic ({commit}, data) {
    commit(types.CHANGESEARCHDATA, data)
    let that = data.that
    api.getUserNum(data.data).then(({ data }) => {
      commit('REMOVELOADING')
      if (data.code === 0) {
        let dataList = data.data
        data.data.startDay = data.data.startDay.substring(0, 4) + '-' + data.data.startDay.substring(4, 6) + '-' + data.data.startDay.substring(6, 8)
        data.data.endDay = data.data.endDay.substring(0, 4) + '-' + data.data.endDay.substring(4, 6) + '-' + data.data.endDay.substring(6, 8)
        data.data.list.forEach(function (val, index) {
          val.os_day = val.os_day.substring(0, 4) + '-' + val.os_day.substring(4, 6) + '-' + val.os_day.substring(6, 8)
        })
        commit(types.SEARCHUSERNUM, {
          dataDetail: dataList
        })
      } else {
        let dataList = {}
        that.$message('未查到相关信息！')
        commit(types.SEARCHUSERNUM, {
          dataDetail: dataList
        })
      }
    })
  },
  // 导出Excel
  eportTurnoverExcel ({commit}, data) {
    let urlData = ''
    for (var i in data) {
      urlData += i + '=' + data[i] + '&'
    }
    api.exportTurnoverTable(data).then((res) => {
      window.location = baseURL.baseUrl + '/statis/order/exportRevenue?' + urlData
    })
  },
  exportSetMenuTurnoverTable ({commit}, data) {
    let urlData = ''
    for (var i in data) {
      urlData += i + '=' + data[i] + '&'
    }
    api.exportSetMenuTurnoverTable(data)
      .then(({data}) => {
        window.location = baseURL.baseUrl + '/statis/giftcart/exportRevenue?' + urlData
      })
  },
  eportTotalOrdersExcel ({commit}, data) {
    let urlData = ''
    for (var i in data) {
      urlData += i + '=' + data[i] + '&'
    }
    api.exportTotalOrdersTable(data).then(({ data }) => {
      window.location = baseURL.baseUrl + '/statis/order/exportOrder?' + urlData
    })
  },
  eportGoodsSalesExcel ({commit}, data) {
    let urlData = ''
    for (var i in data) {
      urlData += i + '=' + data[i] + '&'
    }
    api.exportGoodsSalesTable(data).then(({ data }) => {
      window.location = baseURL.baseUrl + '/statis/goods/exportGoodsSale?' + urlData
    })
  },
  exportSetMenuSalesTable ({commit}, data) {
    let urlData = ''
    for (var i in data) {
      urlData += i + '=' + data[i] + '&'
    }
    api.exportSetMenuSalesTable(data)
      .then(({data}) => {
        window.location = baseURL.baseUrl + '/statis/giftcart/exportSales?' + urlData
      })
  },
  eportUserNumExcel ({commit}, data) {
    let urlData = ''
    for (var i in data) {
      urlData += i + '=' + data[i] + '&'
    }
    api.exportUserNumTable(data).then(({ data }) => {
      window.location = baseURL.baseUrl + '/statis/user/exportUser?' + urlData
    })
  },
  // 分页
  getPagenationList ({commit, dispatch}, data) {
    let searchData = state.searchData
    searchData.data.page = data.page
    if (data.type === 'setMenu') {
      dispatch('getSetMenuTurnover', searchData)
    }
    if (data.type === 'turnover') {
      dispatch('getTurnoverStatistic', searchData)
    }
    if (data.type === 'totalOrder') {
      dispatch('getTotalOrdersStatistic', searchData)
    }
    if (data.type === 'userNum') {
      dispatch('getUserNumStatistic', searchData)
    }
    if (data.type === 'goodsSales') {
      dispatch('getGoodsSalesStatistic', searchData)
    }
    if (data.type === 'setMenuSales') {
      dispatch('getSetMenuSales', searchData)
    }
  }

}

// mutations
const mutations = {
  [types.ADDLOADING] (state) {
    state.loading = true
  },
  [types.REMOVELOADING] (state) {
    state.loading = false
  },
  [types.SEARCHTURNOVER] (state, action) {
    state.turnoverData = action.dataDetail
  },
  [types.SEARCHSETMENUTURNOVER] (state, action) {
    state.setMenuTurnoverData = action.dataDetail
  },
  [types.SEARCHTOTALORDERS] (state, action) {
    state.totalOrdersData = action.dataDetail
  },
  [types.CHANGESEARCHDATA] (state, data) {
    state.searchData = data
  },
  [types.SEARCHGOODSSALES] (state, action) {
    state.goodsSalesData = action.dataDetail
  },
  [types.SEARCHSETMENUSALES] (state, action) {
    state.setMenuSalesData = action.dataDetail
  },
  [types.SEARCHUSERNUM] (state, action) {
    state.userNumData = action.dataDetail
  }
}
export default {
  state,
  mutations,
  actions
}
