import axios from 'axios'
import qs from 'qs'

// import   console.log('错误') from '../util/tool'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://betaadmin.huangziyi.cn/'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.log('错误')
  return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
  if (!res.data.success) {
      // _.toast(res.data.msg);
    return Promise.reject(res)
  }
  return res
}, (error) => {
  console.log('网络异')
  return Promise.reject(error)
})

export function fetch (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
    .then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
    // .catch((e) => {
    //   reject(e)
    // })
  })
}

export default {
  // 用户注册
  userRegister (data) {
    return fetch('/api/reister', data)
  },
  // 用户登录
  userLogin (data) {
    return fetch('/auth/login', data)
  },
  // 获取用户
  getUser () {
    return instance.get('/api/user')
  },
  // 删除用户
  delUser (data) {
    return fetch('/api/delUser', data)
  }
}
