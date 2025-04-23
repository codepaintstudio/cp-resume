<script setup lang="ts">
import { ref } from "vue";
import CvCard from "@/components/CvCard.vue";

const resumes = ref([
  { id: 1, image: "/resume1.png" },
  { id: 2, image: "/resume2.png" },
  { id: 3, image: "/resume3.png" },
]);

const hoveredId = ref<number | null>(null);

const setHovered = (id: number | null) => {
  hoveredId.value = id;
};
</script>

<template>
  <div class="">
    <div class="flex justify-between items-center w-[100%] h-20 px-6 border-b-2 border-[#D9D9D9]">
      <h2 class="text-lg font-semibold">我的云简历 ({{ resumes.length }}/4)</h2>
    </div>

    <div class="flex space-x-4 border-gray-300 px-6 pt-4">
      <div v-for="resume in resumes" :key="resume.id" class="relative cursor-pointer rounded-lg"
        @mouseenter="setHovered(resume.id)" @mouseleave="setHovered(null)">

        <CvCard :is-view="false"></CvCard>

        <div v-if="hoveredId === resume.id" class="absolute inset-0 rounded-lg bg-black opacity-50 ">
        </div>
        <div v-if="hoveredId === resume.id"
          class="absolute inset-0 rounded-lg flex flex-col justify-center items-center space-y-2">
          <RouterLink to="/edit/111" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">编辑</RouterLink>
          <button class="px-4 py-2 bg-white hover:bg-gray-200 text-black rounded">删除</button>
        </div>

      </div>

      <!-- 添加简历按钮 -->
      <div class="w-70 flex items-center justify-center bg-gray-200 rounded cursor-pointer">
        <span class="text-4xl text-gray-500 hover:text-5xl transition-all duration-300">+</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
