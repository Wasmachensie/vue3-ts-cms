import { LOGIN_TOKEN } from '@/global/constants' // 常量文件夹，用来定义常量的
import router from '@/router'
import {
  accountLogin,
  getUserInfoById,
  getUserMenuInfoById
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenuToRoute } from '@/utils/mapMenus'
import { message } from '@/utils/resetMessage'
import { defineStore } from 'pinia'

// state类型
interface ILoginState {
  token: string
  userInfo: {
    role?: {
      // ?变成可选类型
      id: number
    }
  }
  userMenus: any
}

// token: localCache.getCache(LOGIN_TOKEN) ?? '', // 没有的话就设为空字符串,??是非空断言
// userInfo: localCache.getCache('userInfo') ?? {},
// userMenus: localCache.getCache('userMenus') ?? []

// defineStore<string,……>可以这样指定state类型
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登陆，获取token
      const loginResult = await accountLogin(account)
      console.log('res==>', loginResult)
      if (loginResult.code == 0) {
        const id = loginResult.data.id
        // const name = loginResult.data.name
        this.token = loginResult.data.token

        // 2.进行本地化存储
        localCache.setCache(LOGIN_TOKEN, this.token)

        // 2.1 获取用户详细信息(role信息)
        const userInfoResult = await getUserInfoById(id)
        this.userInfo = userInfoResult.data
        console.log('resInfo==>', this.userInfo)

        // 2.2根据角色请求用户权限(菜单)
        const roleMenuResult = await getUserMenuInfoById(this.userInfo.role?.id)
        console.log('roleMenuResult==>', roleMenuResult)
        const userMenus = roleMenuResult.data
        this.userMenus = userMenus

        // 2.3 进行本地化存储
        localCache.setCache('userInfo', this.userInfo)
        localCache.setCache('userMenus', userMenus)

        // 重要动态添加路由，方法已抽离
        const routes = mapMenuToRoute(userMenus)
        routes.forEach(route => router.addRoute('main', route))
        // 3.页面跳转(mian.vue)
        router.push('/main')
      } else {
        message.error(loginResult.response.data)
      }
    },
    loadLocalCacheAction() {
      // 用户进行刷新时，默认进行数据加载操作
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        // 说明用户是登录状态的
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 动态添加路由
        const routes = mapMenuToRoute(userMenus)
        routes.forEach(route => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
