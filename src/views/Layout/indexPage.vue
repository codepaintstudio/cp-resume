<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

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

 onMounted(() => {
   window.addEventListener('scroll', handleScroll);
 });

 onUnmounted(() => {
   window.removeEventListener('scroll', handleScroll);
 });
</script>
<template>
  <div class="header">
      <div class="leftSize">
        <img src="/src/img/Layout/Logo2.png" alt="">
        <span>CP-ResumeTools</span>
      </div>

      <div class="mainSize">
        <RouterLink to="/" class="LayoutHome">首页</RouterLink>
        <RouterLink to="/cv" class="LayoutCv">简历模板</RouterLink>
      </div>
      <div class="rightSize">
        <RouterLink to="/user" class="LayoutUser">用户中心</RouterLink>
      </div>


  </div>
  <RouterView></RouterView>
</template>
<style scoped>
@import '../../styles/Layout.css';
</style>
