<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTemplates } from '@/utils/getTemplates';
import type { Template } from '@/types/template';
import { useTemplateStore } from '@/stores/useTemplateStore';

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


</script>
<template>
  <div>模板设置</div>
  <div>
    <button class="p-2 block mb-1 bg-amber-100" v-for="(template, index) in templates" :key="index"
      @click="templateStore.setTemplate(template)">模板{{ template.id }}
    </button>
  </div>
</template>
<style scoped></style>
