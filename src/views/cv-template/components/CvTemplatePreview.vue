<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import CvCard from "@/components/CvCard.vue";
import type { Template } from "@/types/template";

// 接收父组件传递的控制菜单显示状态的 props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  cvTemplate: {
    type: Object as () => Template,
    default: () => {
      return {
        id: '',
        name: '标题',
        folderPath: 'src/assets/img/default_resume.png',
        style: '风格',
        industry: '行业',
        color: '颜色',
      }
    }
  },
  cvList: {
    type: Array as () => Template[],
    default: () => []
  }
});

// 自定义事件，触发父组件关闭菜单
const emit = defineEmits(['update:isVisible', 'childPrev', 'childNext', 'updateCvList']);
const closeMenu = () => {
  emit('update:isVisible', false);
};

// 菜单内容滚到顶部
const detailSectionRef = ref<HTMLElement | null>(null);
const scrollToDetail = () => {
  if (detailSectionRef.value) {
    detailSectionRef.value.scrollIntoView({ behavior: "smooth", block: "end" });
  }
};

// 上一张与下一张切换
const prevCv = () => {
  emit('childPrev')
  scrollToDetail()
};
const nextCv = () => {
  emit('childNext')
  scrollToDetail()
};

// 打开推荐简历详情
const openDetail = (cvIndex: number) => {
  emit('updateCvList', cvIndex);
  scrollToDetail();
};
</script>

<template>
  <div v-if="props.isVisible" class="pb-10" @click.self="closeMenu">
    <div class="flex flex-col justify-center w-340  bg-white opacity-100 p-16 rounded-lg shadow-lg mx-auto mt-[70px]">

      <button @click="prevCv"
        class="fixed z-10  top-1/2 left-24 w-10 h-10  bg-[url(@/assets/img/cv-template/navigate_before.webp)] bg-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-0.5"></button>
      <button @click="nextCv"
        class="fixed z-10 top-1/2 right-24 w-10 h-10 bg-[url(@/assets/img/cv-template/navigate_next.webp)] bg-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-0.5"></button>

      <!-- 简历详情 -->
      <div class="flex mt-[1rem] justify-center md:flex-row items-center md:items-start gap-6 mb-10"
        ref="detailSectionRef">
        <!-- 左侧简历预览 -->
        <div class="mr-[8rem]">
          <img src="@/assets/img/default_resume.png" alt="简历预览" class="rounded-lg shadow-md w-[350px]" />
        </div>

        <!-- 右侧详情 -->
        <div class="space-y-5 mt-[50px]">
          <h1 class="text-2xl font-bold">{{ cvTemplate.name }}</h1>
          <div class="flex gap-2">
            <span class="px-2 py-1 text-sm bg-gray-200 rounded">{{ cvTemplate.style }}</span>
            <span class="px-2 py-1 text-sm bg-gray-200 rounded">{{ cvTemplate.industry }}</span>
            <span class="px-2 py-1 text-sm bg-gray-200 rounded">{{ cvTemplate.color }}</span>
          </div>

          <p class="text-gray-600 text-sm color-[#595b5e]">颜色：{{ cvTemplate.color }}</p>

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
          <CvCard v-for="(i, index) in cvList" :key="i.id" @click="openDetail(index)" :cvTemplate="i"
            custom-class="w-50 h-76"></CvCard>
        </div>
        <div v-if="!cvList.length" class="text-center my-12 pb-10 text-xl font-semibold mb-4 text-gray-500">
          <h1>暂无相关推荐</h1>
        </div>
      </div>

    </div>
  </div>

</template>
