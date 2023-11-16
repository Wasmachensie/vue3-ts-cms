import hyRequest from '..'

// 发送网络请求
hyRequest
  .request({
    url: '/home/multidata'
  })
  .then(res => {
    console.log('111', res.data)
  })
