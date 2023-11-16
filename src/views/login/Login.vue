<template>
  <div class="login">
    <h2>login</h2>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.login {
  height: 100%;
  width: 100%;
  background: url('../../assets//img/login-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
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
}
</style>
