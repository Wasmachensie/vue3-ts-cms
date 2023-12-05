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
/**
 * 对menu进行映射 映射成路由
 * @param userMenus 菜单数组
 * @returns 路由
 * @example[children:[
 * 0:{id: 39, url: "/main/analysis/overview", name: "核心技术"}
 * 1:{id: 40, url: "/main/analysis/dashboard", name: "商品统计"}]]
 * 返回[{"path": "/main/analysis/overview"},{"path": "/main/analysis/dashboard"}]
 */
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
      if (route) {
        // 这行代码为了解决面包屑点击一级菜单也生效的问题，但是用户不一定有menu.children[0]的这个权限
        // routes.push({ path: menu.url, redirect: menu.children[0].url })
        // 优化：给route的定级菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find(item => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        // 二级菜单的路由加到routes里面
        routes.push(route)
      }
      // 记录第一个匹配到的菜单(在route有值的情况下),第二次进来时就不用赋值了
      if (!firstMenu && route) firstMenu = subMenu
    }
  }
  return routes
}

/**
 * 根据给定的路径和用户菜单查找匹配的子菜单项
 * @param path 需要匹配的url路径(当前页面的路径)
 * @param userMenus 该用户的所有菜单
 * @returns 匹配的子菜单项，如果未找到匹配则返回 undefined
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
  return undefined
}

interface IbreadCrumbs {
  name: string
  path: string
}
/**
 * 菜单和给定的路径，生成面包屑导航
 * @param path 当前页面的路径
 * @param userMenus  包含用户菜单信息的数组
 * @returns 包含面包屑信息的数组
 */
export function mapPathToBreadCrumbs(path: string, userMenus: any[]) {
  // 1.定义面包屑
  const breadCrumbs: IbreadCrumbs[] = []
  // 2.两层遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        // 如果找到匹配的路径，将主菜单和子菜单添加到面包屑数组中
        // 顶层菜单,path: menu.url可以不传
        breadCrumbs.push({ name: menu.name, path: menu.url })
        // 匹配菜单
        breadCrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  // 3.返回生成的面包屑数组
  return breadCrumbs
}
