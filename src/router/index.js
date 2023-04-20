import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index.js'
import Layout from '../views/layout.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/pages/login.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    meta: {
      showDashboard: true
    },
    children: [
      // user
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/pages/manage/user.vue'),
        meta: {
          showDashboard: false
        },
      },
      // illcase
      {
        path: '/illcase',
        name: 'illcase',
        component: () => import('../views/pages/manage/illcase.vue'),
        meta: {
          showDashboard: false
        },
      },
      // questionbank
      {
        path: '/questionbank',
        name: 'questionbank',
        component: () => import('../views/pages/manage/questionbank.vue'),
        meta: {
          showDashboard: false
        },
      },
      // examination
      {
        path: '/examination',
        name: 'examination',
        component: () => import('../views/pages/manage/examination.vue'),
        meta: {
          showDashboard: false
        },
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if((to.path === '/login') || store.state.userInfo) {
    next()
    return 
  }
  next('/login')
})

export default router
