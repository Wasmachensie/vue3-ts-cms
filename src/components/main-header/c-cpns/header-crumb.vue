<template>
  <div class="headerCrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumb" :key="item.path">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToBreadCrumbs } from '@/utils/mapMenus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const userMenus = useLoginStore().userMenus
// const breadcrumb = mapPathToBreadCrumbs(route.path, userMenus)
const breadcrumb = computed(() => {
  return mapPathToBreadCrumbs(route.path, userMenus)
})
</script>

<style scoped lang="less">
.headerCrumb {
  color: red;
}
</style>
