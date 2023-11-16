<template>
  <div>挨批评。vue</div>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import hyRequest from './service'

hyRequest
  .get({
    url: '/home/multidata'
  })
  .then(res => {
    console.log('app', res)
  })
</script>

<style scoped></style>
