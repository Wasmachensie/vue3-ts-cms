<template>
  <div class="main">
    <h2>main</h2>
    <el-button type="primary">点击实际</el-button>
    <el-button type="primary" @click="handleLogout">退出登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { req, reqCaptchaCode } from '@/service/main/main'
import { localCache } from '@/utils/cache'
import { onBeforeMount } from 'vue'
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
</script>

<style scoped lang="less">
.main {
  color: antiquewhite;
}
</style>
