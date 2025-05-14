<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import CvCard from '@/components/CvCard.vue'
import Menu from '@/views/cv-template/components/CvTemplatePreview.vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import type { Template} from "@/types/template";
import { showMessage } from '@/utils/message.ts'
import { getTemplateList } from "@/api/resumeTemplate.ts";
import { getResumeDetail, getResumeList } from "@/api/resume.ts"
import { ArrowUp } from 'lucide-vue-next'
import { scrollToTop } from '../../utils/tool'

const router = useRouter()
const userStore = useUserStore()

// 模板数据
const templates = ref<Template[]>([]);
const total = ref<number>(0);
const loading = ref(true)
const currentPage = ref<number>(1);
const pageSize = ref<number>(5);

// 用户简历数据
const resumes = ref<Array<any>>([]);
const totalResumes = ref<number>(0); // 总模板数量
const loadingResume = ref(true)
const currentPageRes = ref<number>(1); // 当前页码
const pageSizeRes = ref<number>(10000); // 每页显示的模板数量
// 模板详情相关状态
const selectedIndex = ref<number>(0);
const selectedTemplate = ref<Template>();
const showMenu = ref<boolean>(false);
const isViewingTemplate = ref(true); // 当前查看的是模板(true)还是用户简历(false)

// 计算属性：获取推荐模板（前5个）
const recommendedTemplates = computed(() => {
  return templates.value.slice(0, 5);
});

// 计算属性：获取历史模板（前5个）
const recommendedHisTemplates = computed(() => {
  return resumes.value.slice(0, 5);
});

// 跳转到简历制作页
const navigateToCv = () => {
  router.push('/cv')
}

// 获取模板列表数据
const fetchTemplateList = async () => {
  try {
    const res = await getTemplateList(currentPage.value, pageSize.value)
    templates.value = res.data.items
    total.value = res.data.total
    loading.value = false
  } catch (error) {
    showMessage({
      type: 'error',
      message: '获取简历模板列表失败'
    })
    loading.value = false
  }
}
const hoveredId = ref<number | null>(null);
const setHovered = (id: number | null) => {
  hoveredId.value = id;
};
//返回一个cvTemplate对象
const getCvTemplate = (resumeTemplateName: string, thumbnail?:string) => {
  return {
    resumeTemplateName,
    resumeTemplateContent: {
      folderPath: '',
      thumbnail,
      style: '风格',
      industry: '行业',
      color: '颜色',
    },
  };
};
// 获取简历详情
const fetchResumeDetails = async (id: string) => {
  try {
    const res = await getResumeDetail(id);
    return res.data;
  } catch (error) {
    showMessage({
      type: 'error',
      message: '获取简历详情失败'
    })
    return null;
  }
}
//获取历史简历
const fetchResumeList = async () => {
  try {
    const res = await getResumeList(currentPageRes.value, pageSizeRes.value)
    resumes.value = res.data.items
    resumes.value = resumes.value.filter(item => String(item.resumeUserId) === userStore.userId)
    totalResumes.value = resumes.value.length
    loadingResume.value = false
  } catch (error) {
    loadingResume.value = false
    showMessage({
      type: 'error',
      message: '获取简历列表失败'
    })
  }
}
// 切换菜单显示状态
const toggleMenu = async (index: number, isUserResume = false) => {
  isViewingTemplate.value = !isUserResume;

  selectedIndex.value = index;
  showMenu.value = true;
};

// 更新cv列表
const updateCv = (newValue: Template ) => {
  selectedTemplate.value = newValue;
};

// 切换上一张
const prevCv = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--;
    selectedTemplate.value = recommendedTemplates.value[selectedIndex.value]
  }
};

// 切换下一张
const nextCv = () => {
  const maxIndex =  recommendedTemplates.value.length - 1

  if (selectedIndex.value < maxIndex) {
    selectedIndex.value++;
    selectedTemplate.value = recommendedTemplates.value[selectedIndex.value]
  }
};

// 推荐相似模板
const recommendData = (id: string, style: string, industry: string, color: string) => {
  return isViewingTemplate.value
    ? templates.value.filter(item => {
      const machesId = id !== item.resumeTemplateId;
      const matchesStyle = style === item.resumeTemplateContent.style;
      const matchesIndustry = industry === item.resumeTemplateContent.industry;
      const matchesColor = color === item.resumeTemplateContent.color;
      return (matchesStyle || matchesIndustry || matchesColor) && machesId;
    })
    : []; // 用户简历不显示相似推荐
};

const resumeEdit = (id:number|null) => {
   router.push(`/edit/resume-${id}`)
}
// 组件挂载时获取数据
onMounted(() => {
  fetchTemplateList();
  fetchResumeList();
  // alert(`'User resumes loaded:', ${totalResumes.value}, 'Logged in:', ${userStore.isLoggedIn}`);
});
</script>

<template>
  <div id="relative w-screen h-full bg-white flex">
    <LoadingSpinner v-if="loading" />

    <div v-else class="w-full flex flex-col justify-center items-center z-10">
      <!-- 顶部标题和制作按钮部分 -->
      <div class="w-[60%] h-[60vh] z-10 flex flex-col justify-center items-center relative">
        <div class="relative w-full h-[15vw]">
          <div class="absolute text-[7vw]">CP-ResumeTools</div>
          <div class="absolute right-0 bottom-[-12%] translate-y-[-200%] text-[2vw]">
            码绘工作室简历制作
          </div>
          <div
            class="block w-[12vw] h-[3vw] bg-[url('@/assets/img/Home/MakeResume.png')] bg-contain bg-no-repeat absolute left-1/2 bottom-0 -translate-x-1/2 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            @click="navigateToCv" title="开始制作简历">
          </div>
        </div>
      </div>

      <!-- 精选模板部分 -->
      <div class="w-[70%] h-[70vh] flex flex-col justify-center items-center relative z-10">
        <div class="w-[30vw] h-[6vh] relative">
          <span
            class="absolute block w-[10vw] h-[4vw] bg-[url('@/assets/img/Home/Left2.png')] bg-contain bg-no-repeat left-0 top-[3vh] -translate-y-1/2"></span>
          <span
            class="absolute w-[10vw] h-[4vw] left-1/2 top-[3vh] -translate-x-[40%] -translate-y-1/2 text-[2vw]">精选模板</span>
          <span
            class="absolute block w-[10vw] h-[4vw] bg-[url('@/assets/img/Home/Right1.png')] bg-contain bg-no-repeat right-0 top-[3vh] -translate-y-1/2"></span>
        </div>
        <div class="w-full flex justify-around items-center mt-6 mb-10">
          <CvCard v-for="(template, index) in recommendedTemplates" :key="index" :cvTemplate="template" :is-view="true"
            size="0.8" class="hover:shadow-lg transition-shadow duration-300" @click="toggleMenu(index)" />
        </div>

        <div @click="navigateToCv" class="cursor-pointer group">
          <span
            class="block w-30 h-10 bg-[url('@/assets/img/Home/More2.png')] bg-contain bg-no-repeat transition-all duration-200 group-hover:scale-105 active:scale-95"></span>
        </div>
      </div>

      <!-- 历史简历部分 -->
      <div class="w-[70%] h-[60vh] flex flex-col justify-center items-center relative z-10">
        <div class="w-[30vw] h-[6vh] relative">
          <span
            class="absolute block w-[10vw] h-[4vw] bg-[url('@/assets/img/Home/Left2.png')] bg-contain bg-no-repeat left-0 top-[3vh] -translate-y-1/2"></span>
          <span
            class="absolute w-[10vw] h-[4vw] left-1/2 top-[3vh] -translate-x-[40%] -translate-y-1/2 text-[2vw]">历史简历</span>
          <span
            class="absolute block w-[10vw] h-[4vw] bg-[url('@/assets/img/Home/Right1.png')] bg-contain bg-no-repeat right-0 top-[3vh] -translate-y-1/2"></span>
        </div>

        <div v-if="userStore.isLoggedIn && resumes.length > 0"
          class="w-full flex justify-center items-center gap-4 mt-10 mb-10">
          <CvCard v-for="resume in recommendedHisTemplates.slice(0, 5)" :key="resume.resumeId" :cvTemplate="getCvTemplate(resume.resumeContent.resumeTemplateName)" :is-view="false" @mouseenter="setHovered(resume.resumeId)" @mouseleave="setHovered(null)" @click=resumeEdit(resume.resumeId)
            size="0.8" class="hover:shadow-lg transition-shadow duration-300" />
        </div>
        <div v-else>
          <div class="text-center">
            暂无历史简历，点击 <RouterLink to="/cv" class="text-[#3370FF] hover:underline">开始制作</RouterLink>
          </div>
        </div>
        <RouterLink v-if="userStore.isLoggedIn && resumes.length > 5"
          class="absolute right-0 top-[20%] w-[10vw] h-[2vw] -translate-y-1/2 flex justify-center items-center flex-row group"
          to="/user/cv">

          <span class="block text-[1.2vw] text-[#3370FF] group-hover:underline">查看全部</span>
          <span
            class="block w-[2vw] h-[2vw] bg-[url('@/assets/img/Home/arrow2.png')] bg-contain bg-no-repeat transition-transform group-hover:translate-x-1"></span>
        </RouterLink>
      </div>
    </div>

    <!-- 阴影层 -->
    <div v-if="showMenu" class="fixed z-[1000] top-0 left-0 w-full h-full bg-black opacity-25"></div>

    <!-- 模板详情菜单 - 统一展示方式 -->
    <Menu class="fixed overflow-auto overscroll-contain no-scrollbar h-full z-[1001] top-0 left-0 right-0"
      :cvTemplate="selectedTemplate" :cv-list="isViewingTemplate
        ? recommendData(
          selectedTemplate?.resumeTemplateId || '',
          selectedTemplate?.resumeTemplateContent?.style || '',
          selectedTemplate?.resumeTemplateContent?.industry || '',
          selectedTemplate?.resumeTemplateContent?.color || ''
        )
        : []" :isVisible="showMenu" @update:isVisible="showMenu = $event" @child-next="nextCv" @child-prev="prevCv"
      @update-cv-list="updateCv" />

    <button @click="scrollToTop"
      class="fixed w-12 h-12 bg-white rounded-full right-[10%] bottom-[5%] shadow-md flex justify-center items-center cursor-pointer hover:shadow-lg transition-all duration-300 group"
      aria-label="返回顶部">
      <ArrowUp class="text-gray-600 group-hover:text-[#3370FF] transition-colors" />
    </button>
  </div>
</template>

<style scoped></style>
