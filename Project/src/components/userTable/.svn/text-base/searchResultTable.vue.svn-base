<template>
  <div class="searchResultTable">
      <el-table
        :data="tableData"
        ref="multipleTable"
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
             prop="points"
             label="可用积分"
             width="120">
           </el-table-column>
           <el-table-column
             prop="points"
             label="累计积分"
             width="120">
           </el-table-column>
           <el-table-column
             prop="nick_name"
             label="微信昵称"
             width="220">
           </el-table-column>
            <el-table-column
               prop="level"
               label="会员等级"
               width="100">
             </el-table-column>
             <el-table-column
                prop="phone"
                label="成为会员时间"
                width="120">
              </el-table-column>
         <el-table-column
            fixed="right"
            label="操作"
            width="300">
            <template scope="scope">
              <el-button class="vip-operate-btn" @click.prevent="viewRecord(scope.$index,tableData)" type="primary" size="mini">积分记录</el-button>
              <el-button class="vip-operate-btn" @click.prevent="addscore(scope.$index,tableData)" type="danger" size="mini">加积分</el-button>
              <el-button class="vip-operate-btn" @click.prevent="decreasescore(scope.$index,tableData)" type="danger" size="mini">减积分</el-button>
              <span v-if="scope.row.is_vip==='1'">
                <el-button class="vip-operate-btn" @click.prevent="removeBlackList(scope.$index,tableData)" type="danger" size="mini" v-if="scope.row.is_black==='1'">移除黑名单</el-button>
                <el-button class="vip-operate-btn" @click.prevent="addToBlackList(scope.$index,tableData)" type="danger" size="mini" v-if="scope.row.is_black==='0'">拉黑</el-button>
              </span>
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
  name: 'searchResultTable',
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      tableData: ({user}) => user.searchResultData,
      total: ({user}) => user.total
    })
  },
  methods: {
    ...mapActions([
      'getUsersList',
      'changeCurrentPoint',
      'moveToBlackList',
      'removeBackToBlackUser',
      'getPagenationLists'
    ]),
    handleCurrentChange (page) {
      this.getPagenationLists(page)
    },
    exportToExcel () {
      console.log('导出excel')
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
          userType: 'vip'
        }
        console.log(sendData)
        this.changeCurrentPoint(sendData)
        // this.$store.commit('GETSEARCHRESULTDATA')
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
            userType: 'vip'
          }
          this.changeCurrentPoint(sendData)
        } else {
          this.$message.error('操作积分值不得大于现有积分！')
        }
      }).catch(() => {
        console.log('取消')
      })
    },
    removeBlackList (index, row) {
      let sendData = {
        data: {
          userId: row[index].user_id
        },
        userType: 'vip'
      }
      this.removeBackToBlackUser(sendData)
    },
    addToBlackList (index, row) {
      let sendData = {
        data: {
          userId: row[index].user_id
        },
        userType: 'vip'
      }
      console.log(sendData)
      this.moveToBlackList(sendData)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.vip-operate-btn{
  margin-bottom: 3px;
  &:first-child{
    margin-top: 5px;
  }
}
</style>
