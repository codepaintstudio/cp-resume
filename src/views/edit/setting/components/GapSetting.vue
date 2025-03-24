<script setup lang="ts">
import { ref } from "vue";

const lineSpacing = ref(21);
const blockSpacing = ref(21);
const pageMargin = ref(21);
</script>

<template>

  <h2 class="text-sm font-semibold mb-4">间距设置</h2>

  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <span class="text-xs text-nowrap pr-[1em]">行间距：</span>
      <input type="range" min="0" max="50" v-model="lineSpacing" class="w-25 accent-blue-500" />
      <span class="text-xs text-right">{{ lineSpacing }}</span>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-xs text-nowrap">模块间距：</span>
      <input type="range" min="0" max="50" v-model="blockSpacing" class="w-25 accent-blue-500" />
      <span class="text-xs text-right">{{ blockSpacing }}</span>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-xs text-nowrap pr-[1em]">页边距：</span>
      <input type="range" min="0" max="50" v-model="pageMargin" class="w-25 accent-blue-500" />
      <span class="text-xs text-right">{{ pageMargin }}</span>
    </div>
  </div>
</template>

<style scoped></style>
