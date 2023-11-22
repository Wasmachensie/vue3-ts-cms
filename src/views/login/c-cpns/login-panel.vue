<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>

    <!-- 中间tabs -->
    <div class="content">
      <el-tabs
        v-model="activeName"
        type="border-card"
        stretch
        style="height: 100%"
      >
        <!-- 账号登录pane -->
        <el-tab-pane name="accountLogin">
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span>帐号登录</span>
            </div>
          </template>
          <pane-account ref="paneAccountRef" />
        </el-tab-pane>

        <!-- 手机登录pane -->
        <el-tab-pane name="phoneLogin">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span>手机号登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="control">
      <el-checkbox
        v-model="isRemPwd"
        @change="!isRemPwd"
        label="记住密码"
        size="large"
      />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <!-- 登录按钮 -->
    <div class="login-btn">
      <el-button type="primary" @click="handleLoginBtnClick" class="login-btn">
        点击登录
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

const activeName = ref<string>('phoneLogin') // el-tab-pane的值，设置默认值
const isRemPwd = ref(false) // 记住密码
const paneAccountRef = ref<InstanceType<typeof PaneAccount>>() // 获取子组件实例

const handleLoginBtnClick = () => {
  if (activeName.value === 'accountLogin') {
    // 1.获取子组件实例,调用方法
    paneAccountRef.value?.loginAction()
  } else {
    console.log('点击手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  z-index: 9;
  width: 30vw;
  padding: 20px 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 20vh;
  // background-color: #bfc;
  h1 {
    text-align: center;
  }
  .content {
    height: 150px;
    margin-top: 20px;
    .el-tabs--border-card {
      background-color: transparent;
    }

    .label {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-left: 5px;
      }
    }
  }
  .control {
    display: flex;
    justify-content: space-between;
    // height: 40px;
    // line-height: 40px;
    padding: 10px;
  }
  .login-btn {
    width: 100%;
    height: 40px;
  }
}
</style>
