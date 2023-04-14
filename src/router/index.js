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
      // medicine
      {
        path: '/medicine',
        name: 'medicine',
        component: () => import('../views/pages/manage/medicine.vue')
      },
      // record
      {
        path: '/record',
        name: 'record',
        component: () => import('../views/pages/manage/record.vue')
      },
      // charge
      {
        path: '/charge',
        name: 'charge',
        component: () => import('../views/pages/manage/charge.vue')
      },
      // laboratoryItem
      {
        path: '/laboratoryItem',
        name: 'laboratoryItem',
        component: () => import('../views/pages/manage/laboratoryItem.vue')
      },
      // vaccine
      {
        path: '/vaccine',
        name: 'vaccine',
        component: () => import('../views/pages/manage/vaccine.vue')
      },
      // hospitalized
      {
        path: '/hospitalized',
        name: 'hospitalized',
        component: () => import('../views/pages/manage/hospitalized.vue')
      },
      // cosplay
      {
        path: '/cosplay',
        name: 'cosplay',
        component: () => import('../views/pages/manage/cosplay.vue')
      },
      // illcaseStudy
      {
        path: '/illcaseStudy',
        name: 'illcaseStudy',
        component: () => import('../views/pages/manage/illcaseStudy.vue')
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
      },
      // roles
      {
        path: '/role',
        name: 'role',
        component: () => import('../views/pages/manage/role.vue')
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
