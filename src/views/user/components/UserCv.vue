<script setup lang="ts">
import { ref, onMounted } from "vue";
import CvCard from "@/components/CvCard.vue";
import { getResumeList, deleteResume } from '@/api/resume.ts'
import { useUserStore} from '@/stores/useUserStore.ts'
import { showMessage } from '@/utils/message.ts'
import { showConfirm } from '@/utils/confirm.ts'

const userStore = useUserStore()
const resumes = ref<Array<any>>([]);
const loading = ref(true)
const currentPage = ref<number>(1); // 当前页码
const pageSize = ref<number>(10000); // 每页显示的模板数量

onMounted(() => {
  fetchResumeList()
})

// 获取简历列表
const fetchResumeList = async () => {
  try {
    const res = await getResumeList(currentPage.value, pageSize.value)
    resumes.value = res.data.items
    resumes.value = resumes.value.filter(item => String(item.resumeUserId) === userStore.userId)
    userStore.userCvTotal = resumes.value.length
    loading.value = false
  } catch (error) {
    loading.value = false
    showMessage({
      type: 'error',
      message: '获取简历列表失败'
    })
  }
}

// 删除简历
const deleteCv = async (resumeId: string) => {
  loading.value = true
  try {
    await deleteResume(resumeId)
    resumes.value = resumes.value.filter((resume) => resume.resumeId !== resumeId)
    loading.value = false
    showMessage({
      type: 'success',
      message: '删除简历成功'
    })
  } catch (error) {
    loading.value = false
    showMessage({
      type: 'error',
      message: '删除简历失败'
    })
  }
}

async function onDelete(id:string) {
  try {
    await showConfirm({ message: '确定要删除这份记录简历？' })
    await deleteCv(id)
    // 执行删除逻辑
  } catch {
    console.log('用户取消了操作')
  }
}

const hoveredId = ref<number | null>(null);
const setHovered = (id: number | null) => {
  hoveredId.value = id;
};

// 返回一个cvTemplate对象
const getCvTemplate = (resumeTemplateName: string, thumbnail?: string) => {
  return {
    resumeTemplateName,
    resumeTemplateContent: {
      folderPath: '',
      thumbnail, // 关键：保留 thumbnail 参数
      style: '风格',
      industry: '行业',
      color: '颜色',
    },
  };
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center w-[100%] h-1/8 px-6 border-b-2 border-[#D9D9D9]">
      <h2 class="text-lg font-semibold">我的云简历 ({{ userStore.userCvTotal }}/10)</h2>
    </div>

    <LoadingSpinner v-if="loading"></LoadingSpinner>

    <div class="flex flex-wrap space-x-6 space-y-5 border-gray-300 px-10 pt-4 h-7/8  no-scrollbar overflow-scroll">
      <div v-for="resume in resumes" :key="resume.resumeId" class="relative h-90 cursor-pointer rounded-lg"
        @mouseenter="setHovered(resume.resumeId)" @mouseleave="setHovered(null)">

        <CvCard :is-view="false" size="0.9" :cv-template="getCvTemplate(resume.resumeContent.resumeTemplateName)"  ></CvCard>

        <transition name="fade-op">
          <div v-if="hoveredId === resume.resumeId" class="absolute h-full inset-0 rounded-lg bg-black opacity-50"></div>
        </transition>

        <transition name="fade-op1">
          <div v-if="hoveredId === resume.resumeId"
               class="absolute inset-0 rounded-lg flex flex-col justify-center items-center space-y-2">
            <RouterLink target="_blank" :to="`/edit/resume-${resume.resumeId}`" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded">编辑</RouterLink>
            <button @click="onDelete(resume.resumeId)" class="px-4 py-2 bg-white hover:bg-gray-200 text-black rounded">删除</button>
          </div>
        </transition>


      </div>

      <!-- 添加简历按钮 -->

        <div v-if="userStore.userCvTotal<=10" class="w-63 h-90 flex items-center justify-center bg-gray-200  rounded cursor-pointer hover:bg-gray-300 transition-all duration-300">
          <RouterLink class="block flex items-center justify-center w-full h-full" to="/cv">
<!--            不可以复制-->
            <span class="text-4xl text-gray-500  outline-none select-none">+</span>
          </RouterLink>
        </div>


    </div>
  </div>
</template>

<style scoped></style>
