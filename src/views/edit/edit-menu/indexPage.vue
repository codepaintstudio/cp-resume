<script setup lang="ts">
import { useMenuStore } from "@/stores/useMenuStore";
import { computed, ref, type Component } from "vue";
import { useResumeStore } from '@/stores/useResumeStore';
import PersonalInfoEdit from "./components/PersonalInfoEdit.vue";
import EducationEdit from "./components/EducationEdit.vue";
import WorkExperienceEdit from "./components/WorkExperienceEdit.vue";
import SkillsEdit from "./components/SkillsEdit.vue";
import ProjectsEdit from "./components/ProjectsEdit.vue";
import HonorsEdit from "./components/HonorsEdit.vue";
import SummaryEdit from "./components/SummaryEdit.vue";

const componentsMap: Record<string, Component> = {
  "personalInfo": PersonalInfoEdit,
  "education": EducationEdit,
  "workExperience": WorkExperienceEdit,
  "skills": SkillsEdit,
  "projects": ProjectsEdit,
  "honors": HonorsEdit,
  "summary": SummaryEdit,
};
const resume = useResumeStore();
const menu = useMenuStore();

//标题编辑逻辑
const isEditing = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const enableEditing = () => {
  isEditing.value = true;
  setTimeout(() => inputRef.value?.focus(), 0);
};
const disableEditing = () => {
  isEditing.value = false;
};

// 计算属性获取 label
const selectedLabel = computed({
  get: () => resume.sections.find(item => item.key === menu.activeMenu)?.label || "",
  set: (newLabel: string) => {
    const section = resume.sections.find(item => item.key === menu.activeMenu);
    if (section) {
      section.label = newLabel;
    }
  },
});

// 添加按钮配置
const buttonConfig = computed(() => {
  switch (menu.activeMenu) {
    case "education":
      return { visible: true, action: addEducation };
    case "workExperience":
      return { visible: true, action: addWorkExperience };
    case "skills":
      return { visible: true, action: addSkill };
    case "projects":
      return { visible: true, action: addProject };
    case "honors":
      return { visible: true, action: addHonor };
    default:
      return { visible: false, action: () => { } };
  }
});
const isButtonVisible = computed(() => buttonConfig.value.visible);
const handleClick = computed(() => buttonConfig.value.action);
// 添加教育经历
const addEducation = () => {
  resume.addEducation({
    school: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: ''
  });
};
const addWorkExperience = () => {
  resume.addWorkExperience({
    company: '',        // 公司名称
    position: '',       // 职位
    startDate: '',      // 开始时间
    endDate: '',        // 结束时间
    description: ''  // 描述
  });
};
const addSkill = () => {
  resume.addSkill({
    skillName: ''      // 技能名称
  });
};
const addProject = () => {
  resume.addProject({
    projectName: '',    // 项目名称
    role: '',           // 担任角色
    startDate: '',      // 开始时间
    endDate: '',        // 结束时间
    description: '',    // 项目描述
    briefIntroduction: '' // 项目简介
  });
};
const addHonor = () => {
  resume.addHonor({
    honorName: '',      // 荣誉名称
    date: '',           // 获奖时间
    description: ''     // 描述
  });
};
</script>

<template>

  <Teleport to="body">
    <div v-if="menu.activeMenu" class="fixed z-14 inset-0 bg-black opacity-25"></div>
    <transition name="fade-slide">
      <div v-if="menu.activeMenu" @click.self="menu.closeMenu"
        class="fixed z-15 inset-0  bg-opacity-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg w-240 h-150 relative">

          <!-- 基本信息 -->
          <div class="grid h-full grid-rows-[auto_1fr_auto]">

            <div class="text-xl px-8 py-5 font-medium border-b border-gray-300">
              <input v-if="isEditing" ref="inputRef" v-model="selectedLabel" @blur="disableEditing"
                @keyup.enter="disableEditing" class="focus:outline-none" />
              <div class="flex space-x-2 items-center" v-else>
                <span>{{ selectedLabel }}</span>
                <i @click="enableEditing" class="icon-[iconamoon--edit-thin] cursor-pointer  hover:text-blue-700"></i>
              </div>
            </div>

            <component :is="componentsMap[menu.activeMenu]" />

            <div class="flex border-t-1 border-gray-300 bottom-0 justify-between px-10 py-5">
              <button v-if="isButtonVisible" @click="handleClick"
                class="border p-2 rounded-sm text-xs hover:bg-gray-100">
                + 添加{{ selectedLabel }}
              </button>
              <div v-else></div>
              <button class="bg-blue-600 text-white hover:bg-blue-700 p-2 px-6 rounded-sm text-xs"
                @click.self="menu.closeMenu">保存</button>
            </div>
          </div>

          <button @click="menu.closeMenu" class="absolute top-2 right-2 text-gray-600">✖</button>
        </div>
      </div>
    </transition>
  </Teleport>

</template>
