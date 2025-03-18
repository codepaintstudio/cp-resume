<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 引入图标
import { ArrowUp } from 'lucide-vue-next'
const router = useRouter()
const ToCv = () => {
  router.push('/cv')
}
const boxes = ref<null[]>(Array(5).fill(null))
const toTopRef = ref<HTMLElement | null>(null)

const sphere1 = ref<HTMLElement | null>(null)
const sphere2 = ref<HTMLElement | null>(null)

// 防抖函数

// 防抖函数
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: number
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// 处理滚动事件
const handleScroll = debounce(() => {
  const scrollY = window.scrollY || window.pageYOffset
  const viewportHeight = window.innerHeight
  const minScrollY = viewportHeight * 0.6
  const maxScrollY = viewportHeight * 1
  const clampedScrollY = Math.min(Math.max(scrollY, minScrollY), maxScrollY)
  const progress = (clampedScrollY - minScrollY) / (maxScrollY - minScrollY)

  if (sphere1.value && sphere2.value) {
    sphere1.value.style.top = `${30 + 20 * progress}vw`
    sphere2.value.style.top = `${38 + 20 * progress}vw`
    sphere1.value.style.animationPlayState = 'paused'
    sphere2.value.style.animationPlayState = 'paused'
  }

  setTimeout(() => {
    if (sphere1.value && sphere2.value) {
      sphere1.value.style.animationPlayState = 'running'
      sphere2.value.style.animationPlayState = 'running'
    }
  }, 100)
}, 10)

// 返回顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 在组件挂载后添加事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  if (toTopRef.value) {
    toTopRef.value.addEventListener('click', scrollToTop)
  }
})

// 在组件卸载时移除事件监听器
</script>
<template>
  <div id="relative w-screen h-full bg-white flex">
    <span ref="sphere1"
      class="absolute bg-[#3370FF] opacity-30 blur-[50px] z-10 transition-transform duration-200 ease-out sphere1 w-[25vw] h-[25vw] rounded-full top-[30vw] left-[-12.5vw] ;"></span>
    <span ref="sphere2"
      class="absolute top-[38vw] right-0 w-[30vw] h-[60vw] translate-y-[-50%] overflow-hidden blur-[80px] sphere2">
      <!-- 添加 overflow-hidden -->
      <span
        class="absolute bg-[#3370FF] opacity-30 z-10 transition-transform duration-200 ease-out w-[60vw] h-[60vw] rounded-full">
        <!-- 关键修改点 -->
      </span>
    </span>

    <div class="w-full flex flex-col justify-center items-center z-10">
      <div class="w-[60%] h-[60vh] z-10 flex flex-col justify-center items-center relative">
        <div class="relative w-full h-[15vw]">
          <div class="absolute text-[7vw]">CP-ResumeTools</div>
          <div class="absolute right-0 bottom-[-12%] translate-y-[-200%] text-[2vw]">
            码绘工作室简历制作
          </div>
          <div
            class="block w-[12vw] h-[3vw] bg-[url('@/assets/img/Home/MakeResume.png')] bg-contain bg-no-repeat absolute left-1/2 bottom-0 -translate-x-1/2"
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
        <div class="w-full h-[30vh] flex justify-around items-center">
          <div v-for="(box, index) in boxes" :key="index" class="w-[12vw] h-[16vw] bg-[rgb(58,63,207)]">
            /*可添加跳转*/ Box {{ index + 1 }}
          </div>
        </div>
        <span
          class="absolute block w-[7vw] h-[4vw] bg-[url('@/assets/img/Home/More2.png')] bg-contain bg-no-repeat bottom-0 -translate-y-1/2"
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
        <div class="w-full h-[30vh] flex justify-around items-center">
          <div v-for="(box, index) in boxes" :key="index" class="w-[12vw] h-[16vw] bg-[rgb(58,63,207)]">
            /*可添加跳转*/ Box {{ index + 1 }}
          </div>
        </div>
        <div
          class="absolute right-0 top-[25%] w-[10vw] h-[2vw] -translate-y-1/2 flex justify-center items-center flex-row"
          @click="ToCv">
          <span class="block text-[1.2vw] text-[#3370FF]">查看全部</span>
          <span class="block w-[2vw] h-[2vw] bg-[url('@/assets/img/Home/arrow2.png')] bg-contain bg-no-repeat"></span>
        </div>
      </div>
    </div>
    <div ref="toTopRef"
      class="fixed w-10 h-10 bg-white rounded-full right-[10%] bottom-[5%] shadow-[2px_3px_5px_rgba(0,0,0,0.5)] flex justify-center items-center">
      <ArrowUp />
    </div>
  </div>
</template>
<style scoped>
@keyframes Lmove {
  0% {
    left: -12.5vw;
  }

  50% {
    left: 4vw;
  }

  0% {
    left: -12.5vw;
  }
}

@keyframes Rmove {
  0% {
    right: 0;
  }

  50% {
    right: 2vw;
  }

  0% {
    right: 0;
  }
}

.sphere1 {
  animation-name: Lmove;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  /* 无限循环 */
  animation-timing-function: linear;
  /* 匀速动画 */
}

.sphere2 {
  animation-name: Rmove;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  /* 无限循环 */
  animation-timing-function: linear;
  /* 匀速动画 */
}
</style>
