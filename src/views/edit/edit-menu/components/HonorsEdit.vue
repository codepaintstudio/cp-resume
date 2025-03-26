<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
const resume = useResumeStore();
</script>

<template>
  <div class="overflow-scroll overscroll-contain no-scrollbar">
    <div v-for="(honor, index) in resume.honors" :key="honor.id" class="p-10 px-14 border-b border-gray-300 relative">
      <button v-if="index !== 0" @click="resume.deleteHonor(honor.id)"
        class="p-1 bg-red-400 hover:bg-red-600 rounded-sm mb-2 absolute right-5 text-sm text-white">删除</button>
      <div class="grid grid-cols-2 gap-8">
        <div class="text-sm text-gray-700">
          <label class="mb-1">荣誉名称：</label>
          <input type="text" v-model="honor.honorName"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="text-sm text-gray-700">
          <label class="mb-1">获奖时间：</label>
          <input type="date" v-model="honor.date"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4" />
        </div>
        <div class="col-span-2 text-sm text-gray-700">
          <label class="mb-1">描述：</label>
          <br />
          <textarea v-model="honor.description"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 w-5/6 h-24 resize-none"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
