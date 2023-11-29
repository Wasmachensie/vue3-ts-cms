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
        this.userMenus = roleMenuResult.data
        // 3.页面跳转(mian.vue)
        router.push('/main')
      } else {
        message.error(loginResult.response.data)
      }
    }
  }
})

export default useLoginStore
