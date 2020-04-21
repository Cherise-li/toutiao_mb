// 对axios进行二次封装
import axios from 'axios'
import store from '@/store/index'
import JSONBig from 'json-bigint'
import router from '@/router/index.js'
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
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response && error.response.status === 401) {
    if (store.state.token && store.state.token.refresh_token) {
      // 发起请求获取新的token
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.token.refresh_token}`
          }
        })
        store.commit('updateToken', res.data.data.token)
        console.log(res.data.data.token)
        console.log(error.config)
        console.log('发起请求')
        return request(error.config)
      } catch (e) {
        // 无效的token,清除vuex中的数据,并且跳到登录界面
        store.commit('delData')
        router.push({
          path: '/login',
          query: {
            from: router.currentRoute.fullPath
          }
        })
      }
    } else {
      // 回到登录界面
      router.push({
        path: '/login',
        query: {
          from: router.currentRoute.fullPath
        }
      })
    }
  } else {
    return Promise.reject(error)
  }
})
export default request
