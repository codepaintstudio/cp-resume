<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/userStatus';
const authStore = useAuthStore()
const { isLogin, currentUser } = storeToRefs(authStore)
</script>
<template>
  <div>
    <div class="flex justify-between items-center w-[100%] h-[8vh] border-b-2 border-[#D9D9D9]">
      <div class="text-3xl ml-[2vw]">基本信息</div>
      <a class="text-[#3370FF] mr-[2vw]">完成</a>
    </div>

    <div class="flex h-[12vh] items-center">
      <div class="w-[7vw] pl-[1.5vw]">头像</div>
      <div class="w-20 h-20 bg-[rgb(135,135,135)] rounded-[50%] flex justify-center items-center">编辑</div>
    </div>

    <div class="h-[5vh] flex items-center">
      <div class="w-[7vw] pl-[1.5vw]">昵称</div>
      <input type="text" class="border-[#D9D9D9] border-1 rounded-sm" :value="currentUser.userName">
    </div>

    <div class="h-[5vh] flex items-center">
      <div class="w-[7vw] pl-[1.5vw]">性别</div>
      <input type="text" class="border-[#D9D9D9] border-1 rounded-sm">
    </div>

    <div class="h-[5vh] flex items-center">
      <div class="w-[7vw] pl-[1.5vw]">绑定手机</div>
      <input type="text" class="border-[#D9D9D9] border-1 rounded-sm" :value="currentUser.userPhoneNumber">
    </div>

    <div class="h-[5vh] flex items-center">
      <div class="w-[7vw] pl-[1.5vw]">绑定邮箱</div>
      <input type="text" class="border-[#D9D9D9] border-1 rounded-sm" :value="currentUser.userEmail">
    </div>
  </div>
</template>
<style scoped></style>
