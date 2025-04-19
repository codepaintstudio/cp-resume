<script setup lang="ts">
import { ref, onMounted, watch, defineAsyncComponent, computed } from 'vue'
import type { Template } from '@/types/template';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { getTemplates } from '@/utils/getTemplates';
import { useResumeStore } from '@/stores/useResumeStore';

const resumeStore = useResumeStore();

const templateStore = useTemplateStore();
// 动态导入所有模板组件
const templateModules = import.meta.glob('../../../template/**/indexPage.vue');
// 模板列表
const templates = ref<Template[]>([]);
// 当前渲染的组件
const currentComponent = ref();

// 获取并初始化模板列表
onMounted(async () => {
  try {
    templates.value = await getTemplates();
    // 如果 Pinia 中有已选中的模板，则恢复

    if (templates.value.length > 0 && !templateStore.currentTemplate) {
      templateStore.currentTemplate = templates.value[0];
    }
    loadCurrentTemplate();
  } catch (error) {
    console.error('获取模板列表失败:', error);
  }
});

// 监听 templateStore.currentTemplate 的变化，以加载对应的组件
watch(
  () => templateStore.currentTemplate,
  (newTemplate) => {
    if (newTemplate) {
      loadCurrentTemplate();
    }
  }
);

// 监听 store 的变化，保存到 localStorage
watch(
  () => resumeStore.$state,
  () => {
    resumeStore.saveToLocalStorage();
  },
  { deep: true }
);

// 加载当前选中的模板组件
const loadCurrentTemplate = () => {
  const selectedTemplate = templateStore.currentTemplate;
  if (selectedTemplate?.folderPath) {
    const folderName = selectedTemplate.folderPath;
    if (!folderName) {
      console.error('模板路径错误:', selectedTemplate.folderPath);
      return;
    }
    const importPath = `../../../template/${folderName}/indexPage.vue`;
    const importFunc = templateModules[importPath];
    if (importFunc) {
      currentComponent.value = defineAsyncComponent(() => importFunc() as Promise<typeof import('*.vue')['default']>);
    } else {
      console.error(`未找到路径为 ${importPath} 的组件`);
    }
  }
};

// 设定样式变量
const colorStyles = computed(() => {
  return {
    '--page-margin': `${templateStore.pageMargin}px`,
  };
});
</script>
<template>

  <div :style="colorStyles" id="resume-container" class="bg-white rounded-lg w-200 space-y-4">
    <component v-for="(item, index) in resumeStore.sections" :is="currentComponent" :module="item.key" :key="index"
      v-show="item.value" />
  </div>

</template>

<style scoped>
#resume-container {
  padding: var(--page-margin);
}
</style>


<!-- <script setup lang="ts">
import { watch } from "vue";
import { useResumeStore } from "@/stores/useResumeStore";

// 导入所有简历模块组件
import PersonalInfoComponent from "./components/PersonalInfoComponent.vue";
import EducationComponent from "./components/EducationComponent.vue";
import WorkExperienceComponent from "./components/WorkExperienceComponent.vue";
import SkillsComponent from "./components/SkillsComponent.vue";
import ProjectsComponent from "./components/ProjectsComponent.vue";
import HonorsComponent from "./components/HonorsComponent.vue";
import SummaryComponent from "./components/SummaryComponent.vue";
import type { Component } from "vue";

const resumeStore = useResumeStore();

// 组件映射表：label -> 组件
const componentsMap: Record<string, Component> = {
  "personalInfo": PersonalInfoComponent,
  "education": EducationComponent,
  "workExperience": WorkExperienceComponent,
  "skills": SkillsComponent,
  "projects": ProjectsComponent,
  "honors": HonorsComponent,
  "summary": SummaryComponent,
};

// 监听 store 的变化，保存到 localStorage
watch(
  () => resumeStore.$state,
  () => {
    resumeStore.saveToLocalStorage();
  },
  { deep: true }
);
</script>

<template>
  <div id="resume-container" class="bg-white p-6 rounded-lg w-200 space-y-4">

    <component v-for="(item, index) in resumeStore.sections" :key="index" :is="componentsMap[item.key]"
      v-show="item.value" />
  </div>
</template> -->
