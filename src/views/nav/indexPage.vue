<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
import BackgroundAnimation from '@/components/BackgroundAnimation.vue';
import { useAuthStore } from '@/stores/userStatus';
import { ChevronDown } from 'lucide-vue-next';
//调用store
const authStore = useAuthStore()
const { isLogin, currentUser } = storeToRefs(authStore)
// 路由相关
const route = useRoute();
const router = useRouter();

// 导航栏状态
//测试通过将isLogin作为判断，使得用户中心根据不同情况发生变化


const currentActive = ref<boolean>(true)
const isNavActive = ref(true);
const isNavFixed = ref(false)
const isNavRelative = ref(true)

//新增：下拉菜单的状态
const showDropdown = ref(false)

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/home') {
      isNavActive.value = true;
      currentActive.value = true
    } else if (newPath === '/cv') {
      isNavActive.value = false;
      currentActive.value = false
    }
    else {
      isNavActive.value = false;
    }
  },
  { immediate: true } // 立即执行一次，初始化状态
);


// 判断当前路由是否是选中的 Tab
function isActiveTab(tabPath: string) {
  return route.path === tabPath
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

// 退出登录处理
const handleLogout = () => {
  authStore.setLoginStatus(false)
  localStorage.removeItem('currentUser')
  router.push('/home')
  showDropdown.value = false
}

const myResume = () => {
  router.push('/user/cv')
}

const myInformation = () => {
  router.push('/user/information')
}
// 用户名部分的下拉框
// 定义 dropdownTimer 并初始化 null，但声明它可以存储 setTimeout 的返回值
const dropdownTimer = ref<ReturnType<typeof setTimeout> | null>(null)
  function handleMouseEnter() {
  if (dropdownTimer.value) {  // 先检查是否有值
    clearTimeout(dropdownTimer.value);  // 使用 .value 访问实际值
    dropdownTimer.value = null;  // 清除后设为 null
  }
  showDropdown.value = true;
}

function handleMouseLeave() {
  dropdownTimer.value = setTimeout(() => {
    showDropdown.value = false;
  }, 300);
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
      <RouterLink to="/" class=" text-black pb-[0.08vh]" :class="{ active: isActiveTab('/home') }">
        首页</RouterLink>
      <RouterLink to="/cv" class=" text-black pb-[0.08vh]" :class="{ active: isActiveTab('/cv') }">
        简历模板</RouterLink>
    </div>
    <div class="absolute right-0 mr-[3vw] top-1/2 transform -translate-y-1/2">
      <!-- 登录状态显示带下拉菜单的用户中心 -->
      <div v-if="isLogin"
      class="relative"
      >
        <div class="text-[0.8vw] text-[#4F4F4F] no-underline cursor-pointer flex justify-between items-center" >
          <RouterLink to="/user" class="text-[#4F4F4F] hover:text-[rgb(97,109,255)] transition-colors">
              {{ currentUser?.userNum || '用户中心' }}
          </RouterLink>
          <ChevronDown
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          />
        </div>

        <div>

        </div>
        <!-- 下拉菜单 -->
        <div v-if="showDropdown"
          class="absolute top-full right-0 mt-2 w-[8vw] bg-white shadow-lg rounded-md py-2 z-50"
           @mouseenter="handleMouseEnter"
           @mouseleave="handleMouseLeave"
          >

          <div class="px-4 py-2 hover:bg-[rgb(231,238,254)] hover:text-[#3370FF] cursor-pointer text-[0.8vw] " @click="myResume">
            我的简历
          </div>

          <div class="px-4 py-2 hover:bg-[rgb(231,238,254)] hover:text-[#3370FF] cursor-pointer text-[0.8vw]" @click="myInformation">
            账户信息
          </div>
          <div class="px-4 py-2 hover:bg-[rgb(231,238,254)] hover:text-[#3370FF] cursor-pointer text-[0.8vw]" @click="handleLogout">
            退出登录
          </div>
        </div>
      </div>

      <!-- 未登录状态直接显示登录链接 -->
      <RouterLink v-else to="/login"
        class="text-[0.8vw] text-[#4F4F4F] no-underline hover:text-[#616DFF] transition-colors">
        登录/注册
      </RouterLink>
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
