<script lang="ts" setup>
import { ref, computed } from "vue";
import Menu from './components/CvTemplatePreview.vue';
import CvCard from "@/components/CvCard.vue";

//模拟数据
const mockData = [
  { id: '1', title: '商务风简历', imageUrl: 'src/assets/img/default-resume.png', style: '商务', industry: '金融', color: '深蓝', size: '210*297' },
  { id: '2', title: '简约设计', imageUrl: 'src/assets/img/default-resume.png', style: '极简', industry: '互联网', color: '白色', size: '210*285' },
  { id: '3', title: '创意模板', imageUrl: 'src/assets/img/default-resume.png', style: '创意', industry: '设计', color: '紫色', size: '215*297' },
  { id: '4', title: '学术风格', imageUrl: 'src/assets/img/default-resume.png', style: '学术', industry: '教育', color: '黑色', size: '210*290' },
  { id: '5', title: '现代时尚', imageUrl: 'src/assets/img/default-resume.png', style: '现代', industry: '广告', color: '灰色', size: '220*300' },
  { id: '6', title: '正式简历', imageUrl: 'src/assets/img/default-resume.png', style: '正式', industry: '行政', color: '深灰', size: '210*297' },
  { id: '7', title: '科技风格', imageUrl: 'src/assets/img/default-resume.png', style: '科技', industry: 'IT', color: '蓝绿', size: '230*310' },
  { id: '8', title: '医疗专用', imageUrl: 'src/assets/img/default-resume.png', style: '严谨', industry: '医疗', color: '天蓝', size: '210*297' },
  { id: '9', title: '自由职业', imageUrl: 'src/assets/img/default-resume.png', style: '随性', industry: '自由职业', color: '米色', size: '215*295' },
  { id: '10', title: '艺术风', imageUrl: 'src/assets/img/default-resume.png', style: '艺术', industry: '设计', color: '红色', size: '210*280' },
  { id: '11', title: '工程师专用', imageUrl: 'src/assets/img/default-resume.png', style: '工程', industry: '建筑', color: '钢蓝', size: '225*315' },
  { id: '12', title: '实习生简历', imageUrl: '/src/assets/img/default-resume.png', style: '实习', industry: '大学生', color: '青色', size: '210*290' }
];
const select1 = ref("");
const select2 = ref("");
const select3 = ref("");
const options = ["风格1", "风格2", "风格3", "风格4"];

const selectedIndex = ref(0); // 当前选中的简历索引
const showMenu = ref(false); // 控制菜单显示与隐藏的状态
const searchQuery = ref(""); // 存储搜索关键字
const searchText = ref(""); // 触发搜索时保存的关键词（点击搜索按钮后才生效）
// 切换菜单显示状态
const toggleMenu = (index: number) => {
  showMenu.value = !showMenu.value;
  selectedIndex.value = index; // 更新选中的简历数据
  scrollToTop();
};

// 切换上一张
const prevCv = () => {
  if (selectedIndex.value > 0) selectedIndex.value--;
  scrollToTop();
};
// 切换下一张
const nextCv = () => {
  if (selectedIndex.value < mockData.length - 1) selectedIndex.value++;
  scrollToTop();
};

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 触发搜索
const handleSearch = () => {
  searchText.value = searchQuery.value.trim();  // 去除空格
  console.log(searchText.value)
};
// 计算符合搜索条件的数据
const filteredData = computed(() => {
  if (!searchText.value) return mockData;
  const query = searchText.value.toLowerCase();

  return mockData.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.style.toLowerCase().includes(query) ||
    item.industry.toLowerCase().includes(query) ||
    item.color.toLowerCase().includes(query)
  );
});
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
              class="w-[5.4rem] h-[2.5rem]  mr-[1.6rem] text-[#505050] rounded-lg border-2 border-solid border-[#cdcdcd] text-center pr-[0.5rem] text-[16px] focus:outline-none">
              <option value="">风格</option>
              <option v-for="item in options" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div>
            <select v-model="select2"
              class="w-[5.4rem] h-[2.5rem]  mr-[1.6rem] text-[#505050] rounded-lg border-2 border-solid border-[#cdcdcd] text-center pr-[0.5rem] text-[16px] focus:outline-none">
              <option value="">行业</option>
              <option v-for="item in options" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div>
            <select v-model="select3"
              class="w-[5.4rem] h-[2.5rem]  mr-[1.6rem] text-[#505050] rounded-lg border-2 border-solid border-[#cdcdcd] text-center pr-[0.5rem] text-[16px] focus:outline-none">
              <option value="">颜色</option>
              <option v-for="item in options" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <!-- 搜索区域 -->
        <div class="flex items-center mr-16 w-[16.2rem] h-[2.5rem] rounded-lg bg-[#3370ff]">
          <input v-model="searchQuery" type="text" placeholder="搜索简历模板"
            class="flex-1 pl-[1.2rem] h-full bg-white border rounded-lg focus:outline-none focus:border-blue-500">
          <img src="@/assets/img/CvTemplate/search.svg"
            class="h-full inline-block cursor-pointer transition-all duration-200 active:scale-90 hover:scale-105 hover:rotate-6"
            alt="搜索" @click="handleSearch" />
        </div>
      </div>

      <!-- 模板 -->
      <div class="flex justify-between flex-wrap gap-y-[1.5rem]">
        <CvCard v-for="(i, index) in filteredData" :key="i.id" :cvData="i" @click="toggleMenu(index)"></CvCard>
        <i class="w-[279px]"></i><i class="w-[279px]"></i><i class="w-[279px]"></i><i class="w-[279px]"></i><i
          class="w-[279px]"></i>
      </div>
    </div>

    <!-- 引用菜单组件，并绑定显示状态 -->
    <div v-if="showMenu" class="absolute top-0 bg-black opacity-25 w-full h-full">
    </div>
    <button v-if="showMenu"
      class="fixed z-10  top-1/2 left-24 w-10 h-10  bg-[url(@/assets/img/CvTemplate/navigate_before.webp)] bg-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-0.5"
      @click="prevCv"></button>
    <button v-if="showMenu"
      class="fixed z-10 top-1/2 right-24 w-10 h-10 bg-[url(@/assets/img/CvTemplate/navigate_next.webp)] bg-cover transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-0.5"
      @click="nextCv"></button>

    <Menu class="absolute h-full top-0 left-0 right-0" :cvData="mockData[selectedIndex]" :isVisible="showMenu"
      @update:isVisible="showMenu = $event">
    </Menu>


    <!-- 返回顶部 -->
    <button @click="scrollToTop"
      class="fixed bottom-8 right-22 w-12 h-12 bg-[url(@/assets/img/CvTemplate/top.webp)] bg-cover  rounded-full flex items-center justify-center hover:shadow-lg transition-shadow !rounded-button whitespace-nowrap">

    </button>
  </div>
</template>
