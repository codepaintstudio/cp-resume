<script setup lang="ts">
import { ref, onMounted,onUnmounted } from 'vue'
import {debounce} from './../utils/tool'
const sphere1 = ref<HTMLElement | null>(null)
const sphere2 = ref<HTMLElement | null>(null)



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

// 在组件挂载时添加事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 在组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>
<template>
  <div class="contents">
  <span ref="sphere1"
    class="-z-1 absolute bg-[#3370FF] opacity-30 blur-[50px] transition-transform duration-200 ease-out sphere1 w-[25vw] h-[25vw] rounded-full top-[30vw] left-[-12.5vw] ;"></span>
  <span ref="sphere2"
    class="-z-1 absolute top-[38vw] right-0 w-[30vw] h-[60vw] translate-y-[-50%] overflow-hidden blur-[80px] sphere2">
    <span
      class="absolute bg-[#3370FF] opacity-30 transition-transform duration-200 ease-out w-[60vw] h-[60vw] rounded-full">
    </span>
  </span>
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
  animation-timing-function: linear;
}

.sphere2 {
  animation-name: Rmove;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
