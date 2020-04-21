import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { relativeTime } from '@/utils/date-time'
import 'vant/lib/index.css'
// 引入rem适配文件
import 'amfe-flexible'
import './styles/index.less'
// 引入vant组件
// import Vant, { Lazyload } from 'vant'
// 按需导入
import {
  Tabbar,
  TabbarItem,
  Form,
  Field,
  Button,
  NavBar,
  Toast,
  Tabs,
  Tab,
  List,
  Lazyload,
  CellGroup,
  Cell,
  Icon,
  Grid,
  GridItem,
  Popup,
  Row,
  Col,
  Tag,
  Image,
  PullRefresh,
  ActionSheet,
  Dialog,
  Search

} from 'vant'
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(NavBar)
Vue.use(Toast)
Vue.use(Tabs)
Vue.use(Tab)
Vue.use(List)
Vue.use(Lazyload)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Icon)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Popup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tag)
Vue.use(Image)
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Dialog)
Vue.use(Search)

// Vue.use(Vant)
// Vue.use(Lazyload)
Vue.filter('relativeTime', relativeTime)
Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
