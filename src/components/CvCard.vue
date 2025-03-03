<script setup lang="ts">
import imgCV from "@/assets/images/default-resume.png";
import { defineProps } from "vue";

defineProps({
  customClass: {
    type: String,
    default: 'w-62 h-90'
  }
});

</script>
<template>
  <div :class="['bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow', customClass]">
    <img :src="imgCV" class="w-full h-3/4 object-cover rounded-t-lg" :alt="`简历模板`">
    <div class="p-3">
      <div class="flex items-center justify-between">
        <h3 class="text-gray-800 font-medium">简约简历模板</h3>
      </div>
      <div class="flex flex-wrap gap-2 mt-1 mb-2">
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">简约</span>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">商务</span>
        <span class="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded">蓝色</span>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
