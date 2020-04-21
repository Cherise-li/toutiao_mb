import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/layout'),
    children: [
      {
        path: '/',
        name: ' Home ',
        component: () => import('../views/home/index.vue'),
        meta: {
          isKeepAlive: true
        }
      },
      {
        path: '/question',
        name: 'Question',
        component: () => import('../views/question/index.vue')
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/user/index')
      },
      {
        path: '/user/profile',
        name: 'UserProfile',
        component: () => import('../views/user/profile')
      },
      {
        path: '/user/chat',
        name: 'UserChat',
        component: () => import('../views/user/chat')
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('../views/video/index')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('../views/search/index.vue')
  },
  {
    path: '/search/result',
    name: 'searchResult',
    component: () => import('../views/search/result.vue')
  },
  {
    path: '/artical/:id',
    name: 'articalDetail',
    component: () => import('../views/artical/index')
  }
]

const router = new VueRouter({
  routes
})
// 前置守卫
router.beforeEach(function (to, from, next) {
  if (isOk(to)) {
    next()
  } else {
    next({
      path: '/login',
      query: {
        from: to.fullPath
      }
    })
  }
})
function isOk (to) {
  if (to.path.startsWith('/user') && !store.state.token) {
    return false
  } else {
    return true
  }
}

export default router
