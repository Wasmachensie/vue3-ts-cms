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
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

const localRoutes = [
  {
    path: '/main/analysis/overview',
    component: () => import('../views/main/analysis/overview/overview.vue')
  },
  {
    path: '/main/analysis/dashboard',
    component: () => import('../views/main/analysis/dashboard/dashboard.vue')
  },
  {
    path: '/main/system/role',
    component: () => import('../views/main/system/role/role.vue')
  },
  {
    path: '/main/system/menu',
    component: () => import('../views/main/system/menu/menu.vue')
  },
  {
    path: '/main/system/user',
    component: () => import('../views/main/system/user/user.vue')
  },
  {
    path: '/main/analysis/dashboard',
    component: () => import('../views/main/analysis/dashboard/dashboard.vue')
  }
]
router.addRoute('main')

// 导航守卫
router.beforeEach(to => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    // 这里写是因为这个项目中所有的url都是main开头的，其他的项目根据实际情况写判断
    // 只有登录成功才能跳转
    return '/login'
  }
})
export default router
