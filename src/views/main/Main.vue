<template>
  <div class="main">
    <h2>main</h2>
    <el-button type="primary" size="default">点击实际</el-button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
onBeforeMount(() => {
  funct()
})

const funct = () => {
  return true
}
</script>

<style scoped lang="less">
.main {
  color: antiquewhite;
}
</style>
