import * as types from './types'
import * as mutations from './mutations'
import api from '../api/axios'
import utils from '../utils/utils'

// actions 就是在操作mutations
export default {
  UserLogin ({ commit }, data) {
    localStorage.setItem('isLogin', data)
    commit(types.LOGIN, data)
  },
  userLogout ({ commit }) {
    utils.storage.deleteItem('isLogin')
  },
  printerOrder ({ commit }, data) {
    let that = data.that
    api.printerOrder(data.data)
      .then(({data}) => {
        console.log(data)
        if (data.code === 0) {
          that.$message.success('订单打印成功！')
        } else {
          that.$message.error(data.message)
        }
      })
  }
}
