import { LOGIN_TOKEN } from '@/global/constants' // 常量文件夹，用来定义常量的
import router from '@/router'
import { accountLogin } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { message } from '@/utils/resetMessage'
import { defineStore } from 'pinia'
const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '' // 没有的话就设为空字符串,??是非空断言
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登陆，获取token
      const loginResult = await accountLogin(account)
      console.log('res==>', loginResult)
      if (loginResult.code == 0) {
        this.id = loginResult.data.id
        this.name = loginResult.data.name
        this.token = loginResult.data.token
        // 2.进行本地化存储
        localCache.setCache(LOGIN_TOKEN, this.token)

        // 3.页面跳转(mian.vue)
        router.push('/main')
      } else {
        message.error(loginResult.response.data)
      }
    }
  }
})

export default useLoginStore
