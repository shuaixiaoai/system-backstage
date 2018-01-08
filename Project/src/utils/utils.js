import moment from 'moment'
// 设置与获取Cookie
let Cookie = {}
Cookie.write = function (key, value, duration) {
  var d = new Date()
  console.log(d)
  d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * 30)
  document.cookie = key + '=' + encodeURI(value) + ';expires=' + d.toGMTString()
}
Cookie.read = function (key) {
  var arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'))
  if (arr !== null) {
    return decodeURIComponent(arr[2])
  } else {
    return ''
  }
}
Cookie.delete = function (key) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cookieVal = Cookie.read(key)
  if (cookieVal !== null) {
    document.cookie = name + '=' + cookieVal + ';expires=' + exp.toGMTString()
  }
}
// 定义本地存储对象
let storage = {
  getItem: function (key) {
    return window.localStorage ? localStorage.getItem(key) : Cookie.read(key)
  },
  setItem: function (key, val) {
    // console.log(window.localStorage)
    if (window.localStorage) {
      localStorage.setItem(key, val)
    } else {
      Cookie.write(key, val)
    }
  },
  deleteItem: function (key) {
    if (window.localStorage) {
      localStorage.removeItem(key)
    } else {
      Cookie.delete(key)
    }
  }
}
// function dateFormat (timer) {
//   var date = rowtimer * 1000
//   if (date !== '') {
//     return moment(date).format('YYYY-MM-DD, h: mm: ss')
//   }
// }
// 格式化时间
function formatTime (date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [hour, minute, second].map(formatNumber).join(':')
}
// 格式化日期
function formatDate (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('')
}
function formatDateWithLine (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 验证输入是否为数字
function isNum (num) {
  var reNum = /^\d*$/
  return (reNum.test(num))
}

export default {
  storage,
  formatDate,
  formatTime,
  formatDateWithLine,
  isNum
}
