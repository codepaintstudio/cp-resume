<script lang="ts" setup>
import { ref } from "vue";
import Menu from './components/CvTemplatePreview.vue';
import CvCard from "@/components/CvCard.vue";

//模拟数据
const mockData = [
  { id: '1', title: '商务风简历', imageUrl: 'src/assets/images/default-resume.png', style: '商务', industry: '金融', color: '深蓝', size: '210*297' },
  { id: '2', title: '简约设计', imageUrl: 'src/assets/images/default-resume.png', style: '极简', industry: '互联网', color: '白色', size: '210*285' },
  { id: '3', title: '创意模板', imageUrl: 'src/assets/images/default-resume.png', style: '创意', industry: '设计', color: '紫色', size: '215*297' },
  { id: '4', title: '学术风格', imageUrl: 'src/assets/images/default-resume.png', style: '学术', industry: '教育', color: '黑色', size: '210*290' },
  { id: '5', title: '现代时尚', imageUrl: 'src/assets/images/default-resume.png', style: '现代', industry: '广告', color: '灰色', size: '220*300' },
  { id: '6', title: '正式简历', imageUrl: 'src/assets/images/default-resume.png', style: '正式', industry: '行政', color: '深灰', size: '210*297' },
  { id: '7', title: '科技风格', imageUrl: 'src/assets/images/default-resume.png', style: '科技', industry: 'IT', color: '蓝绿', size: '230*310' },
  { id: '8', title: '医疗专用', imageUrl: 'src/assets/images/default-resume.png', style: '严谨', industry: '医疗', color: '天蓝', size: '210*297' },
  { id: '9', title: '自由职业', imageUrl: 'src/assets/images/default-resume.png', style: '随性', industry: '自由职业', color: '米色', size: '215*295' },
  { id: '10', title: '艺术风', imageUrl: 'src/assets/images/default-resume.png', style: '艺术', industry: '设计', color: '红色', size: '210*280' },
  { id: '11', title: '工程师专用', imageUrl: 'src/assets/images/default-resume.png', style: '工程', industry: '建筑', color: '钢蓝', size: '225*315' },
  { id: '12', title: '实习生简历', imageUrl: '/src/assets/images/default-resume.png', style: '实习', industry: '大学生', color: '青色', size: '210*290' }
];

const selectedIndex = ref(0); // 当前选中的简历索引
const showMenu = ref(false); // 控制菜单显示与隐藏的状态
// 切换菜单显示状态
const toggleMenu = (index: number) => {
  showMenu.value = !showMenu.value;
  selectedIndex.value = index; // 更新选中的简历数据
  scrollToTop();
};

// 切换上一张
const prevCv = () => {
  if (selectedIndex.value > 0) selectedIndex.value--;
};
// 切换下一张
const nextCv = () => {
  if (selectedIndex.value < mockData.length - 1) selectedIndex.value++;
};

const select1 = ref("");
const select2 = ref("");
const select3 = ref("");
const options = ["风格1", "风格2", "风格3", "风格4"];
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<template>
  <div class="relative min-h-screen bg-gradient-to-b from-white to-blue-300  pb-[6rem]">

    <div class="mx-20 pt-12">

      <!-- 筛选区域与搜索区域 -->
      <div class="flex justify-between items-center mb-10">

        <!-- 筛选区域 -->
        <div class="flex ml-2">
          <div>
            <select v-model="select1"
              class="w-[5.2rem] h-[2.4rem]  mr-[1.6rem] text-[#505050] rounded-lg border-2 border-solid border-[#cdcdcd] text-center pr-[0.5rem] text-[16px] focus:outline-none">
              <option value="">风格</option>
              <option v-for="item in options" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div>
            <select v-model="select2"
              class="w-[5.2rem] h-[2.4rem]  mr-[1.6rem] text-[#505050] rounded-lg border-2 border-solid border-[#cdcdcd] text-center pr-[0.5rem] text-[16px] focus:outline-none">
              <option value="">行业</option>
              <option v-for="item in options" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div>
            <select v-model="select3"
              class="w-[5.2rem] h-[2.4rem]  mr-[1.6rem] text-[#505050] rounded-lg border-2 border-solid border-[#cdcdcd] text-center pr-[0.5rem] text-[16px] focus:outline-none">
              <option value="">颜色</option>
              <option v-for="item in options" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <!-- 搜索区域 -->
        <div class="flex items-center mr-16 w-[16.2rem] h-[2.4rem] rounded-lg bg-[#3370ff]">
          <input type="text" placeholder="搜索简历模板"
            class="flex-1 pl-[1.2rem] h-full bg-white border rounded-lg focus:outline-none focus:border-blue-500">
          <img src="@/assets/images/search.svg" class="h-full inline-block" alt="搜索">
        </div>
      </div>

      <!-- 模板 -->
      <div class="flex justify-between flex-wrap gap-y-[1.5rem]">
        <CvCard v-for="(i, index) in mockData" :key="i.id" :cvData="i" @click="toggleMenu(index)"></CvCard>
        <i class="w-[279px]"></i><i class="w-[279px]"></i><i class="w-[279px]"></i><i class="w-[279px]"></i><i
          class="w-[279px]"></i>
      </div>
    </div>

    <!-- 引用菜单组件，并绑定显示状态 -->
    <div v-if="showMenu" class="absolute top-0 bg-black opacity-25 w-full h-full">
    </div>

    <Menu class="absolute h-full top-0 left-0 right-0" :cvData="mockData[selectedIndex]" :isVisible="showMenu"
      @update:isVisible="showMenu = $event">
    </Menu>

    <button class="fixed  top-1/2 left-8 w-10 h-10 bg-white" @click="prevCv">上一张</button>
    <button class="fixed  top-1/2 right-8 w-10 h-10 bg-white" @click="nextCv">下一张</button>
    <!-- 返回顶部 -->
    <button @click="scrollToTop"
      class="fixed bottom-8 right-8 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:shadow-lg transition-shadow !rounded-button whitespace-nowrap">
      <i class="fas fa-arrow-up text-gray-600"></i>
    </button>
  </div>
</template>
