<script setup lang="ts">
import { useTemplateStore } from '@/stores/useTemplateStore'

const templateStore = useTemplateStore()
</script>
<template>
  <h2 class="text-sm font-semibold mb-4">标题设置</h2>
  <!-- 标题修改 -->
   <input type="text" v-model="templateStore.currentTemplate.resumeTemplateName" class="border w-full border-gray-400 rounded-sm focus:outline-none focus:border-blue-500 py-1.5 px-4">
</template>
<style scoped></style>
