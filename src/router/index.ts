import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '../global/constants'
import { localCache } from '../utils/cache'
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
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})
// 导航守卫
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    // 只有登录成功才能跳转
    return '/login'
  }
})
export default router
