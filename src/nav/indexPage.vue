<script setup lang="ts">
import { ref,onMounted, onUnmounted } from 'vue';

 function handleScroll() {
   const scrollTop = window.scrollY;
   const threshold = 60; // 滚动阈值，可以根据需要调整，单位为px
   const header = document.querySelector('.header') as HTMLElement;
   if (scrollTop > threshold) {
     header.classList.add('fixed');
   } else {
     header.classList.remove('fixed');
   }
 }

  const isHomeActive = ref(true);
  const isCvActive = ref(false);
// 处理点击事件
  function handleClick(button: string) {
    if (button === 'home') {
      isHomeActive.value = true;
      isCvActive.value = false;
    } else if (button === 'cv') {
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
  //  window.addEventListener('scroll', handleScroll);
  //  window.addEventListener('click',clickChange);
 });

 onUnmounted(() => {
   window.removeEventListener('scroll', handleScroll);
 });
</script>
<template>
  <div class="header">
      <div class="leftSize">
        <img src="/src/assets/img/LayoutNav/Logo2.png" alt="">
        <span>CP-ResumeTools</span>
      </div>

      <div class="mainSize">
        <RouterLink to="/"
        class="LayoutHome"
        :class="{ active: isHomeActive }"
        @click="handleClick('home')"
        >首页</RouterLink>
        <RouterLink to="/cv"
        class="LayoutCv"
        :class="{ active: isCvActive }"
        @click="handleClick('cv')"
        >简历模板</RouterLink>
      </div>
      <div class="rightSize">
        <RouterLink to="/user" class="LayoutUser">用户中心</RouterLink>
      </div>


  </div>
  <RouterView></RouterView>
</template>
<style scoped>
@import '../../assets/styles/Layout.css';
</style>
