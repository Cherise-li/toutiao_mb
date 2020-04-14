import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { relativeTime } from '@/utils/date-time'
// 引入vant组件
import Vant, { Lazyload } from 'vant'

import 'vant/lib/index.css'
// 引入rem适配文件
import 'amfe-flexible'
import './styles/index.less'
Vue.use(Vant)
Vue.use(Lazyload)
Vue.filter('relativeTime', relativeTime)
Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
