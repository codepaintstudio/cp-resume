<script setup lang="ts">
</script>
<template>
  <div class="user">
    <div class="menu">
      <RouterLink to="/user/information">个人信息</RouterLink>
      <RouterLink to="/user/cv">我的简历</RouterLink>
      <RouterLink to="/user/cvAdmn">简历模板管理</RouterLink>
    </div>
    <RouterView></RouterView>
  </div>
</template>
<style scoped lang="scss">
.user {
  display: flex;
  height: 90vh;
  width: 75%;
  margin: 0 auto;
  background-color: aliceblue;

  .menu {
    width: 20%;
    height: 100%;
    background-color: rgb(182, 177, 177);
    border-radius: 10px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

a {
  margin: 20px;
}
</style>
