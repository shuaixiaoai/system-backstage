import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
// import ordersManage from './modules/ordersManage'
import statistic from './modules/statistic'
import shopmodule from './modules/shopmodule'
import user from './modules/user'
import setMenu from './modules/setMenu'
import vipMallGoods from './modules/vipMallGoods'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    // ordersManage,
    statistic,
    shopmodule,
    setMenu,
    user,
    vipMallGoods
  }
})

// if (module.hot) {
//   // 使actions mutations成为可热重载模块
//   module.hot.accept(['./mutations', './state'], () => {
//     const newMutations = require('./mutations').default
//     const newState = require('./state').default
//     // 热加载模块
//     store.hotUpdate({
//       mutations: newMutations,
//       state: newState
//     })
//   })
// }
