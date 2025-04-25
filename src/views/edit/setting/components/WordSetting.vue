<script setup lang="ts">
import { useTemplateStore } from "@/stores/useTemplateStore";
import { ref } from "vue";

const templateStore = useTemplateStore();

const fonts = [
  { fontId: "", name: "默认" },
  { fontId: "zql", name: "ZQL" },
  { fontId: "SimSun", name: "宋体" },
  { fontId: "KaiTi", name: "楷体" },
  { fontId: "ZCOOLKuaiLe-Regular", name: "ZCOOLKuaiLe-Regular" },
  { fontId: "ZhiMangXing-Regular", name: "ZhiMangXing-Regular" },
  { fontId: "ZCOOL QingKe HuangYou", name: "ZCOOL QingKe HuangYou" },
];

// 更新字体到 store
const setFont = (fontId: string) => {
  templateStore.currentTemplate.resumeTemplateContent.setting.fontFamily = fontId;
};
</script>

<template>
  <div class="grid grid-rows-[auto_1fr] h-full">
    <h2 class="text-sm font-semibold mb-2">字体设置</h2>
    <div class="flex flex-col space-y-2 bg-gray-100 p-2 rounded-lg overflow-y-scroll overscroll-contain no-scrollbar">
      <button v-for="font in fonts" :key="font.fontId" :style="{ fontFamily: font.fontId }"
        class="w-full text-sm py-1.5 px-4 text-center rounded-md transition-all relative"
        :class="templateStore.currentTemplate.resumeTemplateContent.setting.fontFamily === font.fontId ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'"
        @click="setFont(font.fontId)">
        简历制作
        <span v-if="templateStore.currentTemplate.resumeTemplateContent.setting.fontFamily === font.fontId"
          class="icon-[proicons--checkmark-starburst] text-xl absolute right-4 top-1/2 transform -translate-y-1/2"></span>
      </button>
    </div>
  </div>
</template>
