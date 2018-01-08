<template>
  <div class="bannerMTable">
      <div class="operate">
          <el-button type="info" @click="exportToExcel">导出Excel</el-button>
      </div>
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column
          label="序号"
          type="index"
          width="80">
        </el-table-column> -->
        <el-table-column
          prop="user_id"
          label="顾客ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="real_name"
          label="姓名"
          width="120">
        </el-table-column>
         <el-table-column
           prop="phone"
           label="电话"
           width="120">
         </el-table-column>
         <el-table-column
           prop="nick_name"
           label="微信昵称"
           width="220">
         </el-table-column>
         <el-table-column
           prop="birthday"
           label="生日"
           width="120">
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
           prop="create_time"
           label="成为用户的时间"
           width="220"
           :formatter="dateFormat">
         </el-table-column>
         <el-table-column
            fixed="right"
            label="操作"
            width="320">
            <template scope="scope">
              <el-button @click.prevent="viewRecord(scope.$index,tableData)" type="primary" size="mini" class="btn-op">积分记录</el-button>
              <el-button @click.prevent="addscore(scope.$index,tableData)" type="danger" size="mini" class="btn-op">加积分</el-button>
              <el-button @click.prevent="decreasescore(scope.$index,tableData)" type="danger" size="mini" class="btn-op">减积分</el-button>
              <el-button @click.prevent="changeToVip(scope.$index,tableData)" type="primary" size="mini" class="btn-op">升级为会员</el-button>
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
  name: 'bannerMTable',
  data () {
    return {
      multipleSelection: [],
      changePoint: ''
    }
  },
  mounted () {
    let sendData = {
      data: {
        page: 1
      },
      type: 'normal'
    }
    this.getUsersList(sendData)
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
      'getUsersList',
      'upgradeTobeVip',
      'changeCurrentPoint',
      'getPagenationList',
      'exportUser'
    ]),
    handleSelectionChange (val) {
    },
    viewRecord (index, row) {
      console.log('记录')
      console.log(index, row[index])
      let userId = row[index].user_id
      this.$router.push({path: '/userManage/scoreRecord?', query: {userId: userId}})
    },
    addscore (index, row) {
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
          userType: 'normal'
        }
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
            userType: 'normal'
          }
          this.changeCurrentPoint(sendData)
        } else {
          this.$message.error('操作积分值不得大于现有积分！')
        }
      }).catch(() => {
        console.log('取消')
      })
    },
    dateFormat: function (row, column) {
      var date = row[column.property] * 1000
      if (date !== '') {
        return moment(date).format('YYYY-MM-DD, H: mm: ss')
      }
    },
    changeToVip (index, row) {
      let data = {
        userId: row[index].user_id
      }
      this.upgradeTobeVip(data)
    },
    handleCurrentChange (page) {
      let data = {
        type: 'normal',
        page: page
      }
      this.getUsersList(data)
      // this.getPagenationList(page)
    },
    exportToExcel () {
      let data = {
        type: 'normal'
      }
      this.exportUser(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.operate{
    margin: 30px 0;
}
.btn-op {
  margin-bottom: 12px;
}
</style>
