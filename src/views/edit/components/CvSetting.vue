<script setup lang="ts">
import { ref } from "vue";

const buttons = ref([
  { label: "间距设置", icon: "icon-[carbon--text-line-spacing]" },
  { label: "字体设置", icon: "icon-[ri--font-family]" },
  { label: "颜色设置", icon: "icon-[streamline--interface-edit-brush-3-brush-color-colors-design-paint-painting-roller-rolling]" },
  { label: "标题编辑", icon: "icon-[iconamoon--edit-thin]" },
  { label: "更换模板", icon: "icon-[tabler--replace]" }
]);
</script>

<template>
  <div class="w-22 bg-white rounded-sm p-4 space-y-4">
    <button v-for="(btn, index) in buttons" :key="index" class="w-full py-2 text-black rounded flex flex-col items-center space-y-1
        transition-all duration-200 hover:text-blue-500 hover:scale-102 active:scale-100">
      <span :class="[btn.icon, 'text-xl']"></span>
      <span class="text-xs">{{ btn.label }}</span>
    </button>
  </div>
</template>
