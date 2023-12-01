<template>
  <div class="main-menu">
    <!-- ************************1 logo部分************************ -->
    <div class="logo">
      <img src="@/assets/img/logo_icon.png" />
      <div class="title" v-show="!isFold">VUE-TS-CRM管理系统</div>
    </div>
    <!-- ************************2 菜单部分************************ -->
    <div class="menu">
      <!-- 核心技术这个item id是39,所以打开就是选中 id为39这个item  -->
      <el-menu
        :collapse="isFold"
        default-active="39"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <!-- 判断否存在子菜单的判断 -->
          <el-sub-menu v-if="hasChildren(item)" :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''">{{
                subItem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>

          <!-- 如果不存在子菜单 -->
          <el-menu-item v-else :index="item.id + ''">
            <el-icon>
              <component :is="getIconClass(item.icon)" />
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { storeToRefs } from 'pinia'
const { userMenus } = storeToRefs(useLoginStore())
// const loginStore = useLoginStore()  // 这样也可以拿到
// const userMenus = loginStore.userMenus

// 接受父组件的传值
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 假设 Item 和 SubItem 是你数据中的菜单项和子菜单项的类型
interface Item {
  id: number
  name: string
  children?: SubItem[]
}

interface SubItem {
  id: number
  name: string
}
// 判断菜单是否有下一级别
const hasChildren = (item: Item) => {
  return item.children && item.children.length > 0
}

const getIconClass = (iconName: string) => {
  return iconName.split('el-icon-')[1]
}
</script>

<style scoped lang="less">
.main-menu {
  .logo {
    display: flex;
    justify-content: center;
    height: 8vh;
    padding: 12px 10px 8px 10px;
    img {
      width: 8vh;
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 16px;
      padding: 0 10px;
      color: white;
      white-space: nowrap;
    }
  }
}

.el-menu {
  border-right: none;
  user-select: none; //禁止用户选择元素中的文本
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
