<template>
  <div class="blackUserList">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%; font-size: 12px;"
        @selection-change="handleSelectionChange">
        <el-table-column
          label="序号"
          type="index"
          width="80">
        </el-table-column>
        <el-table-column
          prop="vip_code"
          label="会员编号"
          width="200">
        </el-table-column>
        <el-table-column
           prop="user_id"
           label="顾客ID">
         </el-table-column>
         <el-table-column
           prop="shop_name"
           label="来源">
         </el-table-column>
         <el-table-column
            prop="real_name"
            label="会员姓名"
            width="100">
          </el-table-column>
          <el-table-column
             prop="phone"
             label="电话"
             width="130">
           </el-table-column>
           <el-table-column
             prop="nick_name"
             label="微信昵称"
             width="220">
           </el-table-column>
           <el-table-column
             prop="points"
             label="可用积分"
             width="120">
           </el-table-column>
           <el-table-column
             prop="total_points"
             label="累计积分"
             width="120">
           </el-table-column>
            <el-table-column
               prop="level"
               label="会员等级"
               width="100">
             </el-table-column>
             <!-- <el-table-column
               prop="shop_name"
               label="成功订单数"
               width="120">
             </el-table-column> -->
             <el-table-column
                prop="phone"
                label="成为会员时间"
                width="120">
              </el-table-column>
              <!-- <el-table-column
                prop="shop_name"
                label="最近下单时间"
                width="120">
              </el-table-column> -->
         <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template scope="scope">
              <el-button class="vip-operate-btn" @click.prevent="removeBlackList(scope.$index,tableData)" type="danger" size="mini">移除黑名单</el-button>
            </template>
          </el-table-column>
    </el-table>
    <div class="block" v-if="total>10">
        <el-pagination
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'blackUserList',
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    // let data = {
    //   page: 1
    // }
    this.loading = true
    let senddata = {
      data: {
        page: 1
      },
      that: this
    }
    this.getBlackUserList(senddata)
    this.$store.commit('RESETSEARCHSTATE')
  },
  computed: {
    ...mapState({
      tableData: ({user}) => user.blackUserList,
      total: ({user}) => user.total
    })
  },
  methods: {
    ...mapActions([
      'removeBackToBlackUser',
      'getBlackUserList',
      'getPagenationList'
    ]),
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (page) {
      this.loading = true
      let senddata = {
        data: {
          page: page
        },
        that: this
      }
      this.getBlackUserList(senddata)
    },
    removeBlackList (index, row) {
      let sendData = {
        data: {
          userId: row[index].user_id
        },
        userType: 'vip'
      }
      this.removeBackToBlackUser(sendData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.operate{
    margin: 30px 0;
}
.vip-operate-btn{
  margin-bottom: 3px;
  &:first-child{
    margin-top: 5px;
  }
}
</style>
