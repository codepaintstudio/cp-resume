<script setup lang="ts">
import { exportToPDF } from "@/utils/exportToPdf.ts";
import { useTemplateStore } from '@/stores/useTemplateStore';
import { useResumeStore } from '@/stores/useResumeStore';
import { updateResume, createResume } from '@/api/resume.ts'
import { computed,ref } from 'vue'
import { useRoute } from 'vue-router';
import router from '@/router'
import { showMessage } from '@/utils/message.ts'

const route = useRoute();
const templateStore = useTemplateStore();
// 触发 PDF 导出
const handleExport = () => {
  exportToPDF("resume-container", templateStore.currentTemplate.resumeTemplateName);
};

const resumeStore = useResumeStore();
const sourceType = computed(() => (route.params.id as string).split('-')[0]);
const realId = computed(() => (route.params.id as string).split('-')[1]);
const loading = ref(false)

const saveResume = async () => {
  loading.value = true
  if(sourceType.value === 'resume') {
    try {
      let resume = {
        resumeContent: resumeStore.$state,
      };
      resume.resumeContent.resumeTemplateId = templateStore.currentTemplate? templateStore.currentTemplate.resumeTemplateId : resume.resumeContent.resumeTemplateId;
      resume.resumeContent.setting = templateStore.currentTemplate? templateStore.getTemplateForExport().resumeTemplateContent.setting : resume.resumeContent.setting;
      resume.resumeContent.resumeTemplateName = templateStore.currentTemplate? templateStore.currentTemplate.resumeTemplateName : resume.resumeContent.resumeTemplateName;
      await updateResume(realId.value, resume);
      loading.value = false
      showMessage({
        type: 'success',
        message: '简历保存成功'
      })
    } catch (error) {
      loading.value = false
      showMessage({
        type: 'error',
        message: '简历保存失败'
      })
    }
  } else {
    try {
      let resume = {
        resumeContent: resumeStore.$state,
      };
      resume.resumeContent.resumeTemplateId = realId.value
      resume.resumeContent.setting = templateStore.currentTemplate? templateStore.getTemplateForExport().resumeTemplateContent.setting : resume.resumeContent.setting;
      resume.resumeContent.resumeTemplateName = templateStore.currentTemplate? templateStore.currentTemplate.resumeTemplateName : resume.resumeContent.resumeTemplateName;
      const res = await createResume(resume);
      router.replace(`/edit/resume-${res.data.resumeId}`);
      loading.value = false
      showMessage({
        type: 'success',
        message: '简历创建成功'
      })
    } catch (error) {
      loading.value = false
      showMessage({
        type: 'error',
        message: '简历创建失败'
      })
    }
  }

};
</script>
<template>
  <LoadingSpinner v-if="loading"></LoadingSpinner>
  <header class="fixed z-10  top-0 flex w-full justify-between items-center px-10 bg-white shadow-md h-18">

    <div class="flex items-center space-x-2">

      <!-- Logo -->
      <RouterLink to="/"><img src="@/assets/img/edit/logo.png" alt="cp-resume" class="h-16"></RouterLink>

      <RouterLink to="/"><span class="ml-2  text-black text-xl font-bold">CP-ResumeTools</span></RouterLink>


      <!--撤销与云端 -->
      <div class="ml-18 flex items-center space-x-6">
<!--        <button class="text-gray-600 hover:text-blue-500 hover:scale-107 active:scale-100 transition-all duration-200">-->
<!--          <span class="icon-[la&#45;&#45;undo] text-xl"></span>-->
<!--        </button>-->
<!--        <button class="text-gray-600 hover:text-blue-500 hover:scale-107 active:scale-100 transition-all duration-200">-->
<!--          <span class="icon-[la&#45;&#45;redo] text-xl"></span>-->
<!--        </button>-->
        <button
          @click="saveResume"
          class="text-gray-600 hover:text-blue-500 ml-2 hover:scale-105 active:scale-100 transition-all duration-200">
          <span class="icon-[solar--cloud-download-outline] text-xl"></span>
        </button>
      </div>

    </div>



    <!-- 右侧按钮 -->
    <div class="flex items-center space-x-8 mr-10">
      <button class="h-[35px] flex items-center space-x-3 px-4 py-2 border border-black rounded hover:bg-gray-100">
        <span class="icon-[teenyicons--share-outline]"></span>
        <span>分享</span>
      </button>
      <button @click="handleExport"
        class="h-[35px] flex items-center space-x-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        <span class="icon-[uil--export]"></span>
        <span>导出</span>
      </button>
    </div>
  </header>
</template>
