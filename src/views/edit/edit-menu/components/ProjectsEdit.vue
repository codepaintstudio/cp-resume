<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
const resume = useResumeStore();
</script>

<template>
  <div class="overflow-scroll overscroll-contain no-scrollbar">
    <div v-for="(project, index) in resume.projects" :key="project.id"
      class="p-10 px-14 border-b border-gray-300 relative">
      <button v-if="index !== 0" @click="resume.deleteProject(project.id)"
        class="p-1 bg-red-400 hover:bg-red-600 rounded-sm mb-2 absolute right-5 text-sm text-white">删除</button>
      <div class="grid grid-cols-2 gap-8">
        <div class="text-sm text-gray-700">
          <label class="mb-1">项目名称：</label>
          <input type="text" v-model="project.projectName"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700">
          <label class="mb-1">担任角色：</label>
          <input type="text" v-model="project.role"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700">
          <label class="mb-1">开始日期：</label>
          <input type="date" v-model="project.startDate"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700">
          <label class="mb-1">结束日期：</label>
          <input type="date" v-model="project.endDate"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700 col-span-2">
          <label class="mb-1">项目简介：</label>
          <br />
          <textarea v-model="project.briefIntroduction"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 w-5/6 h-16"></textarea>
        </div>
        <div class="text-sm text-gray-700 col-span-2">
          <label class="mb-1">项目描述：</label>
          <br />
          <textarea v-model="project.description"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 w-5/6 h-24"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
