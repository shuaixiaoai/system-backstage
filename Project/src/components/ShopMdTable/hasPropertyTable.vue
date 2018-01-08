<template>
  <div class="bannerMTable">
      <el-table
        :data="tableData"
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

export default {
  name: 'PropertyTb',
  data () {
    return {
      // tableData: []
      // multipPropertiesleSelection: []
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      tableData: ({shopmodule}) => shopmodule.hasPropertyList,
      multipPropertiesleSelection: ({shopmodule}) => shopmodule.multipPropertiesleSelection
    })
  },
  methods: {
    ...mapActions([
      'getGoodsList'
    ]),
    handleSelectionChange (val) {
      // this.multipPropertiesleSelection = val
      // console.log(val)
      this.$store.commit('CHANGEPROPERTYSELECTED', val)
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
