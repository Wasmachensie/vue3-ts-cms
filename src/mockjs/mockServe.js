//引入mockjs插件开始模拟数据
import Mock from 'mockjs'
// webpack默认对外暴露：图片、json数据格式，所有不需要暴露就能直接引用
//引入数据：JSON数据格式数据
//比如:图片资源、JSON资源【里面不能书写export关键字】，这些资源默认对外暴露【默认暴露】

//第一个参数：接口的地址 中间件默认是GET请求 第二个参数:向这个接口发请求获取到的数据
// 使用mockjs模拟数据
let tableList = [
  {
    id: '5ffa80aD-9CF4-0C77-eBFC-f6612BfAcF4F',
    account: 'admin',
    password: '123456',
    address: '36918166@qq.com'
  },
  {
    id: '4FcC922C-C72c-95c3-Ef92-FbFAc24cc831',
    account: 'ebHoL6',
    password: 'i320Hu74fbn2Gi',
    address: '48165263@qq.com'
  }
]

// Mock.mock 是一个工具类，用于生成各种随机数据，在官网上可以找到。
const Random = Mock.mock('@string("number", 4)')
// 用于接受生成数据的数组
const data = []

const template = {
  number: Random
}
// 将template以数组的方式添加
data.push(template)
// 根据数据模板生成模拟数据
Mock.mock('http://codercba.com:5000/captchCode', 'get', {
  code: 200,
  data: data
})
Mock.mock('http://codercba.com:5000/indexdata', 'get', () => {
  return {
    code: '0',
    data: tableList
  }
})
