<script setup lang="ts">
</script>


<template>
  <div class="w-9/10 h-[85vh] mx-auto mt-14 flex">
    <div class="bg-white shadow-[0px_0px_10px_-5px] flex flex-col w-55 items-center p-10 space-y-12 text-lg">

      <RouterLink to="/user/cv" exact-active-class="text-blue-700">我的简历</RouterLink>
      <RouterLink to="/user/information" exact-active-class="text-blue-700">账户信息</RouterLink>
      <RouterLink to="/user/cvAdmin" exact-active-class="text-blue-700">简历模板管理</RouterLink>

    </div>
    <RouterView class="bg-white w-4/5 ml-10 shadow-[0px_0px_10px_-5px]"></RouterView>
  </div>
</template>
