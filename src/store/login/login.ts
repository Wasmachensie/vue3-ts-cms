import { accountLogin } from '@/service/login/login'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: ''
  }),
  actions: {
    async loginAccountAction(account: { name: string; password: string }) {
      const loginResult = await accountLogin(account)
      console.log('res==>', loginResult)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token
    }
  }
})

export default useLoginStore
