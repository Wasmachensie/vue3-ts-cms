import { LOGIN_TOKEN } from '@/constant' // 常量文件夹，用来定义常量的
import { accountLogin } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '' // 没有的话就设为空字符串
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登陆，获取token
      const loginResult = await accountLogin(account)
      console.log('res==>', loginResult)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token

      // 2.进行本地化存储
      localCache.setCache(LOGIN_TOKEN, this.token)
    }
  }
})

export default useLoginStore
