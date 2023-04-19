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
    children: [
      // user
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/pages/manage/user.vue')
      },
      // illcase
      {
        path: '/illcase',
        name: 'illcase',
        component: () => import('../views/pages/manage/illcase.vue')
      },
      // questionbank
      {
        path: '/questionbank',
        name: 'questionbank',
        component: () => import('../views/pages/manage/questionbank.vue')
      },
      // examination
      {
        path: '/examination',
        name: 'examination',
        component: () => import('../views/pages/manage/examination.vue')
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
