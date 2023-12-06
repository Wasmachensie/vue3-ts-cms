<template>
  <div class="users">
    <UserSearch />
    <div class="content">
      <div class="header">头部</div>
      <div class="table">表格</div>
      <div class="pagination">分页</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
</script>

<style scoped lang="less"></style>
