import { LOGIN_TOKEN } from '@/global/constants' // 常量文件夹，用来定义常量的
import router from '@/router'
import {
  accountLogin,
  getUserInfoById,
  getUserMenuInfoById
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { message } from '@/utils/resetMessage'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

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

// defineStore<string,……>可以这样指定state类型
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '', // 没有的话就设为空字符串,??是非空断言
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
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

        // *重要步骤：动态添加路由   动态获取所有路由对象，放到数组中
        const localRoutes: RouteRecordRaw[] = []
        // *1 读取router/mian所有ts文件,webpack用require.context(),读取目标文件下所有ts文件
        // https://www.jianshu.com/p/e7ab6f5e3fa1 关于eager:匹配到的文件默认是懒加载的，所有用eager: true可以消除
        const routeFiles: Record<string, any> = import.meta.glob(
          '../../router/main/**/*.ts',
          {
            eager: true
          }
        )
        console.log('routeFiles==>', routeFiles)
        for (const file in routeFiles) {
          const module = routeFiles[file]
          localRoutes.push(module.default)
          console.log('module==>', module.default)
        }
        // *2 根据菜单去匹配正确路由
        for (const menu of userMenus) {
          // 先对1级路由进行遍历
          for (const subMenu of menu.children) {
            const route = localRoutes.find(item => item.path === subMenu.url)
            if (route) router.addRoute('main', route)
          }
        }

        // 3.页面跳转(mian.vue)
        router.push('/main')
      } else {
        message.error(loginResult.response.data)
      }
    }
  }
})

export default useLoginStore
