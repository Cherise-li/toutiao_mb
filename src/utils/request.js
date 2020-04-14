// 对axios进行二次封装
import axios from 'axios'
import store from '@/store/index'
import JSONBig from 'json-bigint'
// 自定义创建基地址,可以导出多个
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  // 收到后端回来的数据可以在这里使用json-big来处理一下
  transformResponse: [function (data) {
    return data ? JSONBig.parse(data) : {}
  }]
})
request.interceptors.request.use(function (config) {
  const token = store.state.token
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`
  }
  return config
})
export default request
