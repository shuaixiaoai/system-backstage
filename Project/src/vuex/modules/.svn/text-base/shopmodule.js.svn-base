import api from '../../api/axios'
import baseUrl from '../../utils/baseUrl'
import utils from '../../utils/utils'

const state = {
  // disabled: true,
  form: {
    name: '',
    src: '',
    typeId: '',
    typeValue: ''
  },
  fileList: [],
  file: '',
  // imgageUrl: '',
  options: [],
  value: '',
  // showPreviewFlag: 'false'
  bindArr: [
    {shopId: '', deadline: '', sortBy: '', isShow: '0'}
  ],
  editData: {},
  shopList: [],
  bannersList: [],   // Banner列表
  goodsList: [],
  goodsTotalNumber: 0,
  categoryList: [],    // 商品分类列表
  hasPropertyList: [],   // 已有商品属性列表
  multipPropertiesleSelection: [],  // 已有商品属性被选中列表
  currentGoodsId: 0,
  goodDetail: {}      // 商品详情
}

const types = {
  ADDBINDBANNER: 'ADDBINDBANNER',  // 增加绑定banner
  GETSHOPSLIST: 'GETSHOPSLIST',       // 获取下拉店铺列表
  GETBANNERSLIST: 'GETBANNERSLIST',   // 获取bannerlist
  CLEANOUTFORMDATA: 'CLEANOUTFORMDATA',  // 清空新增Banner表单数据
  GETEDITDETAIL: 'GETEDITDETAIL',    // 获取Banner详情
  GETGOODSLIST: 'GETGOODSLIST',      // 获取商品列表
  GETCATEGORYLIST: 'GETCATEGORYLIST',  // 获取商品分类列表
  GETPOSSESSEDPROPERTY: 'GETPOSSESSEDPROPERTY',    // 获取已有商品属性列表
  CHANGEPROPERTYSELECTED: 'CHANGEPROPERTYSELECTED',    // 改变已有属性的选中值
  CHANGECURRENTGOODSID: 'CHANGECURRENTGOODSID',    // 获取创建基本信息返回goodsId
  GETGOODDETAIL: 'GETGOODDETAIL'  // 获取商品详情
}
// actions
const actions = {
  // 创建Banner
  createNewBanner ({commit}, data) {
    let that = data.that
    api.creatNewBanner(data.data)
    .then(({ data }) => {
      if (data.code === 0) {
        that.$message({
          type: 'info',
          message: '新建成功！'
        })
        that.$router.push({path: '/shopmodule/bannerManage'})
      } else {
        that.$message({
          type: 'info',
          message: '新建Banner失败！'
        })
        that.$router.go(0)
      }
    })
  },
  // 获取下拉店铺列表
  getShopsList ({commit}, url) {
    api.getShopsList(url)
      .then(({data}) => {
        if (data.code === 0) {
          let dataList = data.data.list
          commit(types.GETSHOPSLIST, {
            shopList: dataList
          })
        }
      })
  },
  // 获取Banner列表
  getBannersList ({commit}, data) {
    let that = data.that
    api.getBannersList()
      .then(({data}) => {
        that.loading = false
        if (data.code === 0) {
          let dataList = data.data.list
          commit(types.GETBANNERSLIST, {
            shopList: dataList
          })
        }
      })
  },
  // 删除banner
  deleteBanners ({commit}, data) {
    let that = data.that
    api.deleteBanner(data.sendData)
      .then(({data}) => {
        if (data.code === 0) {
          that.$message({
            type: 'info',
            message: '删除成功！'
          })
          that.getBannersList()
          // that.$router.go(0)
        } else {
          that.$message({
            type: 'info',
            message: data.message
          })
        }
      })
  },
  // 获取banner详情
  getBannerDetail ({commit}, data) {
    api.getBannerDetail(data)
      .then(({data}) => {
        let reqDate = data.data
        commit(types.GETEDITDETAIL, {
          editData: reqDate
        })
      })
  },
  // 修改更新banner
  checkToUpdateBanner ({commit}, data) {
    let that = data.that
    api.editBanner(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          that.$router.push({path: '/shopmodule/bannerManage'})
          that.$message({
            type: 'info',
            message: '修改成功'
          })
        }
      })
  },
  // 以下为商品管理模块数据请求
  // 获取商品列表
  getGoodsList ({commit}, data) {
    let that = data.that
    api.getGoodsList(data.sendData)
      .then(({data}) => {
        if (data.code === 0) {
          let list = data.data.list
          let total = data.data.count
          commit(types.GETGOODSLIST, {
            list: list,
            total: total
          })
        } else if (data.code === 1) {
          that.$message({
            type: 'info',
            message: data.message
          })
        }
      })
  },
  // 获取商品分类列表
  getGoodsCategoryList ({commit}, data) {
    api.getGoodsCategoryList()
      .then(({data}) => {
        let list = data.data.list
        if (data.code === 0) {
          commit(types.GETCATEGORYLIST, {
            list: list
          })
        }
      })
  },
  // 创建新商品
  creatNewGood ({commit}, data) {
    let that = data.that
    api.creatNewGood(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          commit(types.CHANGECURRENTGOODSID, {
            goodsId: data.data.goodsId
          })
          that.$message({
            type: 'info',
            message: '商品创建成功！'
          })
          that.dongDisabled = true
          that.disabled = true
          that.successDisabled = true
        }
      })
  },
  // 获取已有商品属性列表
  getPropertiesList ({commit}, data) {
    let that = data.that
    api.getPossessedPropertyList()
      .then(({data}) => {
        if (data.code === 0) {
          commit(types.GETPOSSESSEDPROPERTY, {
            list: data.data.list
          })
        }
      })
  },
  // 创建商品属性
  createGoodsProperty ({commit}, data) {
    let that = data.that
    api.createNewGoodsProperty(data.sendData)
      .then(({data}) => {
        if (data.code === 0) {
          that.$message({
            type: 'info',
            message: '创建成功！'
          })
          that.allDisable = true
        }
      })
  },
  // 新建商品绑定店铺
  newGoodsBindShop ({commit}, data) {
    let that = data.that
    api.createdNewGoodBind(data.sendData)
      .then(({data}) => {
        if (data.code === 0) {
          that.$message({
            type: 'info',
            message: '创建成功！'
          })
          that.successFlag = true
        }
      })
  },
  // 获取商品详情
  getGoodDetail ({commit}, data) {
    let that = data.that
    api.getGoodDetail(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          commit(types.GETGOODDETAIL, {
            getData: data.data
          })
          utils.storage.setItem('goodDetailForEdit', JSON.stringify(data.data))
        }
      })
  },
  // 更新商品信息
  updateGoodInfo ({commit}, data) {
    let that = data.that
    api.updateGoodBasicInfo(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          that.editDisabled = true
          that.disabled = true
          that.$message.success('修改成功')
        } else {
          that.$message.error(data.message)
        }
      })
  },
  // 更新商品属性
  updateGoodProperty ({commit}, data) {
    let that = data.that
    api.updateGoodProperty(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          that.allDisable = true
          that.$message.success('修改成功')
        } else {
          that.$message.error(data.message)
        }
      })
  },
  // 更新绑定店铺
  updateGoodBindShop ({commit}, data) {
    let that = data.that
    api.updateGoodBindShop(data.data)
      .then(({data}) => {
        if (data.code === 0) {
          that.successFlag = true
          that.$message.success('修改成功')
        } else {
          that.$message.error(data.message)
        }
      })
  }
}
// mutations
const mutations = {
  [types.ADDBINDBANNER] (state) {
    // 变更状态
    state.bindArr.push({shopId: '', deadline: '', sortBy: '', isShow: '0'})
  },
  [types.GETSHOPSLIST] (state, action) {
    state.shopList = action.shopList
  },
  [types.GETBANNERSLIST] (state, action) {
    state.bannersList = action.shopList
  },
  [types.CLEANOUTFORMDATA] (state) {
    state.form.name = ''
    state.form.typeId = ''
    state.form.typeValue = ''
    state.form.src = ''
    let arr = [
      {shopId: '', deadline: '', sortBy: '', isShow: '0'}
    ]
    state.bindArr = arr
  },
  [types.GETEDITDETAIL] (state, action) {
    state.editData = action.editData
  },
  [types.GETGOODSLIST] (state, action) {
    state.goodsList = action.list
    state.goodsTotalNumber = action.total
  },
  [types.GETCATEGORYLIST] (state, action) {
    state.categoryList = action.list
  },
  [types.GETPOSSESSEDPROPERTY] (state, action) {
    state.hasPropertyList = action.list
  },
  [types.CHANGEPROPERTYSELECTED] (state, val) {
    state.multipPropertiesleSelection = val
  },
  [types.CHANGECURRENTGOODSID] (state, action) {
    state.currentGoodsId = action.goodsId
  },
  [types.GETGOODDETAIL] (state, action) {
    state.goodDetail = action.getData
  }
}
export default {
  state,
  mutations,
  actions
}
