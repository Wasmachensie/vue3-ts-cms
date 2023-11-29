import hyRequest from '..'

export function reqCaptchaCode() {
  return hyRequest.get({
    url: '/captchCode'
  })
}

export function req() {
  return hyRequest.get({
    url: '/indexdata'
  })
}
