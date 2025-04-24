<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTemplates } from '@/utils/getTemplates';
import type { Template } from '@/types/template';
import { useTemplateStore } from '@/stores/useTemplateStore';
import CvCard from '@/components/CvCard.vue';

const templateStore = useTemplateStore();
const templates = ref<Template[]>([]);
// 获取并初始化模板列表
onMounted(async () => {
  try {
    templates.value = await getTemplates();
  } catch (error) {
    console.error('获取模板列表失败:', error);
  }
});

const emit = defineEmits(['setActiveIndex']);
const setTemplate = (template: Template) => {
  templateStore.setTemplate(template);
  //传值给父组件activeIndex = null
  emit('setActiveIndex', null);
};

</script>
<template>
  <div class="grid grid-rows-[auto_1fr] gap-4 h-full">
    <div>模板选择</div>
    <div class="flex space-y-5 justify-between flex-wrap p-5 overflow-scroll overscroll-contain no-scrollbar">
      <div v-for="(template, index) in templates" :key="index" @click="setTemplate(template)">
        <CvCard size="0.9" :cv-template="template"></CvCard>
      </div>
      <CvCard size="0.9"  class="opacity-0"></CvCard>
      <CvCard size="0.9"  class="opacity-0"></CvCard>
      <CvCard size="0.9"  class="opacity-0"></CvCard>
      <CvCard size="0.9"  class="opacity-0"></CvCard>

    </div>
  </div>

</template>
<style scoped></style>
