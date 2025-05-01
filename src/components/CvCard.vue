<script setup lang="ts">
import { defineProps, computed } from 'vue'
import cvImg from '/default_cv.png'

interface cvTemplate {
  resumeTemplateName: string
  resumeTemplateContent: {
    folderPath: string
    thumbnail: string | undefined
    style: string
    industry: string
    color: string
  }
}

const props = defineProps({
  isView: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: '1',
  },
  cvTemplate: {
    type: Object as () => cvTemplate,
    default: () => ({
      resumeTemplateName: '标题',
      resumeTemplateContent: {
        folderPath: 'templateA',
        thumbnail: '',
        style: '风格',
        industry: '行业',
        color: '颜色',
      },
    }),
  },
})

const scale = computed(() => parseFloat(props.size))
const customStyle = computed(() => {
  const baseWidth = 280 // 对应 w-70，70 * 4 = 280px
  const baseHeight = 400 // 对应 h-100，100 * 4 = 400px
  return {
    width: `${baseWidth * scale.value}px`,
    height: `${baseHeight * scale.value}px`,
  }
})
</script>
<template>
  <div
    :style="customStyle"
    :class="[
      'bg-white rounded-lg shadow-[0px_0px_8px_-3px] hover:shadow-[0px_0px_15px_-5px] transition-shadow',
    ]"
  >
    <img
      :src="cvTemplate.resumeTemplateContent.thumbnail || cvImg"
      :class="{
        'w-full object-cover object-top rounded-t-lg': true,
        'h-3/4': isView,
        'h-5/6': !isView,
      }"
      :alt="`简历模板`"
    />
    <div class="p-3">
      <div class="flex items-center justify-between">
        <h3 class="text-gray-800 font-medium">{{ cvTemplate.resumeTemplateName }}</h3>
      </div>
      <div v-if="isView" class="flex flex-wrap gap-2 mt-2 mb-2">
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{
          cvTemplate.resumeTemplateContent.style
        }}</span>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{
          cvTemplate.resumeTemplateContent.industry
        }}</span>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{
          cvTemplate.resumeTemplateContent.color
        }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
