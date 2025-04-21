<script setup lang="ts">
import { useTemplateStore } from "@/stores/useTemplateStore";

const templateStore = useTemplateStore();

</script>

<template>

  <h2 class="text-sm font-semibold mb-4">间距设置</h2>

  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <span class="text-xs text-nowrap pr-[1em]">行间距：</span>
      <input type="range" min="15" max="50" v-model="templateStore.lineSpacing" class="w-25 accent-blue-500" />
      <span class="text-xs text-right">{{ templateStore.lineSpacing - 15 }}</span>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-xs text-nowrap">模块间距：</span>
      <input type="range" min="0" max="50" v-model="templateStore.blockSpacing" class="w-25 accent-blue-500" />
      <span class="text-xs text-right">{{ templateStore.blockSpacing }}</span>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-xs text-nowrap pr-[1em]">页边距：</span>
      <input type="range" min="5" max="50" v-model="templateStore.pageMargin" class="w-25 accent-blue-500" />
      <span class="text-xs text-right">{{ templateStore.pageMargin }}</span>
    </div>
  </div>
</template>

<style scoped></style>
