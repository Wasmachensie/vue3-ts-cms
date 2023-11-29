// import axios, { AxiosInstance } from 'axios'
import axios from 'axios'
// 这里导入的都是一些类型的东西，上面的导入的是一些实际的东西
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './type'
class HYRequest {
  // 每个request实例=>对应axios实例，这样可以灵活把握配置

  // 1.2 ts中要声明instance
  instance: AxiosInstance
  // 这里可以传baseURL:string,timeout:string等很多东西，所以直接换成config
  constructor(config: HYRequestConfig) {
    // 1.1
    this.instance = axios.create(config)

    // 2.1每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      config => {
        // 在这里可以修改config，或者加loading\token等
        // config.timeout = 4000
        console.log('全局请求成功拦截')
        return config
      },
      error => {
        console.log('全局请求失败拦截')
        return error
      }
    )

    this.instance.interceptors.response.use(
      res => {
        console.log('全局响应成功拦截')
        return res.data
      },
      error => {
        console.log('全局响应失败拦截')
        return error
      }
    )

    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装网络请求方法,这样写是为了防止第三方库出问题，到时候只要修改axios.create这一个地方就行
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
