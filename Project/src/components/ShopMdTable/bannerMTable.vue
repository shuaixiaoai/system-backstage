<template>
  <div class="bannerMTable">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%">
        <el-table-column
          prop="banner_id"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="名称"
          width="180">
        </el-table-column>
         <el-table-column
           prop="type_value"
           label="操作值"
           width="180">
         </el-table-column>
         <el-table-column
           prop="shop_name"
           label="已选店铺">
           <template scope="scope">
              <span v-for="item in scope.row.shop_name" class="detail_list">{{item}}</span>
           </template>
         </el-table-column>
         <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template scope="scope">
              <el-button @click.prevent="editBanner(scope.$index,tableData)" type="primary" size="mini" icon="edit">修改</el-button>
              <el-button @click.prevent="deleteBanner(scope.$index,tableData)" type="danger" size="mini" icon="delete">删除</el-button>
            </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'bannerMTable',
  data () {
    return {
      bannerId: '',
      loading: false
    }
  },
  mounted () {
    this.loading = true
    let data = {
      that: this
    }
    this.getBannersList(data)
  },
  computed: {
    ...mapState({
      // disabled: ({shopmodule}) => shopmodule.disabled,
      tableData: ({shopmodule}) => shopmodule.bannersList
    })
  },
  methods: {
    ...mapActions([
      'getBannersList',
      'deleteBanners'
    ]),
    editBanner (index, row) {
      // console.log(123, row[index])
      let bannerId = row[index].banner_id
      this.$router.push({path: '/shopmodule/editBanner?', query: {bannerId: bannerId}})
    },
    deleteBanner (index, row) {
      // let sendData = {}
      // sendData.bannerId = row[index].banner_id
      // let data = {}
      // data.sendData = sendData
      // data.that = this
      // this.deleteBanners(data)
      this.$confirm('此操作将永久删除该Banner，是否继续？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sendData = {}
        sendData.bannerId = row[index].banner_id
        let data = {}
        data.sendData = sendData
        data.that = this
        this.deleteBanners(data)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.detail_list {
  margin-right: 10px;
  padding: 4px 12px;
  color: #fff;
  background: #20a0ff;
  border-radius: 4px;
}
</style>
