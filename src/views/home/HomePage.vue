<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CvCard from '@/components/CvCard.vue'

// 引入图标
import { ArrowUp } from 'lucide-vue-next'
const router = useRouter()
const ToCv = () => {
  router.push('/cv')
}
const boxes = ref<null[]>(Array(5).fill(null))
const toTopRef = ref<HTMLElement | null>(null)

// 返回顶部
import { scrollToTop } from '../../utils/tool'

// 在组件挂载后添加事件监听器
onMounted(() => {
  if (toTopRef.value) {
    toTopRef.value.addEventListener('click', scrollToTop)
  }
})
// 在组件卸载时移除事件监听器
</script>
<template>
  <div id="relative w-screen h-full bg-white flex">


    <div class="w-full flex flex-col justify-center items-center z-10">
      <div class="w-[60%] h-[60vh] z-10 flex flex-col justify-center items-center relative">
        <div class="relative w-full h-[15vw]">
          <div class="absolute text-[7vw]">CP-ResumeTools</div>
          <div class="absolute right-0 bottom-[-12%] translate-y-[-200%] text-[2vw]">
            码绘工作室简历制作
          </div>
          <div
            class="block w-[12vw] h-[3vw] bg-[url('@/assets/img/Home/MakeResume.png')] bg-contain bg-no-repeat absolute left-1/2 bottom-0 -translate-x-1/2 transition-all duration-200 hover:scale-102 active:scale-100"
            @click="ToCv"></div>
        </div>
      </div>

      <div class="w-[70%] h-[70vh] flex flex-col justify-center items-center relative z-10">
        <div class="w-[30vw] h-[6vh] relative">
          <span
            class="absolute block w-[10vw] h-[4vw] bg-[url('@/assets/img/Home/Left2.png')] bg-contain bg-no-repeat left-0 top-[3vh] -translate-y-1/2"></span>
          <span
            class="absolute w-[10vw] h-[4vw] left-1/2 top-[3vh] -translate-x-[40%] -translate-y-1/2 text-[2vw]">精选简历</span>
          <span
            class="absolute block w-[10vw] h-[4vw] bg-[url('@/assets/img/Home/Right1.png')] bg-contain bg-no-repeat right-0 top-[3vh] -translate-y-1/2"></span>
        </div>
        <div class="w-full flex justify-around items-center mt-6 mb-10">
          <CvCard v-for="(box, index) in boxes" :key="index" :is-view="false" customClass="w-[12vw] h-[16vw]">
          </CvCard>
        </div>
        <span
          class="block w-30 h-10 bg-[url('@/assets/img/Home/More2.png')] bg-contain bg-no-repeat bottom-0  transition-all duration-200 hover:scale-102 active:scale-100"
          @click="ToCv"></span>
      </div>

      <div class="w-[70%] h-[60vh] flex flex-col justify-center items-center relative z-10">
        <div class="w-[30vw] h-[6vh] relative">
          <span
            class="absolute block w-[10vw] h-[4vw] bg-[url('@/assets/img/Home/Left2.png')] bg-contain bg-no-repeat left-0 top-[3vh] -translate-y-1/2"></span>
          <span
            class="absolute w-[10vw] h-[4vw] left-1/2 top-[3vh] -translate-x-[40%] -translate-y-1/2 text-[2vw]">历史简历</span>
          <span
            class="absolute block w-[10vw] h-[4vw] bg-[url('@/assets/img/Home/Right1.png')] bg-contain bg-no-repeat right-0 top-[3vh] -translate-y-1/2"></span>
        </div>
        <div class="w-full flex justify-around items-center mt-10 mb-10">
          <CvCard v-for="(box, index) in boxes" :key="index" :is-view="false" customClass="w-[12vw] h-[16vw]">
          </CvCard>
        </div>
        <div
          class="absolute right-0 top-[20%] w-[10vw] h-[2vw] -translate-y-1/2 flex justify-center items-center flex-row "
          @click="ToCv">
          <span class="block text-[1.2vw] text-[#3370FF] ">查看全部</span>
          <span class="block w-[2vw] h-[2vw] bg-[url('@/assets/img/Home/arrow2.png')] bg-contain bg-no-repeat "></span>
        </div>
      </div>
    </div>
    <div ref="toTopRef"
      class="fixed w-10 h-10 bg-white rounded-full right-[10%] bottom-[5%] shadow-[2px_3px_5px_rgba(0,0,0,0.5)] flex justify-center items-center">
      <ArrowUp />
    </div>
  </div>
</template>
<style scoped></style>
