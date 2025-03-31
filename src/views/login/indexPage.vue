<script setup lang="ts">
import BackgroundAnimation from '@/components/BackgroundAnimation.vue'
</script>
<template>
    <div class="relative w-screen h-screen overflow-hidden">
      <BackgroundAnimation class="absolute inset-0 top-[-5vh] -z-10"></BackgroundAnimation>
      <div class="flex justify-center items-center w-full h-full flex-col">
              <div class="w-[40vw] h-[5vw] relative flex justify-center items-center mb-[1.5vw]">
                <div class=" w-[5vw] h-[5vw] mr-[1vw] bg-[url(@/assets/img/Login/Logo2.png)] bg-contain bg-no-repeat"></div>
                <span class="text-[2vw]">CP-ResumeTools</span>
              </div><!-- absolute top-0 right-0 --><!-- absolute top-0 left-0 -->
          <div class="relative bg-[rgb(255,255,255)] w-[45rem] h-[28rem] shadow-2xl flex justify-center items-center flex-col">
              <span class="absolute left-[5rem] top-[3rem] text-[25px] font-bold">登录</span>
              <div class="relative w-1/2 h-1/2  flex justify-center items-center flex-col">
                <input type="text" class=" w-[25rem] h-[2.8rem] mb-3 border-black border-1 rounded-sm">
                <input type="text" class=" w-[25rem] h-[2.8rem] border-black border-1 rounded-sm">
                <span class="absolute right-[-1rem] bottom-[1.5rem] text-[rgb(78,131,255)] text-[13px]">注册账户</span>
              </div>
              <div class="w-1/2 flex justify-around">
                <button class="border-1 border-black w-[5rem] h-[2.2rem] rounded-sm">确定</button>
                <button class="border-1 border-black w-[5rem] h-[2.2rem] rounded-sm">取消</button>
              </div>

          </div>
        </div>
    </div>
</template>
<style scoped></style>
