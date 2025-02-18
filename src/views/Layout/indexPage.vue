<script setup lang="ts">
</script>
<template>
  <header class="header">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/cv">简历模板</RouterLink>
    <RouterLink to="/user">用户中心</RouterLink>
  </header>
  <RouterView></RouterView>
</template>
<style scoped>
.header {
  height: 60px;
  background-color: rgb(226, 219, 219);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
  display: flex;
  justify-content: space-around;
}
</style>
