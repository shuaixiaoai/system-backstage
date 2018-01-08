
import * as types from './types'
const mutations = {
  [types.LOGIN]: (state, data) => {
    // 把isLogin存到本地
    // window.localStorage.setItem('isLogin', data)
    // 更改isLogin值
    state.isLogin = data
  }
}
export default mutations
