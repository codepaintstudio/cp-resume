<script setup lang="ts">
import { defineProps } from 'vue'
import type { Template } from '@/types/template'

defineProps({
  isView: {
    type: Boolean,
    default: true,
  },
  customClass: {
    type: String,
    default: 'w-70 h-100',
  },
  cvTemplate: {
    type: Object as () => Template,
    default: () => ({
      id: '',
      name: '标题',
      folderPath: 'src/assets/img/default_resume.png',
      style: '风格',
      industry: '行业',
      color: '颜色',
    }),
  },
})
</script>
<template>
  <div
    :class="['bg-white rounded-lg shadow-[0px_0px_8px_-3px] hover:shadow-[0px_0px_15px_-5px] transition-shadow', customClass]">
    <img :src="`src/template/${cvTemplate.folderPath}/preview.png`"
      :class="{ 'w-full object-cover rounded-t-lg': true, 'h-3/4': isView }" :alt="`简历模板`" />
    <div v-if="isView" class="p-3">
      <div class="flex items-center justify-between">
        <h3 class="text-gray-800 font-medium">{{ cvTemplate.name }}</h3>
      </div>
      <div class="flex flex-wrap gap-2 mt-2 mb-2">
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{
          cvTemplate.style
          }}</span>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{
          cvTemplate.industry
          }}</span>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{
          cvTemplate.color
          }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
