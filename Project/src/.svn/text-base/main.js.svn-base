// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './vuex'
import Vuex from 'vuex'
import moment from 'moment'
import utils from './utils/utils'

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(ElementUI)
Vue.use(Vuex)

router.beforeEach((to, from, next) => {
  let isLogin = store.state.isLogin
  let token = utils.storage.getItem('token')
  // console.log(token)
  if (to.meta.requireAuth) {
    if (isLogin) {
      // console.log('right', to)
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    // console.log(to)
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// 自定义全局时间过滤器
// Vue.filter('moment', function (value, formatString) {
//   formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
//   return moment(value).format(formatString)
// })
// new Vue({
//   el: 'title',
//   computed: {
//     title () {
//       return store.state.title
//     }
//   }
// })
