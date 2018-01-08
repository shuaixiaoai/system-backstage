<template>
  <div class="has-property-list">
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="45">
        </el-table-column>
       <el-table-column
        prop="spec_group"
        label="属性名"
        width="180">
       </el-table-column>
       <el-table-column
        prop="multiselect"
        label="是否多选"
        width="100">
       </el-table-column>
       <el-table-column
         prop="selectable"
         label="是否多选"
         width="100">
       </el-table-column>
       <el-table-column
         prop="spec_list"
         label="属性值 (属性值、价格、是否默认)">
         <template scope="scope">
             <div v-for="item in scope.row.spec_list" class="detail_list">
               <span class="value-list">{{item.spec}}</span>
               <span class="value-list">{{item.price}}</span>
               <span class="value-list" v-if="item.default === '1'">默认</span>
             </div>
         </template>
       </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import api from '../../api/axios'
import utils from '../../utils/utils'

export default {
  name: 'PropertyTb',
  data () {
    return {
      tableData: []
    }
  },
  updated () {
    // console.log(this.tableData.length)
    // this.selectedTable()
  },
  mounted () {
    let data = {}
    // data.that = this
    // this.getPropertiesList(data)
    api.getPossessedPropertyList(data).then(({data}) => {
      this.tableData = data.data.list
      setTimeout(this.selectedTable(), 1000)   // 执行的先后顺序区别于macroTasks 和microTasks 
    })
  },
  methods: {
    ...mapActions([
      'getGoodsList',
      'getPropertiesList'
    ]),
    selectedTable () {
      console.log('select')
      let goodsId = JSON.parse(utils.storage.getItem('goodsId'))
      let data = {
        goodsId: goodsId
      }
      api.getGoodDetail(data).then(({data}) => {
        if (data.code === 0) {
          let goodDetail = data.data
          var groupid = []
          for (let i = 0; i < goodDetail.specs.length; i++) {
            groupid.push(parseInt(goodDetail.specs[i].group_id))
          }
          console.log(groupid)
          for (let j = 0; j < this.tableData.length; j++) {
            for (let i = 0; i < groupid.length; i++) {
              if (parseInt(groupid[i]) === parseInt(this.tableData[j].group_id)) {
                this.$refs.multipleTable.toggleRowSelection(this.tableData[j])
              }
            }
          }
        }
      })
      // var groupid = []
      // for (let i = 0; i < goodDetail.specs.length; i++) {
      //   groupid.push(parseInt(goodDetail.specs[i].group_id))
      // }
      // for (let j = 0; j < this.tableData.length; j++) {
      //   for (let i = 0; i < groupid.length; i++) {
      //     if (parseInt(groupid[i]) === parseInt(this.tableData[j].group_id)) {
      //       this.$refs.multipleTable.toggleRowSelection(this.tableData[j])
      //     }
      //   }
      // }
    },
    initData (row) {
      // if (rows) {
      // this.$refs.multipleTable.setCurrentRow(row)
      // }
    },
    handleSelectionChange (val) {
      this.multipPropertiesleSelection = val
      // console.log(123)
      // console.log(this.multipPropertiesleSelection)
      this.$store.commit('CHANGEPROPERTYSELECTED', val)
    },
    array_contain (arr, obj) {
      // console.log(arr, parseInt(obj))
      for (var i = 0; i < arr.length; i++) {
        console.log(arr[i] + '--------------' + obj)
        if (arr[i] === parseInt(obj)) {
          // return true
          console.log('true')
        }
        if (arr[i] !== parseInt(obj)) {
          // return false
          console.log('false')
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-pagination{
  text-align: right;
  margin-top: 30px;
}
.detail_list{
  display: inline-block;
  width: auto;
  padding: 2px 4px;
  background: #D3DCE6;
  margin-right: 6px;
  margin-bottom: 2px;
  border: 1px solid #ccc;
  border-radius: 2px;
  .value-list {
    display: inline-block;
    margin-right: 20px;
    &:first-child{
      margin-left: 10px;
    }
  }
}

</style>
