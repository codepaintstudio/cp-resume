<script setup lang="ts">
import CvPreview from './components/CvPreview.vue';
import CvEdit from './components/CvEdit.vue';

</script>
<template>

  <div class="flex h-screen bg-gray-200">

    <!-- 左侧预览区域 -->
    <div class="w-1/2 p-4 overflow-auto">
      <CvPreview />
    </div>

    <!-- 右侧编辑区域 -->
    <div class="w-1/2 p-4 border-l overflow-auto">
      <CvEdit />
    </div>

  </div>

</template>
<style scoped></style>
