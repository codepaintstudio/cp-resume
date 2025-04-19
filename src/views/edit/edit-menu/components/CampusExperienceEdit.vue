<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
const resume = useResumeStore();
</script>

<template>
  <!-- 校园经历模块 -->
  <div class="overflow-scroll overscroll-contain no-scrollbar">
    <div v-for="(exp, index) in resume.campusExperience" :key="exp.id"
      class="p-10 px-14 border-b border-gray-300 relative ">
      <button v-if="index !== 0" @click="resume.deleteCampusExperience(exp.id)"
        class="p-1 bg-red-400 hover:bg-red-600 rounded-sm mb-2 absolute right-5 text-sm text-white">删除</button>

      <div class="grid grid-cols-2 gap-8 text-sm text-gray-700">
        <div>
          <label class="mb-1">职务/标题：</label>
          <input type="text" v-model="exp.title"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>

        <div class="flex items-center">
          <span>时间：</span>
          <input type="date" v-model="exp.startDate"
            class="ml-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
          <span class="mx-1">-</span>
          <input type="date" v-model="exp.endDate"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>

        <div class="col-span-2">
          <label class="mb-1">主要职责：</label>
          <br />
          <textarea v-model="exp.responsibility"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 w-5/6 h-16"></textarea>
        </div>
        <div class="col-span-2">
          <label class="mb-1">经历描述：</label>
          <br />
          <textarea v-model="exp.description"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 w-5/6 h-24"></textarea>
        </div>
      </div>
    </div>
  </div>


</template>
