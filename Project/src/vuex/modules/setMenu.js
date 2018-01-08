import api from '../../api/axios'
import baseUrl from '../../utils/baseUrl'
import utils from '../../utils/utils'
import { Message } from 'element-ui'

const state = {
  basicThemeInfo: {},         // 主题列表数据
  setMenuGoodsList: {},        // 套餐商品列表数据
  giftCardList: {},            // 礼品卡列表
  goodsList: [],                // 商品列表
  category_id: '',             // 存储主题创建成功返回category_id
  themeDetail: {},             // 主题详情
  loading: true               // loading state
}

const types = {
  GETTHEMELIST: 'GETTHEMELIST',
  GETSETMENUGOODSLIST: 'GETSETMENUGOODSLIST',
  GETGIFTCARDLIST: 'GETGIFTCARDLIST',
  GETGOODSLIST: 'GETGOODSLIST',
  SETCATEGORYID: 'SETCATEGORYID',
  GETTHEMDETAIL: 'GETTHEMDETAIL',
  CHANGELOADING: 'CHANGELOADING',    // 修改loading state
  INITLOADING: 'INITLOADING'         // 初始化loading state
}
// actions
const actions = {
  // 获取主题列表
  getThemeList ({commit}, data) {
    api.getThemeList(data)
      .then(({data}) => {
        commit(types.CHANGELOADING)
        if (data.code === 0) {
          commit(types.GETTHEMELIST, {
            detail: data.data
          })
        } else {
          Message.error(data.message)
        }
      })
  },
  // 获取商品套餐列表
  getSetMenuGoodsList ({commit}, data) {
    api.getThemeSetMenuGoodsList(data)
      .then(({data}) => {
        commit(types.CHANGELOADING)
        if (data.code === 0) {
          commit(types.GETSETMENUGOODSLIST, {
            detail: data.data
          })
        } else {
          Message.error(data.message)
        }
      })
  },
  // 获取礼品卡列表
  getGiftCardList ({commit}, data) {
    api.getGiftCardList(data)
      .then(({data}) => {
        commit(types.CHANGELOADING)
        if (data.code === 0) {
          commit(types.GETGIFTCARDLIST, {
            detail: data.data
          })
        } else {
          Message.error(data.message)
        }
      })
  },
  // 删除主题
  deleteSetMenuTheme ({commit, dispatch}, data) {
    let that = data.that
    api.deleteSetMenuTheme(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          that.$message({
            message: '您已删除该主题信息！',
            type: 'success'
          })
          dispatch('getThemeList')
        } else {
          Message.error(data.message)
        }
      })
  },
  // 获取主题详情
  getThemeDetail ({commit}, data) {
    let that = data.that
    api.getThemeDetail(data.data)
      .then(({data}) => {
        console.log(data.data.itmes.length)
        if (data.code === 0) {
          // utils.storage.setItem('themeDetailForEdit', JSON.stringify(data.data))
          data.data.end_time = data.data.end_time * 1000
          data.data.create_time = utils.formatDateWithLine(new Date(data.data.create_time * 1000))
          for (let i = 0; i < data.data.itmes.length; i++) {
            data.data.itmes[i].create_time = utils.formatDateWithLine(new Date(data.data.itmes[i].create_time * 1000))
          }
          that.maxLength = 5 - data.data.itmes.length
          commit(types.GETTHEMDETAIL, {
            detail: data.data
          })
        } else {
          that.$message.error(data.message)
        }
      })
  },
  // 创建主题
  createTheme ({commit}, data) {
    let that = data.that
    api.createTheme(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          that.disabled = true
          that.$message.success('创建主题信息成功')
          that.successDisable = true
          commit(types.SETCATEGORYID, {
            categoryId: data.data.category_id
          })
        } else {
          Message.error(data.message)
        }
      })
  },
  // 创建卡面
  createCardSurface ({commit}, data) {
    let that = data.that
    api.createCardSurface(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          that.$message.success('创建卡面成功！')
          that.$router.push('/setmenuManage/cardList')
        } else {
          that.savedDisabled = false
          Message.error(data.message)
        }
      })
  },
  // 修改主题信息
  updateCategory ({commit, dispatch}, data) {
    let categoryId = data.data.categoryId
    let that = data.that
    api.updateCategory(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          console.log(that)
          that.$notify.success('主题信息修改成功！')
          // that.disabled = true
          let sendData = {
            data: {
              categoryId: categoryId
            },
            that: that
          }
          dispatch('getThemeDetail', sendData)
        } else {
          Message.error(data.message)
        }
      })
  },
  // 新增套餐商品
  createNewSetMenuGoods ({commit, dispatch}, data) {
    let that = data.that
    api.createSetMenuGoods(data.data)
      .then(({data}) => {
        // console.log(data)
        if (data.code === 0) {
          that.$message({
            message: '恭喜你，新增套餐商品创建成功！',
            type: 'success'
          })
          dispatch('getSetMenuGoodsList')
          that.addDialogFormVisible = false
          that.addForm = {
            price: '',
            state: '0',
            goodsId: ''
          }
        } else if (data.code === 1) {
          that.$message.error(data.message)
        }
      })
  },
  // 修改套餐商品
  editSetMenuGoods ({commit, dispatch}, data) {
    let that = data.that
    api.editSetMenuGoods(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          that.$message.success('恭喜你，修改成功！')
          dispatch('getSetMenuGoodsList')
          that.dialogFormVisible = false
        } else {
          this.$message.error(data.message)
        }
      })
  },
  // 删除套餐商品
  deleteSetMenuGoods ({commit, dispatch}, data) {
    let that = data.that
    api.deleteSetMenuGoods(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          that.$message.success('删除成功！')
          dispatch('getSetMenuGoodsList')
        } else {
          Message.error(data.message)
        }
      })
  },
  // 获取商品列表
  getAllGoodsList ({commit}) {
    api.getAllGoodsList()
      .then(({data}) => {
        if (data.code === 0) {
          commit(types.GETGOODSLIST, {
            list: data.data.list
          })
        } else {
          Message.error(data.message)
        }
      })
  }
}
// mutations
const mutations = {
  [types.INITLOADING] (state) {
    state.loading = true
  },
  [types.CHANGELOADING] (state) {
    state.loading = false
  },
  [types.GETTHEMELIST] (state, action) {
    state.basicThemeInfo = action.detail
  },
  [types.GETSETMENUGOODSLIST] (state, action) {
    state.setMenuGoodsList = action.detail
  },
  [types.GETGIFTCARDLIST] (state, action) {
    state.giftCardList = action.detail
  },
  [types.GETGOODSLIST] (state, action) {
    state.goodsList = action.list
  },
  [types.SETCATEGORYID] (state, action) {
    state.category_id = action.categoryId
  },
  [types.GETTHEMDETAIL] (state, action) {
    state.themeDetail = action.detail
  }
}
export default {
  state,
  mutations,
  actions
}
