<script setup lang="ts">
import { useTemplateStore } from '@/stores/useTemplateStore';
const templateStore = useTemplateStore()

</script>
<template>
  <h2 class="text-sm font-semibold mb-4">颜色设置</h2>
  <div class="flex flex-col items-center space-y-4">
    <div class="flex items-center space-x-1">
      <label class="text-xs text-nowrap pr-[1em]">主题颜色:</label>
      <input class="changeColor" type="color" v-model="templateStore.themeColor" />
    </div>
    <div class="flex items-center space-x-1">
      <label class="text-xs text-nowrap pr-[1em]">字体颜色:</label>
      <input class="changeColor" type="color" v-model="templateStore.fontColor" />
    </div>
  </div>

</template>
<style scoped></style>
