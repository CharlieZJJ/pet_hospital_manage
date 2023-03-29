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
    name: 'layout',
    component: Layout,
    children: [
      // user
      {
        path: '/user/add',
        name: 'userAdd',
        component: () => import('../views/pages/user/add.vue')
      },
      {
        path: '/user/search',
        name: 'userSearch',
        component: () => import('../views/pages/user/search.vue')
      },
      {
        path: '/user/remove',
        name: 'userRemove',
        component: () => import('../views/pages/user/remove.vue')
      },
      {
        path: '/user/update',
        name: 'userUpdate',
        component: () => import('../views/pages/user/update.vue')
      },
      // illcase
      {
        path: '/illcase/add',
        name: 'illcaseAdd',
        component: () => import('../views/pages/illcase/add.vue')
      },
      {
        path: '/illcase/search',
        name: 'illcaseSearch',
        component: () => import('../views/pages/illcase/search.vue')
      },
      {
        path: '/illcase/remove',
        name: 'illcaseRemove',
        component: () => import('../views/pages/illcase/remove.vue')
      },
      {
        path: '/illcase/update',
        name: 'illcaseUpdate',
        component: () => import('../views/pages/illcase/update.vue')
      },
      {
        path: '/illcase/duplicate',
        name: 'illcaseDuplicate',
        component: () => import('../views/pages/illcase/duplicate.vue')
      },
      // worker
      {
        path: '/worker/add',
        name: 'workerAdd',
        component: () => import('../views/pages/worker/add.vue')
      },
      {
        path: '/worker/search',
        name: 'workerSearch',
        component: () => import('../views/pages/worker/search.vue')
      },
      {
        path: '/worker/remove',
        name: 'workerRemove',
        component: () => import('../views/pages/worker/remove.vue')
      },
      {
        path: '/worker/update',
        name: 'workerUpdate',
        component: () => import('../views/pages/worker/update.vue')
      },
      // medicine
      {
        path: '/medicine/add',
        name: 'medicineAdd',
        component: () => import('../views/pages/medicine/add.vue')
      },
      {
        path: '/medicine/search',
        name: 'medicineSearch',
        component: () => import('../views/pages/medicine/search.vue')
      },
      {
        path: '/medicine/remove',
        name: 'medicineRemove',
        component: () => import('../views/pages/medicine/remove.vue')
      },
      {
        path: '/medicine/update',
        name: 'medicineUpdate',
        component: () => import('../views/pages/medicine/update.vue')
      },
      // record
      {
        path: '/record/add',
        name: 'recordAdd',
        component: () => import('../views/pages/record/add.vue')
      },
      {
        path: '/record/search',
        name: 'recordSearch',
        component: () => import('../views/pages/record/search.vue')
      },
      {
        path: '/record/remove',
        name: 'recordRemove',
        component: () => import('../views/pages/record/remove.vue')
      },
      {
        path: '/record/update',
        name: 'recordUpdate',
        component: () => import('../views/pages/record/update.vue')
      },
      // charge
      {
        path: '/charge/add',
        name: 'chargeAdd',
        component: () => import('../views/pages/charge/add.vue')
      },
      {
        path: '/charge/search',
        name: 'chargeSearch',
        component: () => import('../views/pages/charge/search.vue')
      },
      {
        path: '/charge/remove',
        name: 'chargeRemove',
        component: () => import('../views/pages/charge/remove.vue')
      },
      {
        path: '/charge/update',
        name: 'chargeUpdate',
        component: () => import('../views/pages/charge/update.vue')
      },
      // laboratoryItem
      {
        path: '/laboratoryItem/add',
        name: 'laboratoryItemAdd',
        component: () => import('../views/pages/laboratoryItem/add.vue')
      },
      {
        path: '/laboratoryItem/search',
        name: 'laboratoryItemSearch',
        component: () => import('../views/pages/laboratoryItem/search.vue')
      },
      {
        path: '/laboratoryItem/remove',
        name: 'laboratoryItemRemove',
        component: () => import('../views/pages/laboratoryItem/remove.vue')
      },
      {
        path: '/laboratoryItem/update',
        name: 'laboratoryItemUpdate',
        component: () => import('../views/pages/laboratoryItem/update.vue')
      },
      // vaccine
      {
        path: '/vaccine/add',
        name: 'vaccineAdd',
        component: () => import('../views/pages/vaccine/add.vue')
      },
      {
        path: '/vaccine/search',
        name: 'vaccineSearch',
        component: () => import('../views/pages/vaccine/search.vue')
      },
      {
        path: '/vaccine/remove',
        name: 'vaccineRemove',
        component: () => import('../views/pages/vaccine/remove.vue')
      },
      {
        path: '/vaccine/update',
        name: 'vaccineUpdate',
        component: () => import('../views/pages/vaccine/update.vue')
      },
      // hospitalized
      {
        path: '/hospitalized/add',
        name: 'hospitalizedAdd',
        component: () => import('../views/pages/hospitalized/add.vue')
      },
      {
        path: '/hospitalized/search',
        name: 'hospitalizedSearch',
        component: () => import('../views/pages/hospitalized/search.vue')
      },
      {
        path: '/hospitalized/remove',
        name: 'hospitalizedRemove',
        component: () => import('../views/pages/hospitalized/remove.vue')
      },
      {
        path: '/hospitalized/update',
        name: 'hospitalizedUpdate',
        component: () => import('../views/pages/hospitalized/update.vue')
      },
      // cosplay
      {
        path: '/cosplay/add',
        name: 'cosplayAdd',
        component: () => import('../views/pages/cosplay/add.vue')
      },
      {
        path: '/cosplay/search',
        name: 'cosplaySearch',
        component: () => import('../views/pages/cosplay/search.vue')
      },
      {
        path: '/cosplay/remove',
        name: 'cosplayRemove',
        component: () => import('../views/pages/cosplay/remove.vue')
      },
      {
        path: '/cosplay/update',
        name: 'cosplayUpdate',
        component: () => import('../views/pages/cosplay/update.vue')
      },
      // illcaseStudy
      {
        path: '/illcaseStudy/add',
        name: 'illcaseStudyAdd',
        component: () => import('../views/pages/illcaseStudy/add.vue')
      },
      {
        path: '/illcaseStudy/search',
        name: 'illcaseStudySearch',
        component: () => import('../views/pages/illcaseStudy/search.vue')
      },
      {
        path: '/illcaseStudy/remove',
        name: 'illcaseStudyRemove',
        component: () => import('../views/pages/illcaseStudy/remove.vue')
      },
      {
        path: '/illcaseStudy/update',
        name: 'illcaseStudyUpdate',
        component: () => import('../views/pages/illcaseStudy/update.vue')
      },
      // questionbank
      {
        path: '/questionbank/add',
        name: 'questionbankAdd',
        component: () => import('../views/pages/questionbank/add.vue')
      },
      {
        path: '/questionbank/search',
        name: 'questionbankSearch',
        component: () => import('../views/pages/questionbank/search.vue')
      },
      {
        path: '/questionbank/remove',
        name: 'questionbankRemove',
        component: () => import('../views/pages/questionbank/remove.vue')
      },
      {
        path: '/questionbank/update',
        name: 'questionbankUpdate',
        component: () => import('../views/pages/questionbank/update.vue')
      },
      // examination
      {
        path: '/examination/add',
        name: 'examinationAdd',
        component: () => import('../views/pages/examination/add.vue')
      },
      {
        path: '/examination/search',
        name: 'examinationSearch',
        component: () => import('../views/pages/examination/search.vue')
      },
      {
        path: '/examination/remove',
        name: 'examinationRemove',
        component: () => import('../views/pages/examination/remove.vue')
      },
      {
        path: '/examination/update',
        name: 'examinationUpdate',
        component: () => import('../views/pages/examination/update.vue')
      },
      // roles
      {
        path: '/roles',
        name: 'role',
        component: () => import('../views/pages/roles.vue')
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
