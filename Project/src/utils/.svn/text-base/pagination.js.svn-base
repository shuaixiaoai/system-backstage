// 封装分页
import api from '../api/axios'
export function getPaginationList (that, url) {
  api.getOrdersList(url)
  .then(({ data }) => {
    if (data.code === 0) {
      that.tableData = data.data.list
      that.total = data.data.count
      // console.log(that.tableData)
    }
  })
}
