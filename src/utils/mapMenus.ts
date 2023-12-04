// 对menu进行映射 映射成路由
import type { RouteRecordRaw } from 'vue-router'
/**
 * 加载本地路由
 *
 */
function loadLocalRoute() {
  // *重要步骤：动态添加路由   动态获取所有路由对象，放到数组中
  const localRoutes: RouteRecordRaw[] = []
  // *1 读取router/mian所有ts文件,webpack用require.context(),读取目标文件下所有ts文件
  // https://www.jianshu.com/p/e7ab6f5e3fa1 关于eager:匹配到的文件默认是懒加载的，所有用eager: true可以消除
  const routeFiles: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  console.log('routeFiles==>', routeFiles)
  // 将加载对象放到localRoutes数组中
  for (const file in routeFiles) {
    const module = routeFiles[file]
    localRoutes.push(module.default)
    console.log('module==>', module.default)
  }
  return localRoutes
}

export let firstMenu: any = null // 设置为全局变量
export function mapMenuToRoute(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoute()
  const routes: RouteRecordRaw[] = []
  // let firstMenu: any = null
  // *2 根据菜单去匹配正确路由 ---这边如果层级过多的话用递归
  for (const menu of userMenus) {
    // 先对1级路由进行遍历
    for (const subMenu of menu.children) {
      const route = localRoutes.find(item => item.path === subMenu.url)
      if (route) routes.push(route)
      // 记录第一个匹配到的菜单(在route有值的情况下),第二次进来时就不用赋值了
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}
