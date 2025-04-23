<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'

const userStore = useUserStore()

userStore.getUserInfo(userStore.userId)
const currentUser = userStore.userInfo.data
</script>
<template>
  <div>
    <div class="flex justify-between items-center w-[100%] h-[8vh] border-b-2 border-[#D9D9D9]">
      <div class="text-3xl ml-[2vw]">基本信息</div>
      <a class="text-[#3370FF] mr-[2vw]">完成</a>
    </div>

    <div class="w-[100%] flex flex-col items-center space-y-10 mt-12">
      <div class="flex h-[12vh] items-center">
        <div class="w-30 h-30 bg-[rgb(135,135,135)] rounded-[50%] flex justify-center items-center">
          编辑
        </div>
      </div>

      <div class="h-[5vh] flex items-center">
        <div class="w-[7vw] pl-[1.5vw]">用户名</div>
        <input
          type="text"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
          :value="currentUser.userName"
        />
      </div>

      <div class="h-[5vh] flex items-center">
        <div class="w-[7vw] pl-[1.5vw]">绑定手机</div>
        <input
          type="text"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
          :value="currentUser.userPhoneNumber"
        />
      </div>

      <div class="h-[5vh] flex items-center">
        <div class="w-[7vw] pl-[1.5vw]">绑定邮箱</div>
        <input
          type="text"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
          :value="currentUser.userEmail"
        />
      </div>
    </div>

  </div>
</template>
<style scoped></style>
