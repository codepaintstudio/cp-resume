<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import CvCard from "@/components/CvCard.vue";
import type { Template } from "@/types/template";
import { useTemplateStore } from '@/stores/useTemplateStore.ts'
import cvImg from '/default_cv.png'

const templateStore = useTemplateStore()
// 接收父组件传递的控制菜单显示状态的 props
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  cvTemplate: {
    type: Object as () => Template,
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
const openDetail = (cvIndex: Template) => {
  emit('updateCvList', cvIndex);
  scrollToDetail();
};

const setTemplate = (cvTemplate: Template) => {
  templateStore.setTemplate(cvTemplate)
  setTimeout(() => {
    window.location.reload();
  }, 100);

}


</script>

<template>
  <div v-if="props.isVisible" class="pb-10" @click.self="closeMenu">
    <div class="flex flex-col justify-center w-340  bg-white opacity-100 p-16 rounded-lg shadow-lg mx-auto mt-[70px]">

      <button @click="prevCv"
        class="fixed z-10  top-1/2 left-24 w-10 h-10  bg-[url(@/assets/img/cv-template/navigate_before.webp)] bg-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-0.5"></button>
      <button @click="nextCv"
        class="fixed z-10 top-1/2 right-24 w-10 h-10 bg-[url(@/assets/img/cv-template/navigate_next.webp)] bg-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-0.5"></button>

      <!-- 简历详情 -->
      <div v-if="cvTemplate" class="flex mt-[1rem] justify-center md:flex-row items-center md:items-start gap-6 mb-10"
        ref="detailSectionRef">
        <!-- 左侧简历预览 -->
        <div class="mr-[8rem]">
          <img :src="cvTemplate.resumeTemplateContent.thumbnail || cvImg" alt="简历预览"
            class="rounded-lg shadow-[0px_0px_15px_-5px] w-[350px]" />
        </div>

        <!-- 右侧详情 -->
        <div class="space-y-5 mt-[50px]">
          <h1 class="text-2xl font-bold">{{ cvTemplate.resumeTemplateName }}</h1>
          <div class="flex gap-2">
            <span class="px-2 py-1 text-sm bg-gray-200 rounded">{{ cvTemplate.resumeTemplateContent.style }}</span>
            <span class="px-2 py-1 text-sm bg-gray-200 rounded">{{ cvTemplate.resumeTemplateContent.industry }}</span>
            <span class="px-2 py-1 text-sm bg-gray-200 rounded">{{ cvTemplate.resumeTemplateContent.color }}</span>
          </div>

          <p class="text-gray-600 text-sm color-[#595b5e]">颜色：{{ cvTemplate.resumeTemplateContent.color }}</p>

          <RouterLink @click="setTemplate(cvTemplate)" target="_blank" :to="`/edit/new-${cvTemplate.resumeTemplateId}`"
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

      <div v-else>
        <h1 class="h-50 text-center text-xl font-semibold mt-4">加载中...</h1>
      </div>

      <!-- 推荐简历列表 -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">更多推荐相似</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <CvCard v-for="(i, index) in cvList" :key="i.resumeTemplateId" @click="openDetail(cvList[index])" :cvTemplate="i"
            size="0.8"></CvCard>
        </div>
        <div v-if="!cvList.length" class="text-center my-12 pb-10 text-xl font-semibold mb-4 text-gray-500">
          <h1>暂无相关推荐</h1>
        </div>
      </div>

    </div>
  </div>

</template>
