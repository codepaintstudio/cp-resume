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
  templateStore.currentTemplate = template;
  //传值给父组件activeIndex = null
  emit('setActiveIndex', null);
};

</script>
<template>
  <div>模板设置</div>
  <div class="flex">
    <div class="p-2 mb-1" v-for="(template, index) in templates" :key="index" @click="setTemplate(template)">
      <CvCard :cv-template="template"></CvCard>
    </div>
  </div>
</template>
<style scoped></style>
