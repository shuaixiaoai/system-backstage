import api from '../../api/axios'
import baseURL from '../../utils/baseUrl'

const state = {
  userList: [],
  logsList: [],
  points: {},
  blackUserList: [],
  searchResultData: [],
  searchData: {},
  isSearch: false,
  type: '',       // 标记类型
  listRequestData: {},
  total: 0    // 页码
}

const types = {
  GETNORMALUSERLIST: 'GETNORMALUSERLIST',
  CHANGEPOINTlOG: 'CHANGEPOINTlOG',
  GETBLACKUSERLIST: 'GETBLACKUSERLIST',
  GETSEARCHRESULTDATA: 'GETSEARCHRESULTDATA',
  CHANGESEARCHSTATE: 'CHANGESEARCHSTATE',
  RESETSEARCHSTATE: 'RESETSEARCHSTATE',
  RECORDSEARCHDATA: 'RECORDSEARCHDATA',
  UPDATETOTAL: 'UPDATETOTAL',
  CHANGETYPEFLAG: 'CHANGETYPEFLAG'
}

// actions
const actions = {
  // 获取用户列表
  getUsersList ({commit}, data) {
    state.listRequestData = data
    api.getUsersList(data)
      .then(({data}) => {
        if (data.code === 0) {
          commit(types.GETNORMALUSERLIST, {
            list: data.data.list
          })
          commit(types.UPDATETOTAL, {
            total: data.data.count
          })
        }
      })
  },
  // 获取vip列表
  getVipList ({commit}, data) {
    let that = data.that
    state.listRequestData = data
    api.getVipList(data.data)
      .then(({data}) => {
        that.loading = false
        if (data.code === 0) {
          commit(types.GETNORMALUSERLIST, {
            list: data.data.list
          })
          commit(types.UPDATETOTAL, {
            total: data.data.count
          })
        }
      })
  },
  // 升级为会员
  upgradeTobeVip ({dispatch, commit}, data) {
    api.upgradeToVip(data)
      .then(({data}) => {
        if (data.code === 0) {
          let senddata = {
            type: 'normal'
          }
          dispatch('getUsersList', senddata)
        }
      })
  },
  // 改变积分
  changeCurrentPoint ({dispatch, commit}, data) {
    let userType = data.userType
    let page = data.page
    api.changePoint(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          let senddata = {
            page: page
          }
          if (userType === 'vip') {
            dispatch('getVipList', senddata)
          }
          if (userType === 'normal') {
            dispatch('getUsersList', senddata)
          }
          if (state.isSearch) {
            let data = {
              data: state.searchData
            }
            console.log(data)
            dispatch('userSearch', data)
          }
        }
      })
  },
  // 积分记录
  getUserPointLogs ({commit}, data) {
    api.getPointLogs(data)
      .then(({data}) => {
        if (data.code === 0) {
          let list = data.data.logsList
          let points = data.data.points
          commit(types.CHANGEPOINTlOG, {
            list: list,
            points: points
          })
        }
      })
  },
  // 加入黑名单
  moveToBlackList ({dispatch, commit}, data) {
    let page = data.page
    let userType = data.userType
    api.moveToBlackList(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          let senddata = {
            page: page
          }
          dispatch('getVipList', senddata)
          if (state.isSearch) {
            let data = {
              data: state.searchData
            }
            dispatch('userSearch', data)
          }
        }
      })
  },
  // 获取黑名单列表
  getBlackUserList ({commit}, data) {
    let that = data.that
    api.getBlackUserList(data.data)
      .then(({data}) => {
        that.loading = false
        if (data.code === 0) {
          let list = data.data.list
          commit(types.GETBLACKUSERLIST, {
            list: list
          })
          commit(types.UPDATETOTAL, {
            total: data.data.count
          })
          commit(types.CHANGETYPEFLAG)
        }
      })
  },
  // 移除黑名单
  removeBackToBlackUser ({dispatch, commit}, data) {
    api.removeBlackList(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          dispatch('getBlackUserList')
          if (state.isSearch) {
            let data = {
              data: state.searchData
            }
            dispatch('userSearch', data)
          }
        }
      })
  },
  // 用户搜索
  userSearch ({commit}, data) {
    let searchData = data.data
    api.userSearch(data.data)
      .then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          commit(types.GETSEARCHRESULTDATA, {
            list: data.data.list
          })
          commit(types.CHANGESEARCHSTATE, {
            isSearch: true
          })
          commit(types.RECORDSEARCHDATA, {
            searchData: searchData
          })
          commit(types.UPDATETOTAL, {
            total: data.data.count
          })
        }
      })
  },
  // 用户列表分页
  getPagenationLists ({dispatch}, data) {
    if (state.isSearch) {
      let sendData = {
        data: state.searchData
      }
      sendData.data.page = data
      dispatch('userSearch', sendData)
    } else if (state.type === 'black') {
      console.log('woshihei')
    } else {
      let sendData = state.listRequestData
      sendData.page = data
      dispatch('getUsersList', sendData)
    }
  },
  // 用户导出
  exportUser ({commit}, data) {
    let type = data.type
    api.exportAsExcel(data)
      .then(({data}) => {
        window.location = baseURL.baseUrl + '/users/export?' + 'type=' + type
      })
  }
}

// mutations
const mutations = {
  [types.GETNORMALUSERLIST] (state, action) {
    state.userList = action.list
  },
  [types.CHANGEPOINTlOG] (state, action) {
    state.logsList = action.list
    state.points = action.points
  },
  [types.GETBLACKUSERLIST] (state, action) {
    state.blackUserList = action.list
  },
  [types.GETSEARCHRESULTDATA] (state, action) {
    state.searchResultData = action.list
  },
  [types.CHANGESEARCHSTATE] (state, action) {
    state.isSearch = action.isSearch
  },
  [types.RECORDSEARCHDATA] (state, action) {
    state.searchData = action.searchData
  },
  [types.RESETSEARCHSTATE] (state) {
    state.isSearch = false
  },
  [types.UPDATETOTAL] (state, action) {
    state.total = action.total
  },
  [types.CHANGETYPEFLAG] (state) {
    state.type = 'black'
  }
}
export default {
  state,
  mutations,
  actions
}
