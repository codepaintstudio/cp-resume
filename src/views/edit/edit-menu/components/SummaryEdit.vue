<script setup lang="ts">
import { useResumeStore } from '@/stores/useResumeStore';
const resume = useResumeStore();
</script>

<template>
  <div class="overflow-scroll overscroll-contain no-scrollbar">
    <div class="p-10 px-14 border-gray-300 relative">
      <div class="text-sm text-gray-700">
        <label class="mb-1">自我评价：</label>
        <textarea v-model="resume.summary"
          class="border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4 w-full h-82 resize-none"></textarea>
      </div>
    </div>
  </div>
</template>
