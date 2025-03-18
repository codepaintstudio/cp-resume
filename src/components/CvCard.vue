<script setup lang="ts">
// import imgCV from "@/assets/images/default-resume.png";
import { defineProps } from "vue";
import type { Template } from "@/types/template";

defineProps({
  customClass: {
    type: String,
    default: 'w-70 h-100'
  },
  cvTemplate: {
    type: Object as () => Template,
    default: () => ({
      id: '',
      title: '标题',
      imageUrl: 'src/assets/img/default_resume.png',
      style: '风格',
      industry: '行业',
      color: '颜色',
      size: '默认尺寸'
    })
  }
});

</script>
<template>
  <div :class="['bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow', customClass]">
    <img :src="cvTemplate.imageUrl" class="w-full h-3/4 object-cover rounded-t-lg" :alt="`简历模板`">
    <div class="p-3">
      <div class="flex items-center justify-between">
        <h3 class="text-gray-800 font-medium">{{ cvTemplate.title }}</h3>
      </div>
      <div class="flex flex-wrap gap-2 mt-2 mb-2">
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{ cvTemplate.style }}</span>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{ cvTemplate.industry }}</span>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{ cvTemplate.color }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
