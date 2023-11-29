import type { IAccount } from '@/types'
import hyRequest from '..'
// 帐号密码登录
export function accountLogin(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

// 查询某个用户
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization:"Bearer " +token token添加方式 1
    // }
  })
}

export function getUserMenuInfoById(id: any) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
