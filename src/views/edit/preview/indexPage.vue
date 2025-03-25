<script setup lang="ts">
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
</template>
