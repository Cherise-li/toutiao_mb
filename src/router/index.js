import Vue from 'vue'
import VueRouter from 'vue-router'

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
        component: () => import('../views/home/index.vue')
      },
      {
        path: '/question',
        name: 'Question',
        component: () => import('../views/question/index.vue')
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search/index')
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/user/index')
      },
      {
        path: '/video',
        name: 'Video',
        component: () => import('../views/video/index')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
