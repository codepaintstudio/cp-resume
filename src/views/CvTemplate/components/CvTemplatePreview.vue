<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import CvCard from "@/components/CvCard.vue";

// 接收父组件传递的控制菜单显示状态的 props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

// 自定义事件，触发父组件关闭菜单
const emit = defineEmits(['update:isVisible']);

const closeMenu = () => {
  emit('update:isVisible', false);
};
</script>

<template>
  <div v-if="props.isVisible" class="mb-[30px]" @click.self="closeMenu">
    <div
      class="flex flex-col justify-center w-320 min-h-screen bg-white opacity-100 p-16 rounded-lg shadow-lg mx-auto mt-[30px]">

      <!-- 菜单内容 -->
      <!-- <div class="container mx-auto p-6"> -->

      <!-- 简历详情 -->
      <div class="flex mt-[1rem] justify-center md:flex-row items-center md:items-start gap-6">
        <!-- 左侧简历预览 -->
        <div class="mr-[8rem]">
          <img src="@/assets/images/default-resume.png" alt="简历预览" class="rounded-lg shadow-md w-[350px]" />
        </div>

        <!-- 右侧详情 -->
        <div class="space-y-5 mt-[50px]">
          <h1 class="text-2xl font-bold">蓝色简约简历蓝色简约简历</h1>
          <div class="flex gap-2">
            <span class="px-2 py-1 text-sm bg-gray-200 rounded">简约</span>
            <span class="px-2 py-1 text-sm bg-gray-200 rounded">商务</span>
            <span class="px-2 py-1 text-sm bg-gray-200 rounded">蓝色</span>
          </div>

          <p class="text-gray-600 text-sm color-[#595b5e]">尺寸：21x29.5厘米</p>
          <p class="text-gray-600 text-sm color-[#595b5e]">颜色：蓝色</p>

          <RouterLink to="/edit"
            class="mt-[40px] w-[15rem] bg-blue-500 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 justify-center">
            <span>使用此模板</span>
            <span>→</span>
          </RouterLink>

          <ul class="pl-[1em]">
            <li class="list-disc text-gray-600 text-xs color-[#595b5e]">可自定义修改</li>
            <li class="list-disc text-gray-600 text-xs color-[#595b5e]">支持导出文档、云端保存、分享转发</li>
          </ul>


        </div>
      </div>

      <!-- 推荐简历列表 -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">更多推荐相似</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <CvCard v-for="i in 10" :key="i" custom-class="w-50 h-76"></CvCard>
        </div>
      </div>

      <!-- </div> -->

    </div>
  </div>

</template>
