<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
const resume = useResumeStore();
</script>

<template>
  <div class="overflow-scroll overscroll-contain no-scrollbar">
    <div v-for="(work, index) in resume.workExperience" :key="work.id"
      class="p-10 px-14 border-b border-gray-300 relative">
      <button v-if="index !== 0" @click="resume.deleteWorkExperience(work.id)"
        class="p-1 bg-red-400 hover:bg-red-600 rounded-sm mb-2 absolute right-5 text-sm text-white">删除</button>
      <div class="grid grid-cols-2 gap-8">
        <div class="text-sm text-gray-700">
          <label class="mb-1">公司名称：</label>
          <input type="text" v-model="work.company"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700">
          <label class="mb-1">职位：</label>
          <input type="text" v-model="work.position"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="flex items-center grid-cols-2 text-sm text-gray-700">
          <span>时间：</span>
          <input type="date" v-model="work.startDate"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
          <span class="mx-1">-</span>

          <input type="date" v-model="work.endDate"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700 col-span-2">
          <label class="mb-1">描述：</label>
          <br />
          <textarea v-model="work.description"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 w-5/6 h-24"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
