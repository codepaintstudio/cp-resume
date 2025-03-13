<script setup lang="ts">
import { ref } from "vue";

const buttons = ref([
  { label: "间距设置", imgUrl: "src/assets/img/edit/util_gap.svg" },
  { label: "字体设置", imgUrl: "src/assets/img/edit/util_word.svg" },
  { label: "颜色设置", imgUrl: "src/assets/img/edit/util_color.svg" },
  { label: "标题编辑", imgUrl: "src/assets/img/edit/util_edit.svg" },
  { label: "更换模板", imgUrl: "src/assets/img/edit/util_change.svg" }
]);
</script>

<template>
  <div class="w-22 bg-white rounded-sm p-4 space-y-4">
    <button v-for="(btn, index) in buttons" :key="index" class="w-full py-2 text-black rounded flex flex-col items-center space-y-1
        transition-all duration-200 hover:bg-gray-100 active:bg-gray-200">
      <img :src="btn.imgUrl" class="w-6" alt="">
      <span class="text-xs">{{ btn.label }}</span>
    </button>
  </div>
</template>
