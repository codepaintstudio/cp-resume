<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserStore.ts'

const userStore = useUserStore()
const loading = ref(true)
const currentUser = ref<any>({
  userName: '',
  userPhoneNumber: '',
  userEmail: '',
})

onMounted(async () => {
    await userStore.getUserInfo(userStore.userId)
    currentUser.value = userStore.userInfo
    loading.value = false
})

</script>
<template>
  <div>
    <div class="flex justify-between items-center w-[100%] h-1/8 px-6 border-b-2 border-[#D9D9D9]">
      <h2 class="text-lg font-semibold">基本信息</h2>
      <a class="text-[#3370FF] mr-[2vw]">编辑</a>
    </div>

    <LoadingSpinner v-if="loading"></LoadingSpinner>
    <div class="w-[100%] h-7/8 flex flex-col items-center space-y-10 mt-12">
      <div class="flex h-[12vh] items-center">
        <div class="w-30 h-30 bg-[rgb(135,135,135)] rounded-[50%] flex justify-center items-center">
          编辑
        </div>
      </div>

      <div class="h-[5vh] flex items-center">
        <div class="w-[7vw] pl-[1.5vw]">用户名</div>
        <input type="text"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
          :value="currentUser?.userName || ''" />
      </div>

      <div class="h-[5vh] flex items-center">
        <div class="w-[7vw] pl-[1.5vw]">绑定手机</div>
        <input type="text"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
          :value="currentUser?.userPhoneNumber || ''" />
      </div>

      <div class="h-[5vh] flex items-center">
        <div class="w-[7vw] pl-[1.5vw]">绑定邮箱</div>
        <input type="text"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4"
          :value="currentUser?.userEmail || ''" />
      </div>
    </div>

  </div>
</template>
<style scoped></style>
