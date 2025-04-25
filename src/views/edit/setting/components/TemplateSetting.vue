<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Template } from '@/types/template';
import { useTemplateStore } from '@/stores/useTemplateStore';
import CvCard from '@/components/CvCard.vue';
import { getTemplateList } from "@/api/resumeTemplate.ts";
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute();
const templateStore = useTemplateStore();
const templates = ref<Template[]>([]);

const currentPage = ref<number>(1); // 当前页码
const pageSize = ref<number>(10); // 每页显示的模板数量
const total = ref<number>(0); // 总模板数量
// 获取并初始化模板列表
onMounted(async () => {
  fetchTemplateList()
});

// 获取列表数据
const fetchTemplateList = async () => {
  try {
    const res = await getTemplateList(currentPage.value, pageSize.value)
    templates.value = res.data.items
    total.value = res.data.total
  } catch (error) {
    alert('获取模板列表失败')
  }
}

const [sourceType] = (route.params.id as string).split('-')
const emit = defineEmits(['setActiveIndex']);
const setTemplate = (template: Template) => {
  if(sourceType === 'new') {
    templateStore.setTemplate(template);
    router.replace(`/edit/new-${template.resumeTemplateId}`);
  } else {
    templateStore.setTemplate(template);
  }

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
