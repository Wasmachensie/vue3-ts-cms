import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // hash模式：带#，但是性功能高，不会一开始就加载一次
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main' // 重定向
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

export default router
