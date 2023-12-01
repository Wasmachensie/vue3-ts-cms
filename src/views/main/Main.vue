<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '230px'">
        <MainMenu :is-Fold="isCollapse"></MainMenu>
      </el-aside>
      <el-container>
        <el-header>
          <MainHeader @fold-change="handleFoldChange"></MainHeader>
        </el-header>
        <el-main>
          <el-button type="primary" @click="handleLogout">退出登录</el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/main-header/main-header.vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import { LOGIN_TOKEN } from '@/global/constants'
import { req, reqCaptchaCode } from '@/service/main/main'
import { localCache } from '@/utils/cache'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

//数据
onBeforeMount(async () => {
  let res = await reqCaptchaCode()
  let resData = await req()
  console.log('ppp', res, resData)
})
const router = useRouter()
const handleLogout = () => {
  localCache.deleteCache(LOGIN_TOKEN)
  // 跳回login页面
  router.push('/login')
}
// 处理折叠变化
const isCollapse = ref(false)
const handleFoldChange = (flag: boolean) => {
  isCollapse.value = flag
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
  width: 100%;
  .main-content {
    height: 100%;
    width: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      transition: width 0.3s ease; // 宽度变化时动画
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-header {
      height: 50px;
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
