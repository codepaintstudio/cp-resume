<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
const resume = useResumeStore();
</script>

<template>
  <div class="overflow-scroll overscroll-contain no-scrollbar">
    <!-- 作品展示模块 -->
    <div v-for="(item, index) in resume.portfolio" :key="item.id" class="p-10 px-14 border-b border-gray-300 relative">
      <button v-if="index !== 0" @click="resume.deletePortfolio(item.id)"
        class="p-1 bg-red-400 hover:bg-red-600 rounded-sm mb-2 absolute right-5 text-sm text-white">删除</button>

      <div class="grid grid-cols-2 gap-8 text-sm text-gray-700">
        <div>
          <label class="mb-1">作品名称：</label>
          <input type="text" v-model="item.name"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 " />
        </div>
        <div>
          <label class="mb-1">作品链接：</label>
          <input type="text" v-model="item.url"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 " />
        </div>
        <div class="col-span-2">
          <label class="mb-1">作品描述：</label>
          <br />
          <textarea v-model="item.description"
            class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 w-5/6 h-20"></textarea>
        </div>
      </div>
    </div>

  </div>
</template>
