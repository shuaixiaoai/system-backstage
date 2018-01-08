<template>
  <div class="vipSetupTable">
      <div class="operate">
          <el-button type="info" @click="dialogFormVisible = true">新增会员等级</el-button>
      </div>
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="user_id"
          label="会员等级">
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="对应积分">
        </el-table-column>
         <el-table-column
            fixed="right"
            label="操作"
            width="140">
            <template scope="scope">
              <el-button @click.prevent="edit(scope.$index,tableData)" type="primary" size="mini" icon="edit">修改</el-button>
            </template>
          </el-table-column>
    </el-table>
    <el-dialog title="新增会员等级" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="padding-left: 30%;">
        <el-form-item label="等级名称" :label-width="formLabelWidth" class="item">
          <el-input v-model="form.name" auto-complete="off" class="input-layer"></el-input>
        </el-form-item>
        <el-form-item label="对应积分" :label-width="formLabelWidth" class="item">
          <el-input v-model="form.score" auto-complete="off" class="input-layer"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkToAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'vipSetupTable',
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        name: '',
        score: ''
      },
      formLabelWidth: '180'
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      // tableData: ({user}) => user.normalUserList
    })
  },
  methods: {
    ...mapActions([
      // 'getUsersList'
    ]),
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    addVipLevel () {
      console.log('addVipLevel')
    },
    edit (index, row) {
      console.log('edit')
      // console.log(index, row[index])
      // let userId = row[index].user_id
      // this.$router.push({path: '/userManage/scoreRecord'})
      // this.$router.push({path: '/userManage/scoreRecord?', query: {userId: userId}})
    },
    checkToAdd () {
      console.log(this.form)
      // this.dialogFormVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.operate{
    margin: 30px 0;
}
.input-layer{
  width: 240px;
}
</style>
