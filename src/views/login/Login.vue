<template>
  <div class="login">
    <!-- 组件最好用大驼峰命名 -->
    <LoginPanel />
  </div>
</template>

<script setup lang="ts">
import LoginPanel from './c-cpns/login-panel.vue'
</script>

<style scoped lang="less">
.login {
  height: 100%;
  width: 100%;
  background: url('../../assets/img/login-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  opacity: 0.6;
  z-index: 1; // z-index小于0，该元素的层级会低于未设置z-index属性的元素；所以这里设置1，login-panel大于它
}
</style>
