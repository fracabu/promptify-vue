import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/framework/:id',
      name: 'framework',
      component: () => import('../views/FrameworkDetail.vue')
    },
    {
      path: '/impostazioni',
      name: 'settings',
      component: () => import('../views/Settings.vue')
    }
    ,
    {
      path: '/guide',
      name: 'guide',
      component: () => import('../views/Guide.vue')
    },
    {
      path: '/guide/:id',
      name: 'guide-detail',
      component: () => import('../views/GuideDetail.vue')
    }
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

export default router
