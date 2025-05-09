<script setup lang="ts">
import { ref, onMounted, watch, defineAsyncComponent, computed, shallowRef } from 'vue'
import type { Template } from '@/types/template';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { useResumeStore } from '@/stores/useResumeStore';
import { getResumeDetail } from '@/api/resume.ts'
import { getTemplateDetail  } from '@/api/resumeTemplate.ts'
import { useRoute } from 'vue-router';
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { showMessage } from '@/utils/message.ts'

const route = useRoute();
const resumeStore = useResumeStore();
const templateStore = useTemplateStore();
const loading = ref(true)


// 动态导入所有模板组件
const templateModules = import.meta.glob('../../../template/**/indexPage.vue');

// 当前渲染的组件
const currentComponent = shallowRef();
const [sourceType, realId] = (route.params.id as string).split('-')

const fetchTemplate = async (id: string) => {
  try {
    const res = await getTemplateDetail(id);
    templateStore.setTemplate(res.data);
    loading.value = false
  } catch (error) {
    console.error('获取模板失败:', error);
    loading.value = false
    showMessage({
      type: 'error',
      message: '获取模板失败'
    })
  }
};
const fetchResume = async (id: string) => {
  try {
    const res = await getResumeDetail(id);
    resumeStore.setResumeData(res.data.resumeContent);
    const res1 = await getTemplateDetail(res.data.resumeContent.resumeTemplateId);
    res1.data.resumeTemplateContent.setting = res?.data?.resumeContent.setting;
    res1.data.resumeTemplateName = res?.data?.resumeContent.resumeTemplateName;
    templateStore.setTemplate(res1.data);
    loading.value = false
  } catch (error) {
    console.error('获取简历失败:', error);
    loading.value = false
    showMessage({
      type: 'error',
      message: '获取简历失败'
    })
  }
};

// 获取并初始化模板列表
onMounted(async () => {
  try {
    if(sourceType === 'new') {
      // 从模板拉取信息，初始化新简历
      await fetchTemplate(realId);
    } else if (sourceType === 'resume') {
      // 读取已有简历
      await fetchResume(realId);
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
  const selectedTemplate = templateStore.currentTemplate
  if (selectedTemplate?.resumeTemplateContent.folderPath) {
    const folderName = selectedTemplate.resumeTemplateContent.folderPath;
    if (!folderName) {
      console.error('模板路径错误:', selectedTemplate.resumeTemplateContent.folderPath);
      showMessage({
        type: 'error',
        message: '模板配置错误'
      })
      return;
    }
    const importPath = `../../../template/${folderName}/indexPage.vue`;
    const importFunc = templateModules[importPath];
    if (importFunc) {
      currentComponent.value = defineAsyncComponent(() => importFunc() as Promise<typeof import('*.vue')['default']>);
    } else {
      showMessage({
        type: 'error',
        message: '未找到该模板'
      })
      console.error(`未找到路径为 ${importPath} 的组件`);
    }
  }
};

// 设定样式变量
const colorStyles = computed(() => {
  return {
    '--page-margin': `${templateStore.currentTemplate.resumeTemplateContent.setting.pageMargin}px`,
  };
});
</script>
<template>
  <div v-if="loading" class="w-200">
    <LoadingSpinner></LoadingSpinner>
  </div>


  <div v-else :style="colorStyles" id="resume-container" class="bg-white rounded-lg w-200 space-y-4">
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
