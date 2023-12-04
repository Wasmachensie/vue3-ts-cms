<template>
  <div class="headerInfo">
    <!-- 操作小图标 -->
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotSquare /></el-icon>
      </span>
      <span>
        <el-icon><Download /></el-icon>
      </span>
    </div>
    <!-- 个人信息 -->
    <div class="info">
      <el-dropdown>
        <div class="userInfo">
          <el-avatar :size="30" src="src\assets\img\logo_icon.png" />
          <span class="userName">{{ userName }}</span>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><EditPen /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleLogout" divided>
              <el-icon><CircleClose /></el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_NAME, LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache.ts'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
const userName = ref()
onBeforeMount(() => {
  userName.value = localCache.getCache(LOGIN_NAME)
})

const router = useRouter()
const handleLogout = () => {
  // 退出登录
  localCache.deleteCache(LOGIN_TOKEN)
  // 跳回login页面
  router.push('/login')
}
</script>

<style scoped lang="less">
.headerInfo {
  display: flex;
  align-items: center;

  .operation {
    display: inline-flex;
    margin-right: 20px;
    span {
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;
      &:hover {
        background-color: #f2f2f2;
      }
      i {
        font-size: 20px;
      }
      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }

  .info {
    .userInfo {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .userName {
        margin-left: 12px;
      }
    }
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
