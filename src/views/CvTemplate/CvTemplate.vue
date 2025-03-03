<script lang="ts" setup>
import { ref } from "vue";
import Menu from './components/CvTemplatePreview.vue';
import CvCard from "@/components/CvCard.vue";

// 控制菜单显示与隐藏的状态
const showMenu = ref(false);
// 切换菜单显示状态
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  scrollToTop();
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
        <CvCard v-for="i in 12" :key="i" @click="toggleMenu"></CvCard>
        <i class="w-[279px]"></i><i class="w-[279px]"></i><i class="w-[279px]"></i><i class="w-[279px]"></i><i
          class="w-[279px]"></i>
      </div>
    </div>

    <!-- 引用菜单组件，并绑定显示状态 -->
    <div v-if="showMenu" class="absolute top-0 bg-black opacity-25 w-full h-full">
    </div>
    <Menu class="absolute h-full top-0 left-0 right-0" :isVisible="showMenu" @update:isVisible="showMenu = $event">
    </Menu>

    <!-- 返回顶部 -->
    <button @click="scrollToTop"
      class="fixed bottom-8 right-8 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:shadow-lg transition-shadow !rounded-button whitespace-nowrap">
      <i class="fas fa-arrow-up text-gray-600"></i>
    </button>
  </div>
</template>
