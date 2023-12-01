<template>
  <div class="nav-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Fold' : 'Expand'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <div class="info">111</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['foldChange']) // 自定义事件
const isFold = ref(false) // 记录折叠状态
const handleMenuIconClick = () => {
  // 1.内部改变状态
  isFold.value = !isFold.value //取反
  // 2.将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
