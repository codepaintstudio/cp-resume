<script setup lang="ts">
import { ref,onMounted, onUnmounted } from 'vue';

 const isNavActive = ref(true)
 function handleScroll() {
   const scrollTop = window.scrollY;
   console.log(scrollTop)
   const threshold = 60; // 滚动阈值，可以根据需要调整，单位为px
   if(isHomeActive.value === true)
   if (scrollTop > threshold) {
    isNavActive.value = false;
   } else {
    isNavActive.value = true;
   }
 }

  const isHomeActive = ref(true);
  const isCvActive = ref(false);
// 处理点击事件
  function handleClick(button: string) {
    if (button === 'home') {
      isNavActive.value = true;
      isHomeActive.value = true;
      isCvActive.value = false;
    } else if (button === 'cv') {
      isNavActive.value = false;
      isHomeActive.value = false;
      isCvActive.value = true;
    }
  }
// function clickChange(event){
//   const loHome = document.getElementsByClassName('LayoutHome')[0];
//   const loCv = document.getElementsByClassName('LayoutCv')[0];
//   if(event.target === loHome){
//     loHome.style.color = '#616DFF';
//     loHome.style.textDecoration = 'underline';
//     loHome.style.textDecorationColor =  '#616DFF';
//     loCv.style.color = '#000000';
//     loCv.style.textDecoration = 'none';
//   }else if(event.target === loCv){
//     loHome.style.color = '#000000';
//     loCv.style.color = '#616DFF';
//     loCv.style.textDecoration = 'underline';
//     loCv.style.textDecorationColor =  '#616DFF';
//     loHome.style.textDecoration = 'none';
//   }
// }

window.addEventListener('DOMContentLoaded',() =>{
  const loHome = document.getElementsByClassName('LayoutHome')[0];
  const loCv = document.getElementsByClassName('LayoutCv')[0];

  // loHome.addEventListener('click', clickChange);
  // loCv.addEventListener('click', clickChange);
})
 onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  //  window.addEventListener('scroll', handleScroll);
  //  window.addEventListener('click',clickChange);
 });

 onUnmounted(() => {
  //  window.removeEventListener('scroll', handleScroll);
 });
</script>
<template>
  <div class="w-full h-[6vh] bg-white flex items-center  z-20 transition-all duration-300 ease-in-out shadow-[0_2px_8px_rgba(0,0,0,0.15)] fixed"
  :class="{navChange:isNavActive}"
  >
      <div class="absolute left-0 ml-[3vw] flex items-center top-1/2 -translate-y-1/2">
        <img class="h-[4.84vh]" src="/src/assets/img/LayoutNav/Logo2.png" alt="">
        <span>CP-ResumeTools</span>
      </div>

      <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[8.89vw] text-[0.96vw] flex justify-around">
        <RouterLink to="/"
        class=" text-black pb-[0.08vh]"
        :class="{ active: isHomeActive }"
        @click="handleClick('home')"
        >首页</RouterLink>
        <RouterLink to="/cv"
        class=" text-black pb-[0.08vh]"
        :class="{ active: isCvActive }"
        @click="handleClick('cv')"
        >简历模板</RouterLink>
      </div>
      <div class="absolute right-0 mr-[3vw] top-1/2 transform -translate-y-1/2">
        <RouterLink to="/user" class="text-[0.8vw] text-[#4F4F4F] no-underline">用户中心</RouterLink>
      </div>


  </div>
  <RouterView></RouterView>
</template>
<style scoped>
.active{
  @apply text-[#616DFF] border-b-[3px] border-[#616DFF]
}
.navChange{
  @apply bg-transparent shadow-none
}
</style>
