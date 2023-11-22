import hyRequest from '..'

export function accountLogin(account: { name: string; password: string }) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
