<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BackgroundAnimation from '@/components/BackgroundAnimation.vue';

// 路由相关
const router = useRouter();
const route = useRoute();

// 导航栏状态
const isHomeActive = ref(false);
const isCvActive = ref(false);
const isNavActive = ref(true);
const isNavFixed = ref(false)
const isNavRelative = ref(true)
// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/home') {
      isNavActive.value = true;
      isHomeActive.value = true;
      isCvActive.value = false;
    } else if (newPath === '/cv') {
      isNavActive.value = false;
      isHomeActive.value = false;
      isCvActive.value = true;
    }
    else {
      isNavActive.value = false;
    }
  },
  { immediate: true } // 立即执行一次，初始化状态
);

// 处理点击事件
function handleClick(button: string) {
  if (button === 'home') {
    isHomeActive.value = true;
    isCvActive.value = false;
    router.push('/'); // 导航到首页
  } else if (button === 'cv') {
    isHomeActive.value = false;
    isCvActive.value = true;
    router.push('/cv'); // 导航到简历模板页
  }
}

// 处理滚动事件
function handleScroll() {
  const scrollTop = window.scrollY;
  const threshold = 60; // 滚动阈值，单位为px

  if (route.path === '/home') {
    if (scrollTop > threshold) {
      isNavActive.value = false;
      isNavFixed.value = true;
      isNavRelative.value = false;
    } else {
      isNavActive.value = true;
      isNavFixed.value = false;
      isNavRelative.value = true;
    }
  } else {
    if (scrollTop > threshold) {
      isNavFixed.value = true;
      isNavRelative.value = false;
    } else {
      isNavFixed.value = false;
      isNavRelative.value = true;
    }
  }


}

// 挂载时添加滚动事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 卸载时移除滚动事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<template>
  <div
    class="w-full h-[6vh] bg-white flex items-center  z-20 transition-all duration-300 ease-in-out shadow-[0_2px_8px_rgba(0,0,0,0.15)] top-0 left-0 fixed"
    :class="{ navChange: isNavActive, navFixed: isNavFixed, 'relative': isNavRelative }">
    <div class="absolute left-0 ml-[3vw] flex items-center top-1/2 -translate-y-1/2">
      <img class="h-[4.84vh]" src="/src/assets/img/LayoutNav/Logo2.png" alt="">
      <span>CP-ResumeTools</span>
    </div>

    <div
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[8.89vw] text-[0.96vw] flex justify-around">
      <RouterLink to="/" class=" text-black pb-[0.08vh]" :class="{ active: isHomeActive }" @click="handleClick('home')">
        首页</RouterLink>
      <RouterLink to="/cv" class=" text-black pb-[0.08vh]" :class="{ active: isCvActive }" @click="handleClick('cv')">
        简历模板</RouterLink>
    </div>
    <div class="absolute right-0 mr-[3vw] top-1/2 transform -translate-y-1/2">
      <RouterLink to="/user" class="text-[0.8vw] text-[#4F4F4F] no-underline">用户中心</RouterLink>
    </div>


  </div>

  <div>
    <BackgroundAnimation></BackgroundAnimation>
    <RouterView></RouterView>
  </div>

</template>
<style scoped>
.active {
  @apply text-[#616DFF] border-b-[3px] border-[#616DFF]
}

.navChange {
  @apply bg-transparent shadow-none
}

.nav-fixed {
  @apply fixed
}
</style>
