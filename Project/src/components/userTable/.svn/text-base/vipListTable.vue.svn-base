<template>
  <div class="vipListTable">
      <div class="operate">
          <el-button type="info" @click="exportToExcel">导出Excel</el-button>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%; font-size: 12px;">
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
           width="140"
           label="来源">
            <template scope="scope">
              <span v-if="scope.row.vip_from==='1'">小程序下单</span>
              <span v-if="scope.row.vip_from==='2'">填写会员卡号</span>
              <span v-if="scope.row.vip_from==='3'">后台设置</span>
            </template>
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
             <el-table-column
                prop="phone"
                label="成为会员时间"
                width="220"
                :formatter="dateFormat">
              </el-table-column>
         <el-table-column
            fixed="right"
            label="操作"
            width="280">
            <template scope="scope">
              <el-button class="vip-operate-btn" @click.prevent="viewRecord(scope.$index,tableData)" type="primary" size="mini">积分记录</el-button>
              <el-button class="vip-operate-btn" @click.prevent="addscore(scope.$index,tableData)" type="danger" size="mini">加积分</el-button>
              <el-button class="vip-operate-btn" @click.prevent="decreasescore(scope.$index,tableData)" type="danger" size="mini">减积分</el-button>
              <el-button class="vip-operate-btn" @click.prevent="addToBlackList(scope.$index,tableData)" type="danger" size="mini">拉黑</el-button>
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
  name: 'vipListTable',
  data () {
    return {
      loading: false,
      page: 1
    }
  },
  mounted () {
    this.loading = true
    let senddata = {
      data: {
        type: 'vip',
        data: 1
      },
      that: this
    }
    this.getVipList(senddata)
    this.$store.commit('RESETSEARCHSTATE')
  },
  computed: {
    ...mapState({
      tableData: ({user}) => user.userList,
      total: ({user}) => user.total
    })
  },
  methods: {
    ...mapActions([
      'getVipList',
      'changeCurrentPoint',
      'moveToBlackList',
      'getPagenationList',
      'exportUser'
    ]),
    exportToExcel () {
      let data = {
        type: 'vip'
      }
      this.exportUser(data)
    },
    viewRecord (index, row) {
      let userId = row[index].user_id
      this.$router.push({path: '/userManage/scoreRecord?', query: {userId: userId}})
    },
    addscore (index, row) {
      // console.log(index, row[index])
      this.$prompt('请输入积分', '加积分', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputPattern: /^\+?[1-9]\d*$/,
        inputErrorMessage: '只能输入大于0的整数'
      }).then(({ value }) => {
        this.changePoint = value
        let sendData = {
          data: {
            userId: row[index].user_id,
            type: 'add',
            points: parseInt(this.changePoint)
          },
          userType: 'vip',
          page: this.page
        }
        // console.log(sendData)
        this.changeCurrentPoint(sendData)
      }).catch(() => {
        console.log('取消')
      })
    },
    decreasescore (index, row) {
      this.$prompt('请输入积分', '加积分', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputPattern: /^\+?[1-9]\d*$/,
        inputErrorMessage: '只能输入大于0的整数'
      }).then(({ value }) => {
        if (value <= parseInt(row[index].points)) {
          this.changePoint = value
          let sendData = {
            data: {
              userId: row[index].user_id,
              type: 'cut',
              points: parseInt(this.changePoint)
            },
            userType: 'vip',
            page: this.page
          }
          this.changeCurrentPoint(sendData)
        } else {
          this.$message.error('操作积分值不得大于现有积分！')
        }
      }).catch(() => {
        console.log('取消')
      })
    },
    addToBlackList (index, row) {
      let sendData = {
        data: {
          userId: row[index].user_id
        },
        userType: 'vip',
        page: this.page
      }
      this.moveToBlackList(sendData)
    },
    dateFormat: function (row, column) {
      var date = row[column.property] * 1000
      if (date !== '') {
        return moment(date).format('YYYY-MM-DD, H: mm: ss')
      }
    },
    handleCurrentChange (page) {
      let data = {
        type: 'vip',
        page: page
      }
      this.page = page
      this.getUsersList(data)
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
