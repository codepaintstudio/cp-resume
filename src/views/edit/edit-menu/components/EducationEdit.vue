<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore'
const resume = useResumeStore()
</script>
<template>
  <div class="overflow-scroll overscroll-contain no-scrollbar ">
    <div v-for="(edu, index) in resume.education" :key="edu.id" class="p-10 px-14 border-b-1 border-gray-300 relative">
      <button v-if="index !== 0" @click="resume.deleteEducation(edu.id)"
        class="p-1 bg-red-400 hover:bg-red-600 rounded-sm mb-2 absolute right-5 text-sm text-white">删除</button>
      <div class="grid grid-cols-2 gap-8">
        <div class="text-sm text-gray-700">
          <label class="mb-1">学校名称：</label>
          <input type="text" v-model="edu.school"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700">
          <label class="mb-1">学位：</label>
          <input type="text" v-model="edu.degree"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700">
          <label class="mb-1">专业：</label>
          <input type="text" v-model="edu.major"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700">
          <label class="mb-1">开始日期：</label>
          <input type="date" v-model="edu.startDate"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700">
          <label class="mb-1">结束日期：</label>
          <input type="date" v-model="edu.endDate"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
