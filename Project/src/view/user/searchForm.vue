<template>
  <div class="serchForm">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户ID" label-width="100px" class="form-list">
            <el-input v-model="formInline.userId" placeholder="用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" label-width="100px" class="form-list">
            <el-input v-model="formInline.realName" placeholder="用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px" class="form-list">
            <el-input v-model="formInline.phone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="100px" class="form-list">
            <el-select v-model="formInline.gender" clearable placeholder="性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="会员来源" label-width="100px" class="form-list">
            <el-select v-model="formInline.vipFrom" clearable placeholder="会员来源">
              <el-option label="小程序下单" value="1"></el-option>
              <el-option label="填写会员卡号" value="2"></el-option>
              <el-option label="后台设置" value="3"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否会员" label-width="100px" class="form-list">
            <el-select v-model="formInline.isVip" clearable placeholder="是否会员">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否是黑名单" label-width="100px" class="form-list">
            <el-select v-model="formInline.isBlack" clearable placeholder="是否是黑名单">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'serchForm',
  data () {
    return {
      formInline: {
        userId: '',
        realName: '',
        phone: '',
        gender: '',
        vipFrom: '',
        isVip: '',
        isBlack: ''
      }
    }
  },
  computed: {
    ...mapState({
      // tableData: ({user}) => user.blackUserList
    })
  },
  methods: {
    ...mapActions([
      'userSearch'
    ]),
    onSubmit () {
      let sendData = {
        data: this.formInline,
        that: this,
        isSearch: true
      }
      // console.log(this.formInline)
      this.userSearch(sendData)
    }
  }
}
</script>

<style lang="less" scoped>
  .serchForm{
    width: 100%;
    height: auto;
    .form-list{
      width: 360px;
    }
  }
</style>
