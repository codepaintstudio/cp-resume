<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import Menu from './components/CvTemplatePreview.vue';
import CvCard from "@/components/CvCard.vue";
import MultiCheck from "./components/MultiCheck.vue";
import type { Template } from "@/types/template";
import { getTemplates } from "@/utils/getTemplates";

const templates = ref<Template[]>([]);
// 获取并初始化模板列表
onMounted(async () => {
  try {
    templates.value = await getTemplates();
  } catch (error) {
    console.error('获取模板列表失败:', error);
  }
});
// //模拟数据：总模板
// const mockData = [
//   { id: '1', name: '商务风简历', folderPath: 'templateA', style: '商务', industry: '金融', color: '深蓝', size: '210*297' },
//   { id: '2', name: '简约设计', folderPath: 'templateA', style: '极简', industry: '互联网', color: '白色', size: '210*285' },
//   { id: '3', name: '创意模板', folderPath: 'templateA', style: '创意', industry: '设计', color: '紫色', size: '215*297' },
//   { id: '4', name: '学术风格', folderPath: 'templateA', style: '学术', industry: '教育', color: '黑色', size: '210*290' },
//   { id: '5', name: '现代时尚', folderPath: 'templateA', style: '现代', industry: '广告', color: '灰色', size: '220*300' },
//   { id: '6', name: '正式简历', folderPath: 'templateA', style: '正式', industry: '行政', color: '深灰', size: '210*297' },
//   { id: '7', name: '科技风格', folderPath: 'templateA', style: '科技', industry: 'IT', color: '蓝绿', size: '230*310' },
//   { id: '8', name: '医疗专用', folderPath: 'templateA', style: '严谨', industry: '医疗', color: '天蓝', size: '210*297' },
//   { id: '9', name: '自由职业', folderPath: 'templateA', style: '随性', industry: '自由职业', color: '米色', size: '215*295' },
//   { id: '10', name: '艺术风', folderPath: 'templateA', style: '艺术', industry: '设计', color: '红色', size: '210*280' },
//   { id: '11', name: '工程师专用', folderPath: 'templateA', style: '工程', industry: '建筑', color: '钢蓝', size: '225*315' },
//   { id: '12', name: '实习生简历', folderPath: 'templateA', style: '实习', industry: '大学生', color: '青色', size: '210*290' }
// ];
//模拟数据：推荐模板10个
const recommendData = (style: string, industry: string, color: string) => {
  return templates.value.filter(item => {

    // 筛选条件
    const matchesStyle = style === item.style;

    const matchesIndustry = industry === item.industry;

    const matchesColor = color === item.color;

    // 组合所有条件
    return matchesStyle || matchesIndustry || matchesColor;
  });

}

const selectedIndex = ref<number>(0); // 当前选中的简历索引
const selectedTemplate = ref<Template>(templates?.value[0]);
const showMenu = ref<boolean>(false); // 控制菜单显示与隐藏的状态
const searchQuery = ref<string>(""); // 存储搜索关键字
const searchText = ref<string>(""); // 触发搜索时保存的关键词（点击搜索按钮后才生效）
// 切换菜单显示状态
const toggleMenu = (index: number) => {
  showMenu.value = !showMenu.value;
  selectedTemplate.value = filteredData.value[index]; // 更新选中的简历数据
};

// 更新cv列表
const updateCv = (newValue: Template) => {
  selectedTemplate.value = newValue;
};

// 切换上一张
const prevCv = () => {
  if (selectedIndex.value > 0) selectedIndex.value--;
  selectedTemplate.value = filteredData.value[selectedIndex.value];
};
// 切换下一张
const nextCv = () => {
  if (selectedIndex.value < filteredData.value.length - 1) selectedIndex.value++;
  selectedTemplate.value = filteredData.value[selectedIndex.value];
};

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};


// 筛选区域
const selectedStyle = ref<string[]>([]);
const selectedIndustry = ref<string[]>([]);
const selectedColor = ref<string[]>([]);
const handleSelectionChange1 = (newSelection: string[]) => {
  selectedStyle.value = newSelection;
};
const handleSelectionChange2 = (newSelection: string[]) => {
  selectedIndustry.value = newSelection;
};
const handleSelectionChange3 = (newSelection: string[]) => {
  selectedColor.value = newSelection;
};
// 提取唯一值的方法
const uniqueValues = (key: keyof typeof templates.value[0]) => {
  return [...new Set(templates.value.map(item => item[key]))];
};

// 计算属性 - 过滤唯一值
const styles = computed(() => uniqueValues("style") as string[]);
const industries = computed(() => uniqueValues("industry") as string[]);
const colors = computed(() => uniqueValues("color") as string[]);


// 触发搜索
const handleSearch = () => {
  searchText.value = searchQuery.value.trim();  // 去除空格
  console.log(searchText.value)
};
// 计算符合条件的数据
const filteredData = computed(() => {
  const query = searchText.value.toLowerCase();

  return templates.value.filter(item => {
    // 搜索条件
    const matchesSearch = !searchText.value ||
      item.name.toLowerCase().includes(query) ||
      item.style.toLowerCase().includes(query) ||
      item.industry.toLowerCase().includes(query) ||
      item.color.toLowerCase().includes(query);

    // 筛选条件
    const matchesStyle = selectedStyle.value.length === 0 ||
      selectedStyle.value.includes(item.style);

    const matchesIndustry = selectedIndustry.value.length === 0 ||
      selectedIndustry.value.includes(item.industry);

    const matchesColor = selectedColor.value.length === 0 ||
      selectedColor.value.includes(item.color);

    // 组合所有条件
    return matchesSearch && matchesStyle && matchesIndustry && matchesColor;
  });
});
</script>

<template>
  <div class="relative min-h-screen">

    <div class="mx-20 pt-12">

      <!-- 筛选区域与搜索区域 -->
      <div class="flex justify-between items-center mb-10">

        <!-- 筛选区域 -->
        <div class="flex ml-2">

          <MultiCheck title="风格" :options="styles" @update:modelValue="handleSelectionChange1" class="mr-8" />
          <MultiCheck title="行业" :options="industries" @update:modelValue="handleSelectionChange2" class="mr-8" />
          <MultiCheck title="颜色" :options="colors" @update:modelValue="handleSelectionChange3" />

        </div>

        <!-- 搜索区域 -->
        <div class="flex items-center mr-16 w-[16.2rem] h-[2.5rem] rounded-lg bg-[#3370ff]">
          <input v-model="searchQuery" type="text" placeholder="搜索简历模板"
            class="flex-1 pl-[1.2rem] h-full bg-white border rounded-lg focus:outline-none focus:border-blue-500">
          <img src="@/assets/img/cv-template/search.svg"
            class="h-full inline-block cursor-pointer transition-all duration-200 active:scale-90 hover:scale-105 hover:rotate-6"
            alt="搜索" @click="handleSearch" />
        </div>
      </div>

      <!-- 模板 -->
      <div class="flex justify-between flex-wrap gap-y-[1.5rem]">
        <CvCard v-for="(i, index) in filteredData" :key="i.id" :cvTemplate="i" @click="toggleMenu(index)"></CvCard>
        <i class="w-[279px]"></i><i class="w-[279px]"></i><i class="w-[279px]"></i><i class="w-[279px]"></i><i
          class="w-[279px]"></i>
      </div>

    </div>

    <!-- 阴影层 -->
    <div v-if="showMenu" class="absolute z-8 top-0 bg-black opacity-25 w-full h-full">
    </div>

    <!-- 模板详情菜单 -->
    <Menu class="fixed overflow-auto overscroll-contain no-scrollbar h-full z-9  top-0 left-0 right-0"
      :cvTemplate="selectedTemplate"
      :cv-list="recommendData(filteredData[selectedIndex]?.style, filteredData[selectedIndex]?.industry, filteredData[selectedIndex]?.color)"
      :isVisible="showMenu" @update:isVisible="showMenu = $event" @child-next="nextCv" @child-prev="prevCv"
      @update-cv-list="updateCv">
    </Menu>

    <!-- 返回顶部 -->
    <button @click="scrollToTop"
      class="fixed bottom-8 right-22 w-12 h-12 bg-[url(@/assets/img/cv-template/top.webp)] bg-cover  rounded-full flex items-center justify-center hover:shadow-lg transition-shadow !rounded-button whitespace-nowrap">

    </button>
  </div>
</template>
