<template>
  <div class="bannerMTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="points_log_id"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="describe"
          label="事件">
        </el-table-column>
         <el-table-column
           prop="points"
           label="积分变动">
         </el-table-column>
         <el-table-column
           prop="create_time"
           label="时间"
           :formatter="dateFormat">
         </el-table-column>
    </el-table>
    <div class="total">
      可用积分： <span>{{points.points}}</span>、  累计积分： <span>{{points.total_points}}</span>；
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'recordTable',
  data () {
    return {
      // tableData: []
    }
  },
  mounted () {
    console.log(this.$route.query.userId)
    let data = {
      userId: this.$route.query.userId
    }
    this.getUserPointLogs(data)
  },
  computed: {
    ...mapState({
      tableData: ({user}) => user.logsList,
      points: ({user}) => user.points
    })
  },
  methods: {
    ...mapActions([
      'getUserPointLogs'
    ]),
    dateFormat: function (row, column) {
      var date = row[column.property] * 1000
      if (date !== '') {
        return moment(date).format('YYYY-MM-DD, H: mm: ss')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.total{
  font-size: 14px;
  text-align: right;
  margin: 16px 4px 0 0;
  span{
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
