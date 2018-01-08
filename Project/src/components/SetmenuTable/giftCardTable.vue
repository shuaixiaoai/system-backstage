<template>
  <div class="gift-card-table">
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        tooltip-effect="dark"
        style="width: 100%">
          <el-table-column
            type="index"
            width="55">
          </el-table-column>
          <el-table-column
            prop="card_id"
            label="礼品卡ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="card_code"
            label="礼品卡编号"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="payment_sn"
            width="200"
            label="支付编号">
          </el-table-column>

          <el-table-column
            prop="card_status"
            label="礼品卡状态 ">
            <template scope="scope">
                <span v-if="scope.row.card_status==='0'">未分享</span>
                <span v-if="scope.row.card_status==='1'">已分享</span>
                <span v-if="scope.row.card_status==='2'">已领取</span>
                <span v-if="scope.row.card_status==='3'">已过期</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_pay"
            label="是否已经付款"
            width="100">
            <template scope="scope">
                <span v-if="scope.row.is_pay==='0'">未付款 </span>
                <span v-if="scope.row.is_pay==='1'">已付款</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="user_id"
            label="购买者ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="nick_name"
            width="140"
            label="购买者昵称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="receiver_name"
            label="领取者昵称"
            width="140"
            show-overflow-tooltip>
          </el-table-column>

          <el-table-column
            prop="receiver_id"
            label="领取者ID">
          </el-table-column>
          <el-table-column
            prop="receiv_time"
            label="领取时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="create_time"
            width="200"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="expir_time"
            label="礼品卡过期时间"
            width="200">
          </el-table-column>

          <el-table-column
            prop="pay_price"
            label="礼品卡支付金额">
          </el-table-column>

          <el-table-column
            prop="items"
            label="商品列表"
            width="500">
            <template scope="scope">
                <div v-for="item in scope.row.items" class="detail_list">
                  <div class="">
                    <span class="item-list">商品编号ID： {{item.item_id}}</span>
                    <span class="item-list">商品ID： {{item.goods_id}}</span>
                    <span class="item-list">礼品卡ID： {{item.card_id}}</span>
                  </div>
                  <div style="margin-top: 5px;">
                    <span class="item-list">数量： {{item.goods_num}}</span>
                    <span class="item-list">商品单价： {{item.goods_price}}</span>
                    <span class="item-list">商品名称： {{item.goods_name}}</span>
                  </div>
                </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_exchange"
            label="是否兑换 "
            width="140">
            <template scope="scope">
                <span v-if="scope.row.is_exchange==='0'">未兑换</span>
                <span v-else>已兑换</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template scope="scope">
                <el-button @click.prevent="viewDetail(scope.$index,tableData)" type="info" size="mini" icon="view">查看详情</el-button>
              </template>
            </el-table-column> -->
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'giftCardTable',
  data () {
    return {
      // total: 100
    }
  },
  mounted () {
    this.$store.commit('INITLOADING')
    let data = {
      page: 1
    }
    this.getGiftCardList()
  },
  computed: {
    ...mapState({
      loading: ({setMenu}) => setMenu.loading,
      tableData: ({setMenu}) => setMenu.giftCardList.list,
      total: ({setMenu}) => setMenu.giftCardList.count
    })
  },
  methods: {
    ...mapActions([
      'getGiftCardList'
    ]),
    handleCurrentChange (page) {
      this.$store.commit('INITLOADING')
      let data = {
        page: page
      }
      this.getGiftCardList(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.gift-card-table{
  width: auto;
  height: auto;
  padding: 0 2px;
  margin-top: 30px;
  margin-bottom: 50px;
  .detail_list{
    width: auto;
    margin: 2px 0;
    background: #EFF2F7;
    border-radius: 2px;
    .item-list{
      padding: 2px 4px;
      background: #D3DCE6;
      border: 1px solid #fff;
      margin-right: 4px;
      border-radius: 3px;
    }
  }
}
</style>
