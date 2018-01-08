<template>
  <div class="associator-list">
      <VipList></VipList>
  </div>
</template>

<script>
import VipList from '../../components/userTable/vipListTable'
export default {
  name: 'associatorList',
  data () {
    return {
    }
  },
  mounted () {
    // console.log('初始化数据')
  },
  components: {
    VipList
  }
}
</script>

<style lang="less" scoped>
  .associator-list{
    width: 100%;
    height: auto;
  }
</style>
