// 对axios进行二次封装
import axios from 'axios'
import store from '@/store/index'
// 自定义创建基地址,可以导出多个
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
request.interceptors.request.use(function (config) {
  const token = store.state.token
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`
  }
  return config
})
export default request
